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

        public string RoomName
        {
            get {
                List<string> test = Users.Select(x => x.Name).ToList();
                return string.Join(", ", test);
            }
        }

        public List<Message> Messages { get; set; }
    }
}