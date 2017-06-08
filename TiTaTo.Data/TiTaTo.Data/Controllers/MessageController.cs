using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TiTaTo.Data.Models;

namespace TiTaTo.Data.Controllers
{
    public class MessageController : ApiController
    {
        Message[] messages = new Message[]
        {
            new Message { ID = 1, Sender = "Derek", Receiver = "Benedict", Content = "Hello"},
            new Message { ID = 2, Sender = "Benedict", Receiver = "Derek", Content = "Hello Back!"},
            new Message { ID = 3, Sender = "Derek", Receiver = "Benedict", Content = "Goodbye"},
            new Message { ID = 4, Sender = "Derek", Receiver = "Adrian", Content = "Hello"}
        };

        public IEnumerable<Message> GetAllMessages()
        {
            return messages;
        }

        public IHttpActionResult GetMessage(int ID)
        {
            var message = messages.FirstOrDefault(m => m.ID == ID);
            if (message == null)
            {
                return NotFound();
            }
            return Ok(message);
        }
    }
}
