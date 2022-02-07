using AthleticFormLibrary.Interfaces;
using AthleticFormLibrary.DataAccess;
using AthleticFormLibrary.Utilities;
using AthleticFormLibrary.Emailer;
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
            _container.RegisterSingleton<IEmailer, EmailClient>();
            _container.RegisterSingleton<IReportGeneration, ReportGenerator>();
            _container.RegisterSingleton<IScheduler, EmailScheduler>();
        }

      
        public static T Resolve<T>()
        {
            // Return the resolution of the type passed in
            return (T)_container.Resolve(typeof(T));
        }
    }
}
