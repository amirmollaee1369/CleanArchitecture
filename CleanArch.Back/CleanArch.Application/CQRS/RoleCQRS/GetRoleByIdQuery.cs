using CleanArch.Application.Contract.ViewModels;
using CleanArch.Domain.Model;
using MediatR;

namespace CleanArch.Application.CQRS.RoleCQRS
{
    public class GetRoleByIdQuery : IRequest<Role>
    { 
        public int Id { get; set; }

        public GetRoleByIdQuery(int id)
        {
            Id=id;
        }
    }
}
