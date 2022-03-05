using CleanArch.Application.Contract.ViewModels;
using CleanArch.Domain.Model;
using MediatR;

namespace CleanArch.Application.CQRS.PersonCQRS
{
    public class AuthenticatePersonQuery : IRequest<PersonViewModel>
    {
        public AuthenticateViewModel _authenticateViewModel { get; set; }
        public AuthenticatePersonQuery(AuthenticateViewModel authenticateViewModel)
        {
            _authenticateViewModel=authenticateViewModel;
        }
    }
}
