using CleanArch.Framework.Auth;
using CleanArch.Framework.Auth.Extentions;
using CleanArch.Infra.Data.Context;
using CleanArch.Infra.Data.Mapping;
using CleanArch.Infra.Data.SeedData;
using CleanArch.Infra.IOC;
using MediatR;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

//Add Auth Settings Section
var authSettingsSection = builder.Configuration.GetSection("AuthSettings");
builder.Services.Configure<AuthSettings>(authSettingsSection);
var authSettings = authSettingsSection.Get<AuthSettings>();
// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(container=>
{
    container.JsonSerializerOptions.PropertyNamingPolicy = null;
}
);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOurAuthentication(authSettings);
builder.Services.AddOurSwaager();
builder.Services.AddDbContext<CleanArchDBContext>(op => op.UseSqlServer(builder.Configuration.GetConnectionString("CleanArchDBConnection")));

DependencyContainer.RegisterDependency(builder.Services);
//builder.Services.AddMediatR(typeof(GetAllPersonQuery));
builder.Services.AddAutoMapper(typeof(MappingProfile));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    SeedData.Initialize(services);
}

app.UseCors(x => x
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());


app.UseHttpsRedirection();

//app.UseRouting();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
