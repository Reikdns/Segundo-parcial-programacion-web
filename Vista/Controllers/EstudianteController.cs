using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entity;
using Logica;
using Datos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Vista.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class EstudianteController : ControllerBase 
    {
        private readonly EstudianteService _estudianteService;
        
        public EstudianteController(ParcialContext context)
        {
            _estudianteService = new EstudianteService(context);
        }

        [HttpGet]
        public IEnumerable<Estudiante> Gets()
        {
            var estudiantes = _estudianteService.ConsultarTodos();
            return estudiantes;
        }

        [HttpGet("{identificacion}")]
        public ActionResult<Estudiante> Get(string identificacion)
        {
            var estudiante = _estudianteService.BuscarPorIdentificacion(identificacion);
            if (estudiante == null) return NotFound();
            return estudiante;
        }

        [HttpPost]
        public ActionResult<Estudiante> Post(Estudiante estudiante)
        {
            var response = _estudianteService.Guardar(estudiante);
            if (response.Error) 
            {
                return BadRequest(response.Mensaje);
            }
            return Ok(response.Estudiante);
        }

    }
}