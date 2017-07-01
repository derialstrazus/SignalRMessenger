using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TiTaTo.Data.Models;
using TiTaTo.Data.DataAccess;
using TiTaTo.Data.Attributes;

namespace TiTaTo.Data.Controllers
{
    public class MessageController : ApiController
    {
        SingletonDB s1 = SingletonDB.Instance;

        //TODO: ReTest all of these controllers

        [HttpGet, Route("api/chatroom")]
        public IHttpActionResult GetUserChatRooms()
        {
            Guid userID = GetUserIDFromHeader();        //TODO: Isolate this to an attribute

            IEnumerable<ChatRoom> chatRooms = s1.ChatRooms.Where(x => x.Users.Any(y => y.ID == userID));
            if (chatRooms == null)
            {
                //return NotFound();
                return Content(HttpStatusCode.NotFound, "User does not belong to any open chat rooms.");
            }

            return Ok(chatRooms);
        }

        [HttpGet, Route("api/chatroom/all"), RequireLogin]
        public IHttpActionResult GetAllChatRooms()
        {
            IEnumerable<ChatRoom> chatRooms = s1.ChatRooms;
            return Ok(chatRooms.Select(x => new { ID = x.ID, RoomName = x.RoomName }));
        }

        [HttpGet, Route("api/chatroom/{chatRoomID}")]
        public IHttpActionResult GetChatRoom(Guid chatRoomID)
        {
            ChatRoom chatRoom = FindChatRoom(chatRoomID);
            return Ok(chatRoom);
        }

        [HttpPost, Route("api/chatroom")]
        public IHttpActionResult CreateChatRoom()
        {
            Guid userID = GetUserIDFromHeader();

            s1.ChatRooms.Add(new ChatRoom()
            {
                ID = Guid.NewGuid(),
                Users = new List<User>(),
                Messages = new List<Message>()
            });

            User user = s1.Users.First(x => x.ID == userID);
            s1.ChatRooms.Last().Users.Add(user);

            return Ok(s1.ChatRooms.Last());
        }

        [HttpPut, Route("api/chatroom/{chatRoomID}/join")]
        public IHttpActionResult JoinChatRoom(Guid chatRoomID)
        {
            Guid userID = GetUserIDFromHeader();

            ChatRoom chatRoom = FindChatRoom(chatRoomID);

            if (chatRoom.Users.All(x => x.ID != userID))
            {
                User user = s1.Users.First(x => x.ID == userID);
                chatRoom.Users.Add(user);
            }

            return Ok(chatRoom);
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
            ChatRoom chatRoom = FindChatRoom(chatRoomID);

            if (chatRoom.Users.All(x => x.ID != userID))
            {
                var response = new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent("User is not a member of this chatroom"),
                    ReasonPhrase = "User is not a member of this chatroom"
                };
                throw new HttpResponseException(response);
            }

            chatRoom.Messages.Add(new Message()
            {
                SenderID = userID,
                Content = messageData.Content,
                TimeStamp = DateTime.Now
            });

            return Ok(chatRoom);
        }

        //------------------------PRIVATES------------------

        private Guid GetUserIDFromHeader()
        {
            IEnumerable<string> stringID = Request.Headers.GetValues("UserID");
            //Guid userID = Guid.Parse(stringID.FirstOrDefault());
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

            return userID;
        }

        private ChatRoom FindChatRoom(Guid chatRoomID)
        {
            ChatRoom chatRoom = s1.ChatRooms.FirstOrDefault(x => x.ID == chatRoomID);

            if (chatRoom == null)
            {
                var response = new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent("Chat room could not be found for the given ID"),
                    ReasonPhrase = "Chat room could not be found for the given ID"
                };
                throw new HttpResponseException(response);
            }

            return chatRoom;
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
