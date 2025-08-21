using API.Extensions;
using API.Helpers;
using API.Middleware;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Реєструємо DI
builder.Services.AddAutoMapper(typeof(MappingProfiles));
builder.Services.AddControllers();

// Підключаємо DbContext (Sqlite)
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
builder.Services.AddDbContext<StoreContext>(x => x.UseSqlite(connectionString));

// Підключаємо ApplicationServicesExtensions
builder.Services.AddApplicationServices();

// Підключаємо SwaggerServiceExtension
builder.Services.AddSwaggerDocumentation();

var app = builder.Build();

// 🔹 Виконуємо міграцію БД під час старту
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var loggerFactory = services.GetRequiredService<ILoggerFactory>();
    try
    {
        var context = services.GetRequiredService<StoreContext>();
        await context.Database.MigrateAsync();
        await StoreContextSeed.SeedAsync(context, loggerFactory);
    }
    catch (Exception ex)
    {
        var logger = loggerFactory.CreateLogger<Program>();
        logger.LogError(ex, "An error occurred during migration");
    }
}

app.UseMiddleware<ExceptionMiddleware>();

//Використовуємо SwaggerServiceExtension
app.UseSwaggerDocumentation();

app.UseStatusCodePagesWithReExecute("/errors/{0}");

app.UseHttpsRedirection();
app.UseRouting();
app.UseStaticFiles();
app.UseAuthorization();
app.MapControllers();

app.Run();