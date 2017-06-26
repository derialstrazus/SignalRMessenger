using System;
using System.Linq;
using System.Web.Http;
using TiTaTo.Data.DataAccess;
using TiTaTo.Data.Models;

namespace TiTaTo.Data.Controllers
{
    public class AuthenticationController : ApiController
    {
        SingletonDB s1 = SingletonDB.Instance;

        [HttpPost, Route("api/authentication")]
        public IHttpActionResult Login([FromBody]string name)
        {
            try
            {
                if (s1.Users.Any(x => x.Name.ToLower() == name.ToLower()))
                {
                    var message = "This name has already been taken.";
                    return InternalServerError(new Exception(message));
                }
                else
                {
                    Guid g = Guid.NewGuid();
                    s1.Users.Add(new Models.User { ID = g, Name = name });
                    var returnThis = s1.Users.First(x => x.Name == name);
                    return Ok(returnThis);
                }
            }
            catch (Exception ex)
            {
                s1.Users.RemoveAll(x => x.Name == name);
                return InternalServerError(ex);
            }

        }


    }
}
