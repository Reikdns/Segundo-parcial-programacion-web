using Entity;
using System;

namespace Vista.Models
{
    public class VacunaInputModel
    {
        public string Nombre { get; set; }
        
        public DateTime FechaDeAplicacion { get; set; }    

        public string FkId { get; set; }
        
        
    }

    public class VacunaViewModel : VacunaInputModel{

        public VacunaViewModel()
        {
            
        }

        public VacunaViewModel(Vacuna vacuna)
        {
            Nombre = vacuna.Nombre;
            FechaDeAplicacion = vacuna.FechaDeAplicacion;
            EdadDeAplicacion = vacuna.EdadDeAplicacion;
            FkId = vacuna.FkId;
        }

        public int EdadDeAplicacion { get; set; }
    }
}