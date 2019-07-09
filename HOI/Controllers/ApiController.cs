using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AngleSharp.Dom;
using AngleSharp.Html.Dom;
using AngleSharp.Html.Parser;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HOI.Controllers
{ 
    [Route("api/[controller]")]
    public class ApiController : Controller
    {
       

        // GET api/<controller>/5
        [HttpPost]
        public async Task<string> Post([FromBody]string url)
        {
            WebRequest wr = HttpWebRequest.Create(url);
            List<string> ImageSrc = new List<string>();
            string html;
            using (WebResponse wresponse = await wr.GetResponseAsync())
            {
                using (StreamReader sr = new StreamReader(wresponse.GetResponseStream()))
                {
                    html = sr.ReadToEnd();
                }
            }
            HtmlParser parser = new HtmlParser();
            IHtmlDocument document = parser.ParseDocument(html);
            IHtmlCollection<IElement> imgs = document.GetElementsByTagName("img");
            Parallel.ForEach(imgs, (img) =>
            {
                ImageSrc.Add(img.GetAttribute("src"));
            });
            return JsonConvert.SerializeObject(ImageSrc);
        }
         

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
