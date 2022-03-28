using CleanArch.Application.Contract.IService;
using CleanArch.Application.Contract.ViewModels;
using CleanArch.Framework.Auth.Permissions;
using Framework.Core.Filtering;
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
        public async Task<IActionResult> Login(AuthenticateViewModel authenticateViewModel)
        {
            try
            {
                var personTokenViewModel = await _authenticateService.Authenticate(authenticateViewModel);
                if (personTokenViewModel!=null)
                    return Ok(personTokenViewModel);
                else
                    return BadRequest();
            }
            catch(Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [PermissionAuthorize(Permissions.Person.Read)]
        [HttpGet("Get")]
        public IActionResult Get()
        {
            var people = _personService.Read();
            if (people!=null)
                return Ok(people.ToList());
            else
                return BadRequest();
        }

        [PermissionAuthorize(Permissions.Person.Read)]
        [HttpPost("GetByPage")]
        public IActionResult Get(GridRequest gridRequest)
        {
            var people = _personService.Read(gridRequest);
            if (people != null)
                return Ok(people);
            else
                return BadRequest();
        }

        [PermissionAuthorize(Permissions.Person.Read)]
        [HttpGet("GetById{id}")]
        public IActionResult Get(int id)
        {
            var person = _personService.ReadById(id);
            if (person!=null)
                return Ok(person);
            else
                return BadRequest();
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
