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
        
        [HttpGet, Route("api/chatroom")]
        public IHttpActionResult GetUserChatRooms()
        {
            IEnumerable<string> stringID = Request.Headers.GetValues("UserID");
            Guid userID = Guid.Parse(stringID.FirstOrDefault());        //TODO: isolate this
            IEnumerable<ChatRoom> chatRooms = s1.ChatRooms.Where(x => x.UserIDs.Contains(userID));
            if (chatRooms != null)
            {
                return Ok(chatRooms);
            }
            else
            {
                return NotFound();
            }            
        }

        [HttpGet, Route("api/chatroom/{chatRoomID}")]
        public IHttpActionResult GetChatRoom(Guid chatRoomID)
        {
            ChatRoom chatRoom = s1.ChatRooms.FirstOrDefault(x => x.ID == chatRoomID);
            if (chatRoom != null)
            {
                return Ok(chatRoom);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost, Route("api/chatroom")]
        public IHttpActionResult CreateChatRoom()
        {
            IEnumerable<string> stringID = Request.Headers.GetValues("UserID");
            Guid userID = Guid.Parse(stringID.FirstOrDefault());
            s1.ChatRooms.Add(new ChatRoom() {
                ID = Guid.NewGuid(),
                UserIDs = new List<Guid>(),
                Messages = new List<Message>()
            });
            s1.ChatRooms.Last().UserIDs.Add(userID);

            return Ok(s1.ChatRooms.Last());
        }

        [HttpPut, Route("api/chatroom/{chatRoomID}/join")]
        public IHttpActionResult JoinChatRoom(Guid chatRoomID)
        {
            ChatRoom chatRoom = s1.ChatRooms.FirstOrDefault(x => x.ID == chatRoomID);
            IEnumerable<string> stringID = Request.Headers.GetValues("UserID");
            Guid userID = Guid.Parse(stringID.FirstOrDefault());
            if (chatRoom != null)
            {
                chatRoom.UserIDs.Add(userID);
                return Ok(chatRoom);
            }
            else
            {
                return NotFound();
            }
        }

        //public IEnumerable<Message> GetAllMessages()
        //{
        //    return s1.Messages;
        //}

        //public IHttpActionResult GetMessage(int ID)
        //{
        //    var message = s1.Messages.FirstOrDefault(m => m.ID == ID);
        //    if (message == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(message);
        //}

        //[HttpPost]
        //public IHttpActionResult NewMessage([FromBody]Message message)
        //{
        //    s1.Messages.Add(message);
        //    return Ok(s1.Messages);
        //}

        //[HttpPut, Route("api/message/{ID}/{newContent}")]
        //public IHttpActionResult UpdateMessage(int ID, string newContent)
        //{
        //    var message = s1.Messages.FirstOrDefault(m => m.ID == ID);
        //    if (message == null)
        //    {
        //        return NotFound();
        //    }
        //    else
        //    {
        //        message.Content = newContent;
        //    }
        //    return Ok(message);
        //}
    }
}
