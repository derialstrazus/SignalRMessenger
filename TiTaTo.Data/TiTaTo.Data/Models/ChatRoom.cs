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
        
        public string RecentUsers {
            get {
                List<string> recentUserCollection = Messages.OrderByDescending(x => x.TimeStamp).Take(5).Select(x => x.SenderName).ToList();
                return string.Join(", ", recentUserCollection);
            }
        }

        public bool IsPrivate { get; set; } = false;
    }
}