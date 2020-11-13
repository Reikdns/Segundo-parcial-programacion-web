using System;
using System.ComponentModel.DataAnnotations;

namespace Entity
{
    public class Vacuna
    {
        [Key]
        public int Id { get; set; }

        public string FkId {get; set;}
        
        public string Nombre { get; set; }
        
        public DateTime FechaDeAplicacion { get; set; }
        
        public int EdadDeAplicacion { get; set; }

        public void CalcularFechaDeAplicacion(DateTime fechaDeNacimiento)
        {
            EdadDeAplicacion = FechaDeAplicacion.Year - fechaDeNacimiento.Year;
        }
    } 
}