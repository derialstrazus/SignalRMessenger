using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TiTaTo.Data.DataAccess;

namespace TiTaTo.Data.Controllers
{
    public class TicController : ApiController
    {
        SingletonDB s1 = SingletonDB.Instance;

        public IHttpActionResult GetCurrentBoard(int playerID)
        {
            throw new NotImplementedException();
        }

        public IHttpActionResult Move()
        {
            //Find board
            //Check if legal move
            //Update board
            //Return board
            throw new NotImplementedException();
        }
    }
}
