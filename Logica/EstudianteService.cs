using System;
using Datos;
using Entity;
using System.Collections.Generic;
using System.Linq;

namespace Logica
{
    public class EstudianteService
    {
        private readonly ParcialContext _context;
        public EstudianteService(ParcialContext context)
        {
            _context = context;
        }

        public GuardarEstudianteResponse Guardar(Estudiante estudiante)
        {
            try
            {   
                var estudianteBuscado = _context.Estudiantes.Find(estudiante.Identificacion);
                if (estudianteBuscado != null)
                {
                    return new GuardarEstudianteResponse("Error, el estudiante ya se encuentra registrada.");
                }

                _context.Estudiantes.Add(estudiante);
                _context.SaveChanges();

                return new GuardarEstudianteResponse(estudiante);
            }
            catch (Exception e)
            {
                return new GuardarEstudianteResponse($"Error de la Aplicacion: {e.Message}");
            }
        }

        public List<Estudiante> ConsultarTodos()
        {
            List<Estudiante> estudiantes = _context.Estudiantes.ToList();
            return estudiantes;    
        }

        public Estudiante BuscarPorIdentificacion(string identificacion)
        {
            Estudiante estudiante = _context.Estudiantes.Find(identificacion);
            return estudiante;
        }
    }
    
        public class GuardarEstudianteResponse 
        {
            public GuardarEstudianteResponse(Estudiante estudiante)
            {
                Error = false;
                Estudiante = estudiante;
            }
            public GuardarEstudianteResponse(string mensaje)
            {
                Error = true;
                Mensaje = mensaje;
            }
            public bool Error { get; set; }
            public string Mensaje { get; set; }
            public Estudiante Estudiante { get; set; }
        }
}
