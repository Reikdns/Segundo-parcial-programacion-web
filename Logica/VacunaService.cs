using System;
using Datos;
using Entity;
using System.Collections.Generic;
using System.Linq;

namespace Logica
{
    public class VacunaService
    {
        private readonly ParcialContext _context;
        public VacunaService(ParcialContext context)
        {
            _context = context;
        }

        public GuardarVacunaResponse Guardar(Vacuna vacuna)
        {
            try
            {   
                EstudianteService _estudianteService = new EstudianteService(_context);
                
                Estudiante estudiante = _estudianteService.BuscarPorIdentificacion(vacuna.FkId);

                if (estudiante == null)
                {
                    return new GuardarVacunaResponse("No hay ningun estudiante con esa identificacion.");
                }

                vacuna.CalcularFechaDeAplicacion(estudiante.FechaDeNacimiento);
                
                
                estudiante.Vacunas = new List<Vacuna>();

                estudiante.Vacunas.Add(vacuna);

                _context.SaveChanges(); 

                return new GuardarVacunaResponse(vacuna);
            }
            catch (Exception e)
            {
                return new GuardarVacunaResponse($"Error de la Aplicacion: {e.Message}");
            }
        }

        public List<Vacuna> ConsultarTodos()
        {
            List<Vacuna> vacunas = _context.Vacunas.ToList();
            return vacunas;    
        }

        public Vacuna BuscarPorIdentificacion(string identificacion)
        {
            Vacuna vacuna = _context.Vacunas.Find(identificacion);
            return vacuna;
        }
    }
    
    public class GuardarVacunaResponse 
    {
        public GuardarVacunaResponse(Vacuna vacuna)
        {
            Error = false;
            Vacuna = vacuna;
        }
        public GuardarVacunaResponse(string mensaje)
        {
            Error = true;
            Mensaje = mensaje;

        }

        public bool Error { get; set; }
        public string Mensaje { get; set; }
        public Vacuna Vacuna { get; set; }
    }   
}