using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private IActionDescriptorCollectionProvider provider;
        public HomeController(IActionDescriptorCollectionProvider provider)
        {
            this.provider = provider;
        }

        public IActionResult Index()
        {
            var urls = this.provider.ActionDescriptors.Items
                .Select(descriptor => '/' + string.Join('/', descriptor.RouteValues.Values
                                                                                .Where(v => v != null)
                                                                                .Select(c => c.ToLower())
                                                                                .Reverse()))
                .Distinct()
                .ToList();

            return Ok(urls);
        }
    }
}
