using AthleticFormLibrary.Interfaces;
using AthleticFormLibrary.DataAccess;
using Unity;


namespace AthleticFormLibrary
{
    public static class Injector
    {
        private static IUnityContainer _container;

        public static void RegisterTypes(IUnityContainer container)
        {
            _container = container;

            /* Registrations */
            _container.RegisterSingleton<IDataAccess, DatabaseAccess>();
        }

      
        public static T Resolve<T>()
        {
            // Return the resolution of the type passed in
            return (T)_container.Resolve(typeof(T));
        }
    }
}
