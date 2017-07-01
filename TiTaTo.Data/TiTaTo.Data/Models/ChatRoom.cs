using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TiTaTo.Data.Models
{
    public class ChatRoom
    {
        public Guid ID { get; set; }

        public List<User> Users { get; set; }

        private string _RoomName;

        public string RoomName
        {
            get { return (_RoomName != null) ? _RoomName : string.Join(", ", Users.Select(x => x.Name).ToList()); }
            set { _RoomName = value; }
        }

        public List<Message> Messages { get; set; }

        //TODO: Add list of recent users, by getting all users within the last 5 mins.
        //public List<string> RecentUsers { get; set; }
    }
}