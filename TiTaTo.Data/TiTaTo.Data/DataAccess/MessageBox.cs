using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TiTaTo.Data.Models;

namespace TiTaTo.Data.DataAccess
{
    public sealed class MessageBox
    {
        //#region
        private static readonly MessageBox instance = new MessageBox();

        static MessageBox() { }

        private MessageBox() { }

        public static MessageBox Instance
        {
            get { return instance; }
        }
        //#endregion

        public List<Message> messages { get; set; }

        public void Initialize()
        {
            messages = new List<Message>();
            messages.Add(new Message { ID = 1, Sender = "Derek", Receiver = "Benedict", Content = "Hello" });
            messages.Add(new Message { ID = 2, Sender = "Benedict", Receiver = "Derek", Content = "Hello Back!" });
            messages.Add(new Message { ID = 3, Sender = "Derek", Receiver = "Benedict", Content = "Goodbye" });
            messages.Add(new Message { ID = 4, Sender = "Derek", Receiver = "Adrian", Content = "Hello" });
        }
    }
}