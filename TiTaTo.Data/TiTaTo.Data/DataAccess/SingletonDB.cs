﻿using System;
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
            Users = new List<User>();
            ChatRooms = new List<ChatRoom>();
            
            Users.Add(new User()
            {
                ID = Guid.NewGuid(),
                Name = "Server",
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
                    new Message() { Content = "Hello.  Welcome to the general chat room.", SenderID = Users[0].ID, TimeStamp = DateTime.Now}
                },
                RoomName = "General Chat"
            });
        }
    }
}