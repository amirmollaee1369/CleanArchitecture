using AutoMapper;
using CleanArch.Application.Contract.ViewModels;
using CleanArch.Domain.Model;
using CleanArch.Infra.Data.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArch.Application.CQRS.RoleCQRS
{
    public class GetRoleByIdQueryHandler : IRequestHandler<GetRoleByIdQuery, Role>
    {
        private readonly CleanArchDBContext _context;
        
        public GetRoleByIdQueryHandler(CleanArchDBContext context, IMapper mapper)
        {
            _context=context;
        }

        public async Task<Role> Handle(GetRoleByIdQuery request, CancellationToken cancellationToken)
        {
           return await _context.Roles.Where(p => p.Id== request.Id).SingleOrDefaultAsync();
        }
    }
}
