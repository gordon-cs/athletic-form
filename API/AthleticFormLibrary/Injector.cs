using AthleticFormLibrary.Interfaces;
using AthleticFormLibrary.DataAccess;
using Unity;
using System.Web.Http;
using Unity.WebApi;
using AthleticFormLibrary.Models;

namespace AthleticFormLibrary
{
    // This is a DI container class. It automates DI so that the programmer doesen't have to do it manually.

    public static class Injector
    {
        private static IUnityContainer _container;

        // Ensures there is only one IUnityContainer
        public static IUnityContainer Container
        {
            get
            {
                if (_container == null)
                    RegisterTypes();
                return _container;
            }
        }

        public static void RegisterTypes()
        {
            _container = new UnityContainer();

            /* 
                Register types here. 
                RegisterType is registering an instance,
               while RegisterSingleton will create the class only if it doesn't exist already.

               RegisterType says, "Whenever a constructor asks for a type of ITest, give it a Test. 
               RegisterSingleton says the same thing, but as a singleton.

               There are other registration types, but these are the basic ones.
            */
                    
            /* Registrations go in this section */
            _container.RegisterSingleton<IDataAccess, DatabaseAccess>()
            
            
            /* Registrations go in this section */
            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(_container);
        }

        /*
            This method basically does the same thing as 
                testObj = new TestObj(),
            but the DI way 
        */

        public static T Resolve<T>()
        {
            // Return the resolution of the type passed in
            return (T)Container.Resolve(typeof(T));
        }
    }
}
