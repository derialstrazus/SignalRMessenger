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
    MessageBox s1 = MessageBox.Instance;

    public IEnumerable<Message> GetAllMessages()
    {
      return s1.messages;
    }

    public IHttpActionResult GetMessage(int ID)
    {
      var message = s1.messages.FirstOrDefault(m => m.ID == ID);
      if (message == null) {
        return NotFound();
      }
      return Ok(message);
    }

    [HttpPost]
    public IHttpActionResult NewMessage()
    {
      s1.messages.Add(new Message { ID = 10, Sender = "1232", Receiver = "awefea", Content = "Hello"});
      return Ok(s1.messages);
    }

    [HttpPut, Route("api/message/{ID}/{newContent}")]
    public IHttpActionResult UpdateMessage(int ID, string newContent)
    {
      var message = s1.messages.FirstOrDefault(m => m.ID == ID);
      if (message == null) {
        return NotFound();
      }
      else {
        message.Content = newContent;
      }
      return Ok(message);
    }
  }
}
