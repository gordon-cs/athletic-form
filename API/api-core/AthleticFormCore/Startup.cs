using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Unity;
using AthleticFormLibrary;
using AthleticFormLibrary.DataAccess;
using AthleticFormLibrary.Utilities;
using Microsoft.EntityFrameworkCore;
using AthleticFormLibrary.Interfaces;
using System;
using ReadExcelFile;

namespace AthleticFormCore
{
    public class Startup
    {
        string userSecret = string.Empty;
        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {

            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            
            if(env.IsDevelopment()) {
                builder.AddUserSecrets<Startup>();
            }

            Configuration = builder.Build();
        }

        public IConfiguration Configuration { get; }


        public void ConfigureContainer(IUnityContainer container) {
            Injector.RegisterTypes(container);
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            userSecret = Configuration["LocalConnectionString"];  
            services.AddCors();
            services.AddDbContext<AthleticContext>(options => {
                options.UseSqlServer(userSecret);
            });
                        
            services.AddControllers();
                services.AddMvc()
                    .AddControllersAsServices();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IScheduler emailScheduler)
        {
            if(env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();
            

            app.UseCors(builder => {
                    builder.WithOrigins("http://localhost:3000")
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                });     

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            
            app.UseWelcomePage();

            // Finally, start the email scheduling service
            emailScheduler.ScheduleWeeklyTask();
            /*For testing purposes.  Sends every 3 minutes instead
                of every week.*/
            //emailScheduler.ScheduleTestTask();

            ExcelDataReader dr = new ExcelDataReader();
            dr.ReadExcelFile("./AthleticFormLibrary/ExcelImporter/test.xlsx");
        }
    }
}
