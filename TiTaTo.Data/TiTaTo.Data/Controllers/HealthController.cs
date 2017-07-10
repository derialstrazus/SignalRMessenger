using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TiTaTo.Data.DataAccess;

namespace TiTaTo.Data.Controllers
{
    public class HealthController : ApiController
    {
        SingletonDB s1 = SingletonDB.Instance;

        public IHttpActionResult Get()
        {
            var activeUsers = s1.Users.Select(x => new {
                Name = x.Name,
                LastOnline = x.LastOnline
            });
            var activeRooms = s1.ChatRooms.Select(x => new {
                RoomName = x.RoomName,
                Users = x.Users.Select(y => new {
                    Name = y.Name,
                    LastOnline = y.LastOnline
                }),
                IsPublic = x.IsPublic,
                LastUpdated = x.LastUpdated
            });

            var returnThis = new
            {
                activeUsers = activeUsers,
                activeRooms = activeRooms
            };

            return Ok(returnThis);
        }
    }
}
