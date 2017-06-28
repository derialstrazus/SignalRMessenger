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
        
        public string SenderName
        {
            get
            {
                User user = s1.Users.FirstOrDefault(x => x.ID == SenderID);     //What happens if this returns null?
                if (user != null)
                    return user.Name;
                else
                    return "";
            }
        }
        public string Content { get; set; }
        public DateTime TimeStamp { get; set; }
    }
}