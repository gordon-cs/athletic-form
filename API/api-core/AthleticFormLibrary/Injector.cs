using AthleticFormLibrary.Interfaces;
using AthleticFormLibrary.DataAccess;
using Unity;


namespace AthleticFormLibrary
{
    // This is a DI container class. It automates DI so that the programmer doesen't have to do it manually.

    public static class Injector
    {
        private static IUnityContainer _container;


        public static void RegisterTypes(IUnityContainer container)
        {
            _container = container;

            /* 
                Register types here. 
                RegisterType is registering an instance,
               while RegisterSingleton will create the class only if it doesn't exist already.

               RegisterType says, "Whenever a constructor asks for a type of ITest, give it a Test. 
               RegisterSingleton says the same thing, but as a singleton.

               There are other registration types, but these are the basic ones.
            */

            /* Registrations */
            _container.RegisterSingleton<IDataAccess, DatabaseAccess>();
        }

        /*
            This method basically does the same thing as 
                testObj = new TestObj(),
            but the DI way 
        */
        public static T Resolve<T>()
        {
            // Return the resolution of the type passed in
            return (T)_container.Resolve(typeof(T));
        }
    }
}
