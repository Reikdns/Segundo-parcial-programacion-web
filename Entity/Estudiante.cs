using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Entity
{
    public class Estudiante
    {
        public string TipoDeDocumento { get; set; }
        
        [Key]
        public string Identificacion { get; set; }
        
        public string Nombre { get; set; }
        
        public DateTime FechaDeNacimiento { get; set; }
        
        public string InstitucionEducativa { get; set; }
        
        public string NombreDelAcudiente { get; set; }
        
        public List<Vacuna> Vacunas { get; set; } 

        public Estudiante()
        {
            Vacunas = new List<Vacuna>();
        }
    }
} 
