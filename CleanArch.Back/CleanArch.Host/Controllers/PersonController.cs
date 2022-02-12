using CleanArch.Application.Contract.IService;
using CleanArch.Application.Contract.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CleanArch.Host.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonController : ControllerBase
    {
        IPersonService _personService;
        public PersonController(IPersonService personService)
        {
            _personService = personService;
        }

        [HttpGet]
        public IEnumerable<PersonViewModel> Get()
        {
            var people = _personService.Read();
            return people;
        }

        [HttpGet("{id}")]
        public PersonViewModel Get(int id)
        {
            var person = _personService.ReadById(id);
            return person;
        }

        [HttpPost]
        public IActionResult CreatPerson(PersonViewModel personViewModel)
        {
            _personService.Create(personViewModel);
            return Ok();
        }

        [HttpPut]
        public IActionResult UpdatePerson(PersonViewModel personViewModel)
        {
            _personService.Update(personViewModel);
            return Ok();
        }

        [HttpDelete]
        public IActionResult DeletePerson(PersonViewModel personViewModel)
        {
            _personService.Delete(personViewModel);
            return Ok();
        }
    }
}
