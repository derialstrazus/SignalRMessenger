using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using TiTaTo.Data.DataAccess;

namespace TiTaTo.Data.Attributes
{
    public class RequireLogin: ActionFilterAttribute
    {
        SingletonDB s1 = SingletonDB.Instance;

        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            try {
                IEnumerable<string> stringID = actionContext.Request.Headers.GetValues("UserID");
                Guid userID = Guid.Parse(stringID.FirstOrDefault());
                bool userExists = s1.Users.Any(u => u.ID == userID);
                if (!userExists) {
                    throw new Exception("User is not found");
                    //TODO: throw a 403 error.  On front, redirect user to login.
                } else {
                    //TODO: save userID to a GlobalVaraible
                }
            }
            catch (Exception ex) {

                throw ex;
            }
            

            //base.OnActionExecuting(actionContext);
        }
    }
}