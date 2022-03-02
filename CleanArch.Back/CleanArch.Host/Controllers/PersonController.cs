using CleanArch.Application.Contract.IService;
using CleanArch.Application.Contract.ViewModels;
using CleanArch.Framework.Auth.Permissions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CleanArch.Host.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class PersonController : ControllerBase
    {
        IPersonService _personService;
        IAuthenticateService _authenticateService;
        public PersonController(IPersonService personService,
            IAuthenticateService authenticateService)
        {
            _personService = personService;
            _authenticateService = authenticateService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public PersonViewModel Login(string Email,string Password)
        {
            var User = _authenticateService.Authenticate(Email, Password);

            return User;
        }

        [PermissionAuthorize(Permissions.Person.Read)]
        [HttpGet("Get")]
        public List<PersonViewModel> Get()
        {
            var people = _personService.Read();
            return people.ToList();
        }

        [PermissionAuthorize(Permissions.Person.Read)]
        [HttpGet("GetById{id}")]
        public PersonViewModel Get(int id)
        {
            var person = _personService.ReadById(id);
            return person;
        }

        [PermissionAuthorize(Permissions.Person.Create)]
        [HttpPost("Create")]
        public IActionResult CreatePerson(PersonViewModel personViewModel)
        {
            _personService.Create(personViewModel);
            return Ok();
        }

        [PermissionAuthorize(Permissions.Person.Update)]
        [HttpPut("Update")]
        public IActionResult UpdatePerson(PersonViewModel personViewModel)
        {
            _personService.Update(personViewModel);
            return Ok();
        }

        [PermissionAuthorize(Permissions.Person.Delete)]
        [HttpDelete("Delete")]
        public IActionResult DeletePerson(PersonViewModel personViewModel)
        {
            _personService.Delete(personViewModel);
            return Ok();
        }
    }
}
