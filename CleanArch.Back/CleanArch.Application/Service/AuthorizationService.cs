using System.Security.Claims;
using CleanArch.Application.Contract.ViewModels;
using CleanArch.Application.Contract.IService;
using CleanArch.Infra.Data.UnitOfWork;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using CleanArch.Framework.Auth;
using Microsoft.Extensions.Options;
using CleanArch.Framework.Auth.Permissions;
using AutoMapper;
using CleanArch.Domain.Model;
using MediatR;
using CleanArch.Application.CQRS.PersonCQRS;
using CleanArch.Application.CQRS.RoleCQRS;

namespace CleanArch.Application.Service
{
    public class AuthenticateService : IAuthenticateService
    {
        //private readonly IUnitOfWork _unitOfWork;
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;
        private readonly AuthSettings _authSettings;

        public AuthenticateService(//IUnitOfWork unitOfWork, 
            IMediator mediator,
            IOptions<AuthSettings> authSettings,
            IMapper mapper)
        {
            //_unitOfWork=unitOfWork;
            _mediator=mediator;
            _authSettings=authSettings.Value;
            _mapper=mapper;
        }

        public async Task<PersonTokenViewModel> Authenticate(AuthenticateViewModel authenticateViewModel)
        {

            //var person = _unitOfWork.PersonRepository.Get(x => x.Email == loginViewModel.Email && x.Password == loginViewModel.Password,
            //    null,
            //    "PersonRoles"
            //    ).SingleOrDefault();

            var personViewModel = await _mediator.Send(new AuthenticatePersonQuery(authenticateViewModel));
            if (personViewModel!=null)
            {

                // authentication successful so generate jwt token
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_authSettings.Secret);
                var claims = new ClaimsIdentity();

                foreach (var permission in personViewModel.Permissions.Split(","))
                {
                    if (permission !=null)
                    {
                        claims.AddClaims(new[]
                        {
                        new Claim(Permissions.Permission, permission)
                    });
                    }
                }

                foreach (var personRole in personViewModel.PersonRoles)
                {
                    var personRoles = await _mediator.Send(new GetRoleByIdQuery(personRole.RoleId));
                    foreach (var rolePermission in personRoles.Permissions.Split(","))
                    {
                        if (!personViewModel.Permissions.Split(",").Any(x => x == rolePermission))
                        {
                            claims.AddClaims(new[]
                            {
                        new Claim(Permissions.Permission, rolePermission)
                    });
                        }
                    }
                }

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = claims,
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                            SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var personTokenViewModel = _mapper.Map<AuthenticateViewModel, PersonTokenViewModel>(authenticateViewModel);
                personTokenViewModel.Token = tokenHandler.WriteToken(token);
                return personTokenViewModel;
            }
            else
                throw new ArgumentNullException("Dont Have Permission");
        }
    }
}
