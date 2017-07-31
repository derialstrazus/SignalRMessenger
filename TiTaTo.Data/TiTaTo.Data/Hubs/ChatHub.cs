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

        public void SendMessage(string message, string userID, string destinationChatRoom)
        {
            //add message to db
            //notify all users who are receivers
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