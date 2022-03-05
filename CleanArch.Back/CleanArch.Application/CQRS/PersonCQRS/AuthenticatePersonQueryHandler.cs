using AutoMapper;
using CleanArch.Application.Contract.ViewModels;
using CleanArch.Domain.Model;
using CleanArch.Infra.Data.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArch.Application.CQRS.PersonCQRS
{
    public class AuthenticatePersonPassQueryHandler : IRequestHandler<AuthenticatePersonQuery, PersonViewModel>
    {
        private readonly CleanArchDBContext _context;
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;

        public AuthenticatePersonPassQueryHandler(
            CleanArchDBContext context, 
            IMapper mapper, 
            IMediator mediator)
        {
            _context=context;
            _mapper=mapper;
            _mediator=mediator;
        }

        public async Task<PersonViewModel> Handle(AuthenticatePersonQuery request, CancellationToken cancellationToken)
        {
            

            var result = _mapper.Map<Person, PersonViewModel>(await _context.People.Where(p => p.Email== request._authenticateViewModel.Email && p.Password==request._authenticateViewModel.Password).Include(a=>a.PersonRoles).SingleOrDefaultAsync());
            if(result!=null)
                await _mediator.Publish(new AuthenticatePersonEvent(request._authenticateViewModel), cancellationToken);
            return result;
        }
    }
}
