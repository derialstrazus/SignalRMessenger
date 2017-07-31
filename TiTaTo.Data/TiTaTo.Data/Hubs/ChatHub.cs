using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.SignalR;
using TiTaTo.Data.DataAccess;
using TiTaTo.Data.Models;

namespace TiTaTo.Data.Hubs
{
    public class ChatHub : Hub
    {
        //TODO: Get rid of this
        public void Send(string name, string message)
        {
            Clients.All.broadcastMessage(name, message);
        }







        SingletonDB s1 = SingletonDB.Instance;

        public void Join(string userIDString)
        {
            //Get the ID
            Guid userID;
            bool parseSuccess = Guid.TryParse(userIDString, out userID);
            if (!parseSuccess) {
                throw new HubException("Improper GUID passed.");
            }

            //Find the user
            User user = s1.Users.FirstOrDefault(u => u.ID == userID);
            if (user == null) {                
                throw new HubException("User does not exist");
            }

            //Establish user
            user.ConnectionID = Context.ConnectionId;
            user.LastOnline = DateTime.MaxValue;

            //Help client render
            var chatRooms = s1.ChatRooms
                .Where(x => x.Users.Any(y => y.ID == userID) || x.IsPublic)
                .Select(c => new { ID = c.ID, RoomName = c.RoomName });            
            IEnumerable<User> users = s1.Users;
            Clients.Caller.Initialize(new {
                chatRooms = chatRooms.ToList(),
                users = users.ToList()
            });

            //Notify all other users
            Clients.Others.SomeoneJoined(user);
        }        

        public void CreateRoom()
        {
            //add room to db
            //notify all users that are invited to this room
        }

        public void EnterRoom(string roomIDString)
        {
            //Get the room GUID
            Guid roomID;
            bool parseSuccess = Guid.TryParse(roomIDString, out roomID);
            if (!parseSuccess) {
                throw new HubException("Improper GUID passed");
            }

            //Get the room
            ChatRoom chatRoom = s1.ChatRooms.FirstOrDefault(x => x.ID == roomID);
            if (chatRoom == null) {
                throw new HubException("Chat room does not exist");
            }

            //Get the user
            var userConnectionString = Context.ConnectionId;
            var user = s1.Users.FirstOrDefault(x => x.ConnectionID == userConnectionString);
            if (user == null) {
                throw new HubException("User does not exist");
            }

            //If user not a member of this room, add him to the room
            //TODO: Figure out security for this
            if (chatRoom.Users.All(x => x.ID != user.ID)) {
                chatRoom.Users.Add(user);
                chatRoom.LastUpdated = DateTime.Now;
            }
            //var asActiveUser = chatRoom.ActiveUsers.FirstOrDefault(x => x.ID != user.ID);
            //if (asActiveUser == null) {
            //    chatRoom.ActiveUsers.Add(user);                
            //} else {
            //    asActiveUser = user;
            //}

            Clients.Caller.RoomEntered(chatRoom);
        }

        public void SendMessage(string message, string roomIDString)
        {
            //add message to db
            //notify all users who are receivers

            //Get the room GUID
            Guid roomID;
            bool parseSuccess = Guid.TryParse(roomIDString, out roomID);
            if (!parseSuccess) {
                throw new HubException("Improper GUID passed");
            }

            //Get the room
            ChatRoom chatRoom = s1.ChatRooms.FirstOrDefault(x => x.ID == roomID);
            if (chatRoom == null) {
                throw new HubException("Chat room does not exist");
            }

            //Get the user
            var userConnectionString = Context.ConnectionId;
            var user = s1.Users.FirstOrDefault(x => x.ConnectionID == userConnectionString);
            if (user == null) {
                throw new HubException("User does not exist");
            }
            if (chatRoom.Users.All(x => x.ID != user.ID)) {
                throw new HubException("User is not allowed to talk in this chatroom");
            }

            //Add message to db
            chatRoom.Messages.Add(new Message()
            {
                SenderID = user.ID,
                Content = message,
                TimeStamp = DateTime.Now
            });
            var thisMessage = chatRoom.Messages.Last();

            //Notify all members
            foreach (User member in chatRoom.ActiveUsers) {
                Clients.Client(member.ConnectionID).newMessage(thisMessage);
            }
        }






        public override Task OnDisconnected(bool stopCalled)
        {
            User user = s1.Users.FirstOrDefault(u => u.ConnectionID == Context.ConnectionId);
            if (user != null) {
                user.ConnectionID = null;
                user.LastOnline = DateTime.Now;
            }
            return base.OnDisconnected(stopCalled);
        }
    }
}