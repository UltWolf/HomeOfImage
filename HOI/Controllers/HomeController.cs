using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HOI.Models;
using System.IO;
using Microsoft.Extensions.Hosting;

namespace HOI.Controllers
{
    public class HomeController : Controller
    {
        private readonly IHostEnvironment _environment;
        public HomeController(IHostEnvironment environment)
        {
            _environment = environment;
        }
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
        [HttpPost("UploadFiles")]
        public async Task<IActionResult> Post( )
        {
            string base64path = "";
            var filesContext = HttpContext.Request.Form.Files;
            foreach (var fil in filesContext)
            {
                byte[] fileContent;
                using (Stream stream = fil.OpenReadStream())
                {
                    
                    using (var binaryReader = new BinaryReader(stream))
                    {
                         fileContent = binaryReader.ReadBytes((int)fil.Length);
                    }
                    string path = Path.Combine(_environment.ContentRootPath, fil.FileName);
                    using (FileStream fstream = new FileStream(path, FileMode.OpenOrCreate))
                    {
                        await fstream.WriteAsync(fileContent, 0, fileContent.Length);

                    }
                } 
                base64path = Convert.ToBase64String(fileContent); 
            }

            return Ok(base64path);
        }
    }
}
