using AutoMapper;
using CleanArch.Application.Contract.ViewModels;
using CleanArch.Infra.Data.Context;
using MediatR;
using CleanArch.Domain.Model;
namespace CleanArch.Application.CQRS.PersonCQRS
{
    public class CreatePersonCommandHandler:IRequestHandler<CreatePersonCommand,PersonViewModel>
    {
        private readonly CleanArchDBContext _dBContext;
        private readonly IMapper _mapper;

        public CreatePersonCommandHandler(CleanArchDBContext dBContext,IMapper mapper)
        {
            _dBContext=dBContext;
            _mapper=mapper;
        }

        public async Task<PersonViewModel> Handle(CreatePersonCommand request, CancellationToken cancellationToken)
        {
            Person person = _mapper.Map<Person>(request);

            await _dBContext.People.AddAsync(person, cancellationToken);
            await _dBContext.SaveChangesAsync(cancellationToken);

            return _mapper.Map<Person,PersonViewModel>(person);
        }
    }
}
