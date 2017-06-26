using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TiTaTo.Data.Models;
using TiTaTo.Data.DataAccess;

namespace TiTaTo.Data.Controllers
{
    public class MessageController : ApiController
    {
        SingletonDB s1 = SingletonDB.Instance;

        public IEnumerable<Message> GetAllMessages()
        {
            return s1.Messages;
        }

        public IHttpActionResult GetMessage(int ID)
        {
            var message = s1.Messages.FirstOrDefault(m => m.ID == ID);
            if (message == null)
            {
                return NotFound();
            }
            return Ok(message);
        }

        [HttpPost]
        public IHttpActionResult NewMessage([FromBody]Message message)
        {
            s1.Messages.Add(message);
            return Ok(s1.Messages);
        }

        [HttpPut, Route("api/message/{ID}/{newContent}")]
        public IHttpActionResult UpdateMessage(int ID, string newContent)
        {
            var message = s1.Messages.FirstOrDefault(m => m.ID == ID);
            if (message == null)
            {
                return NotFound();
            }
            else
            {
                message.Content = newContent;
            }
            return Ok(message);
        }
    }
}
