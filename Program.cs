using System.Net;
using System.Reflection;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using prosjekt_uke.Context;
using prosjekt_uke.Services;
using Serilog;
using Serilog.Formatting.Compact;
using Serilog.Formatting.Json;

Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Debug()
    .WriteTo.Console()
    .WriteTo.Async(a =>
        a.File(
            new JsonFormatter(renderMessage: true),
            // Properely deliniate logfiles with a basename and a timestamp
            "logs/rest_api_.log",
            rollingInterval: RollingInterval.Day
        )
    )
    .CreateLogger();
try
{
    Log.Information("Starting web application");

    var builder = WebApplication.CreateBuilder(args);
    builder.Services.AddSerilog();
    builder.Services.AddSingleton<DataContext>();
    // We could so much more easily avoid having to run a background job if we used a database, but oh well.
    builder.Services.AddBackgroundJob<DataBackgroundJob>(job =>
    {
        job.Cron = "*/1 * * * *";
        job.RunImmediately = true;
    });
    builder.Services.AddControllersWithViews();
    builder.Services.AddRouting(options =>
    {
        options.LowercaseUrls = true;
    });
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen(options =>
    {
        options.SwaggerDoc(
            "v1",
            new OpenApiInfo
            {
                Version = "v1",
                Title = "Celebration booking API",
                Description = "Providing an API for booking celebrations with other families",
            }
        );
        var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
        options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
    });

    var app = builder.Build();
    // CRITICAL: Ensures background tasks are started
    await app.Services.WarmUpAsync();
    // wwwroot
    app.UseDefaultFiles();
    app.UseStaticFiles();

    if (app.Environment.IsDevelopment())
    {
        Log.Debug("Develop environment, enabling Swapper & OpenAPI");
        app.UseSwagger();
        app.UseSwaggerUI(options =>
        {
            options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
            options.RoutePrefix = "swagger";
        });
    }

    app.MapControllers();

    await app.RunAsync();
}
catch (Exception ex)
{
    Log.Fatal(ex, "Application terminated unexpectedly");
}
finally
{
    await Log.CloseAndFlushAsync();
}
