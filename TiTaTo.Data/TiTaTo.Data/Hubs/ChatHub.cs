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
        SingletonDB s1 = SingletonDB.Instance;

        public void Join(string playerID)
        {
            Guid playerGUID;
            bool parseSuccess = Guid.TryParse(playerID, out playerGUID);
            if (!parseSuccess)
            {
                throw new HubException("Improper GUID passed.");
            }

            User user = s1.Users.FirstOrDefault(u => u.ID == playerGUID);
            if (user == null)
            {
                //Clients.Caller.userDoesNotExist();
                throw new HubException("User does not exist");                
            }

            user.ConnectionID = Context.ConnectionId;
            //Notify all users
            Clients.All.SomeoneJoined(user.Name);
        }

        public void Send(string name, string message)
        {
            Clients.All.broadcastMessage(name, message);
        }

        public void CreateRoom()
        {
            //add room to db
            //notify all users that are invited to this room
        }

        public void UserOnline()
        {
            //add user to db
            //notify all users that someone is online and userlist needs to be updated
        }

        public void SendMessage(string message, string userID, string destinationChatRoom)
        {
            //add message to db
            //notify all users who are receivers
        }






        public override Task OnDisconnected(bool stopCalled)
        {
            User user = s1.Users.FirstOrDefault(u => u.ConnectionID == Context.ConnectionId);
            if (user != null)
            {
                user.ConnectionID = null;
            }
            return base.OnDisconnected(stopCalled);
        }
    }
}