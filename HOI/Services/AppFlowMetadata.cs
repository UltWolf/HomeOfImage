using System;
using System.Web.Mvc.Extensions;
using System.Web.Mvc;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Auth.OAuth2.Flows;
using Google.Apis.Auth.OAuth2.Mvc;
using Google.Apis.Drive.v2;
using Google.Apis.Util.Store;
using HOI.Controllers;

namespace HOI.Services
{
    public class AppFlowMetadata  
    {
        private static readonly IAuthorizationCodeFlow flow =
            new GoogleAuthorizationCodeFlow(new GoogleAuthorizationCodeFlow.Initializer
            {
                ClientSecrets = new ClientSecrets
                {
                    ClientId = " ",
                    ClientSecret = " "
                },
                Scopes = new[] { DriveService.Scope.Drive },
                DataStore = new FileDataStore("Drive.Api.Auth.Store")
            });

        public override string GetUserId(ApiController controller)
        {
           
            var user = controller ;
            if (user == null)
            {
                user = Guid.NewGuid();
                controller.Session["user"] = user;
            }
            return user.ToString();

        }
 
       

        public override IAuthorizationCodeFlow Flow
        {
            get { return flow; }
        }
    } 
}
