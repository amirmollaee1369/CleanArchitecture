using MediatR;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArch.Application.CQRS.PersonCQRS
{
    public class AuthenticatePersonLoggerHandler : INotificationHandler<AuthenticatePersonEvent>
    {
        readonly ILogger<AuthenticatePersonLoggerHandler> _logger;

        public AuthenticatePersonLoggerHandler(ILogger<AuthenticatePersonLoggerHandler> logger)
        {
            _logger = logger;
        }

        public Task Handle(AuthenticatePersonEvent notification, CancellationToken cancellationToken)
        {
            _logger.LogInformation($"New Login at {DateTime.Now}: {notification._authenticateViewModel.Email}");

            return Task.CompletedTask;
        }
    }
}
