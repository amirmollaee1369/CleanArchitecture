using CleanArch.Application.Contract.ViewModels;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArch.Application.CQRS.PersonCQRS
{
    public class AuthenticatePersonEvent : INotification
    {
        public AuthenticateViewModel _authenticateViewModel { get; set; }

        public AuthenticatePersonEvent(AuthenticateViewModel authenticateViewModel)
        {
            _authenticateViewModel=authenticateViewModel;
        }
    }
}
