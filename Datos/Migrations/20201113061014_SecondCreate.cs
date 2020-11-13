using Microsoft.EntityFrameworkCore.Migrations;

namespace Datos.Migrations
{
    public partial class SecondCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FkId",
                table: "Vacunas",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FkId",
                table: "Vacunas");
        }
    }
}
