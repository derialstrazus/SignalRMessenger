using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TiTaTo.Data.Models
{
    public class TicGame
    {
        public Guid Player1ID { get; set; }
        public Guid Player2ID { get; set; }

        public int Board { get; set; }
        public int PlayerTurn { get; set; }


    }
}