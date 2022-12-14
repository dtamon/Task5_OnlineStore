using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Task5_OnlineStore.Core.Dto;
using Task5_OnlineStore.Core.Services.Interfaces;

namespace Task5_OnlineStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser(RegisterUserDto dto)
        {
            await _accountService.RegisterUser(dto);
            return Ok("Successfull registration");
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginUser(LoginUserDto dto)
        {
            string token = await _accountService.GenerateJwt(dto);
            return Ok(token);
        }
    }
}
