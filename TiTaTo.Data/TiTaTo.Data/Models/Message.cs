using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TiTaTo.Data.DataAccess;

namespace TiTaTo.Data.Models
{
    public class Message
    {
        SingletonDB s1 = SingletonDB.Instance;

        public Guid SenderID { get; set; }

        //TODO: Test if this works
        public string SenderName {
            get {
                User user = s1.Users.FirstOrDefault(x => x.ID == SenderID);     //What happens if this returns null?
                return user.Name;
            }
        }
        public string Content { get; set; }
        public DateTime TimeStamp { get; set; }
    }
}