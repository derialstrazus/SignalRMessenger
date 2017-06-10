using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Routing;
using TiTaTo.Data.DataAccess;

namespace TiTaTo.Data
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);

            SingletonDB s1 = SingletonDB.Instance;
            s1.Initialize();
        }
    }
}
