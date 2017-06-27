using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TiTaTo.Data.Models
{
    public class ChatRoom
    {
        public Guid ID { get; set; }
        public List<Guid> UserIDs { get; set; }
        public List<Message> Messages { get; set; }
    }
}