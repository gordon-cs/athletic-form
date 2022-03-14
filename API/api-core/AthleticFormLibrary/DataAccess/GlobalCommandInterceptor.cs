using Microsoft.EntityFrameworkCore.Diagnostics;
using System;
using System.Collections.Generic;

namespace AthleticFormLibrary.DataAccess
{
    public class GlobalCommandInterceptor : IObserver<KeyValuePair<string, object>>
    {
        public void OnCompleted()
        {

        }

        public void OnError(Exception error)
        {

        }

        public void OnNext(KeyValuePair<string, object> value)
        {
            if (value.Key == RelationalEventId.CommandExecuting.Name)
            {
                var command = ((CommandEventData)value.Value).Command;
                command.CommandText = command.CommandText.Replace(
                    "[webSQL.dbo].",
                    "[webSQL].[dbo].");

                command.CommandText = command.CommandText.Replace(
                    "[TmsEPrd.dbo].",
                    "[TmsEPrd].[dbo].");
            }
        }
    }
}
