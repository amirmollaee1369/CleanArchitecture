using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CleanArch.Infra.Data.Migrations
{
    public partial class seedData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "People",
                columns: new[] { "Id", "DateofBirth", "Email", "FirstName", "LastName", "PhoneNumber", "RegDate" },
                values: new object[] { 1, new DateTime(2022, 2, 11, 23, 36, 38, 450, DateTimeKind.Local).AddTicks(3822), "amir.mollaee1369@gmail.com", "Amir", "Mollaee", "09154308951", new DateTime(2022, 2, 11, 23, 36, 38, 450, DateTimeKind.Local).AddTicks(3826) });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "People",
                keyColumn: "Id",
                keyValue: 1);
        }
    }
}
