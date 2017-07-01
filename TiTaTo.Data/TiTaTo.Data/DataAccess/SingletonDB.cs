using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TiTaTo.Data.Models;

namespace TiTaTo.Data.DataAccess
{
    public sealed class SingletonDB
    {
        #region "Singleton Framework"
        private static readonly SingletonDB instance = new SingletonDB();

        static SingletonDB() { }

        private SingletonDB() { }

        public static SingletonDB Instance
        {
            get { return instance; }
        }
        #endregion

        //public List<Message> Messages { get; set; }
        public List<User> Users { get; set; }
        public List<ChatRoom> ChatRooms { get; set; }


        public void Initialize()
        {
            //Messages = new List<Message>();
            Users = new List<User>();
            ChatRooms = new List<ChatRoom>();

            //Messages.Add(new Message { ID = 1, Sender = "Derek", Receiver = "Benedict", Content = "Hello" });
            //Messages.Add(new Message { ID = 2, Sender = "Benedict", Receiver = "Derek", Content = "Hello Back!" });
            //Messages.Add(new Message { ID = 3, Sender = "Derek", Receiver = "Benedict", Content = "Goodbye" });
            //Messages.Add(new Message { ID = 4, Sender = "Derek", Receiver = "Adrian", Content = "Hello" });

            Users.Add(new User()
            {
                ID = Guid.NewGuid(),
                Name = "Telemetry",
                LastOnline = DateTime.Now
            });

            Users.Add(new User()
            {
                ID = Guid.NewGuid(),
                Name = "Harmony",
                LastOnline = DateTime.Now
            });

            ChatRooms.Add(new ChatRoom() {
                ID = Guid.NewGuid(),
                Users = new List<User>() {
                    Users[0],
                    Users[1]
                },
                Messages = new List<Message>()
                {
                    new Message() { Content = "Hello!", SenderID = Users[1].ID, TimeStamp = DateTime.Now},
                    new Message() { Content = "Greetings", SenderID = Users[0].ID, TimeStamp = DateTime.Now}
                },
                RoomName = "General Chat"
            });
        }
    }
}