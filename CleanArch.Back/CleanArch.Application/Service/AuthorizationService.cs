using System.Security.Claims;
using CleanArch.Application.Contract.ViewModels;
using CleanArch.Application.Contract.IService;
using CleanArch.Infra.Data.UnitOfWork;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using CleanArch.Framework.Auth;
using CleanArch.Application.Mapper;
using Microsoft.Extensions.Options;
using CleanArch.Framework.Auth.Permissions;

namespace CleanArch.Application.Service
{
    public class AuthenticateService : IAuthenticateService
    {
        private IUnitOfWork _unitOfWork;
        private AuthSettings _authSettings;

        public AuthenticateService(IUnitOfWork unitOfWork, IOptions<AuthSettings> authSettings)
        {
            _unitOfWork=unitOfWork;
            _authSettings=authSettings.Value;
        }

        public PersonViewModel Authenticate(string username, string password)
        {
            var person = _unitOfWork.PersonRepository.Get(x => x.Email == username && x.Password == password,
                null,
                "PersonRoles"
                ).SingleOrDefault();
            if (person!=null)
            {
                
                // authentication successful so generate jwt token
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_authSettings.Secret);
                var claims = new ClaimsIdentity();

                foreach (var permission in person.Permissions.Split(","))
                {
                    if (permission !=null)
                    {
                        claims.AddClaims(new[]
                        {
                        new Claim(Permissions.Permission, permission)
                    });
                    }
                }

                foreach (var personRole in person.PersonRoles)
                {
                    var personRoles = _unitOfWork.RoleRepository.GetByID(personRole.RoleId).Permissions.Split(",");
                    foreach (var rolePermission in personRoles)
                    {
                        if (!person.Permissions.Split(",").Any(x => x == rolePermission))
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

                var personViewModel = PersonMapper.PersonToPersonViewModel(person);
                personViewModel.Token = tokenHandler.WriteToken(token);
                return personViewModel;
            }
            else
                throw new ArgumentNullException("Dont Have Permission");
        }
    }
}
