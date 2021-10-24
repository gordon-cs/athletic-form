using AthleticFormLibrary;
using System.Web.Http;
using System.Web.Http.Cors;

namespace AthleticFormAPI
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            Injector.RegisterTypes();
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();
            EnableCorsAttribute corsAttribute =
                new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(corsAttribute);

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
