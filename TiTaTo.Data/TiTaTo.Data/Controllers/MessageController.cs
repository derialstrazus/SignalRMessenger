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
            Guid userID = GetUserIDFromHeader();        //TODO: Isolate this to an attribute
            IEnumerable<ChatRoom> chatRooms = s1.ChatRooms.Where(x => x.Users.Any(y => y.ID == userID));
            if (chatRooms == null)
            {
                return NotFound();
            }

            return Ok(chatRooms);
        }

        [HttpGet, Route("api/chatroom/all")]
        public IHttpActionResult GetAllChatRooms()
        {            
            IEnumerable<ChatRoom> chatRooms = s1.ChatRooms;
            if (chatRooms == null)
            {
                return NotFound();
            }

            return Ok(chatRooms.Select(x => new { ID = x.ID, RoomName = x.RoomName}));
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
            Guid userID = GetUserIDFromHeader();
            User user = s1.Users.First(x => x.ID == userID);
            s1.ChatRooms.Add(new ChatRoom() {
                ID = Guid.NewGuid(),
                Users = new List<User>(),
                Messages = new List<Message>()
            });
            s1.ChatRooms.Last().Users.Add(user);

            return Ok(s1.ChatRooms.Last());
        }

        [HttpPut, Route("api/chatroom/{chatRoomID}/join")]
        public IHttpActionResult JoinChatRoom(Guid chatRoomID)
        {
            ChatRoom chatRoom = s1.ChatRooms.FirstOrDefault(x => x.ID == chatRoomID);
            Guid userID = GetUserIDFromHeader();
            User user = s1.Users.First(x => x.ID == userID);
            if (chatRoom != null)
            {
                if(chatRoom.Users.All(x => x.ID != userID))
                    chatRoom.Users.Add(user);
                return Ok(chatRoom);
            }
            else
            {
                return NotFound();
            }
        }

        ////This is not necessary.  Just use get chatroom
        //[HttpGet, Route("api/chatroom/{chatRoomID}/recentmessages}")]
        //public IHttpActionResult GetRecentMessages(Guid chatRoomID)
        //{
        //    Guid userID = GetUserIDFromHeader();
        //    ChatRoom chatRoom = s1.ChatRooms.FirstOrDefault(x => x.ID == chatRoomID);

        //    if (chatRoom == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(chatRoom.Messages.OrderByDescending(x => x.TimeStamp).Take(5));            
        //}

        [HttpPost, Route("api/chatroom/{chatRoomID}/messages")]
        public IHttpActionResult CreateMessage(Guid chatRoomID, [FromBody]Message messageData)
        {
            Guid userID = GetUserIDFromHeader();
            ChatRoom chatRoom = s1.ChatRooms.FirstOrDefault(x => x.ID == chatRoomID);            

            if (chatRoom == null)
            {
                return NotFound();      //TODO: Need a message that says chatroom not found
            }

            if (chatRoom.Users.All(x => x.ID != userID)) {
                return NotFound();      //Message: user is not a member of this chatroom
            }

            chatRoom.Messages.Add(new Message()
            {
                SenderID = userID,
                Content = messageData.Content,
                TimeStamp = DateTime.Now
            });

            return Ok(chatRoom);
        }

        private Guid GetUserIDFromHeader()
        {
            try {
                IEnumerable<string> stringID = Request.Headers.GetValues("UserID");
                Guid userID = Guid.Parse(stringID.FirstOrDefault());
                return userID;
            }
            catch (Exception ex) {
                throw ex;
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
