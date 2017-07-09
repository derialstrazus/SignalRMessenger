using System;
using System.Linq;
using System.Web.Http;
using TiTaTo.Data.Attributes;
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
                Guid g = Guid.NewGuid();
                s1.Users.Add(new User { ID = g, Name = name, LastOnline = DateTime.Now });
                var returnThis = s1.Users.First(x => x.ID == g);
                return Ok(returnThis);
            }
            catch (Exception ex)
            {
                s1.Users.RemoveAll(x => x.Name == name);
                return InternalServerError(ex);
            }
        }

        [HttpGet, Route("api/authentication"), RequireLogin]
        public IHttpActionResult GetAuthentication()
        {
            return Ok();
        }
    }
}
