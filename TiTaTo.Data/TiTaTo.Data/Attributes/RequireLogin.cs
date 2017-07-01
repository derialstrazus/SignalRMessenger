using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using TiTaTo.Data.DataAccess;

namespace TiTaTo.Data.Attributes
{
    public class RequireLogin : ActionFilterAttribute
    {
        SingletonDB s1 = SingletonDB.Instance;

        public override void OnActionExecuting(HttpActionContext actionContext)
        {

            IEnumerable<string> stringID = actionContext.Request.Headers.GetValues("UserID");
            Guid userID;
            bool successfulGuidParse = Guid.TryParse(stringID.FirstOrDefault(), out userID);

            //return unauthorized if failed to parse GUID, whether due to GUID not provided, or wrong GUID format
            if (!successfulGuidParse)
            {
                var response = new HttpResponseMessage(HttpStatusCode.Unauthorized)
                {
                    Content = new StringContent("User is not logged in"),
                    ReasonPhrase = "User is not logged in"
                };
                throw new HttpResponseException(response);
            }

            //return unauthorized if userID does not exist on DB
            if (s1.Users.All(u => u.ID != userID))
            {
                var response = new HttpResponseMessage(HttpStatusCode.Unauthorized)
                {
                    Content = new StringContent("User is not logged in"),
                    ReasonPhrase = "Login GUID does not exist on database"
                };
                throw new HttpResponseException(response);
            }
        }
    }
}