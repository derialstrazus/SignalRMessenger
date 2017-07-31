using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TiTaTo.Data.Models
{
    public class User
    {
        public Guid ID { get; set; }
        public string Name { get; set; }

        //TODO: each API call should update LastOnline.
        //Find a way to periodically clean out singletonDB if LastOnline exceeds 30 min.
        public DateTime LastOnline { get; set; }

        public string ConnectionID { get; set; }

        public List<ChatRoom> ActiveIn { get; set; }
    }
}