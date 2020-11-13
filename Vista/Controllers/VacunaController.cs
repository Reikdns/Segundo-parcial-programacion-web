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
using Vista.Models;

namespace Vista.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VacunaController : ControllerBase
    {
        private readonly VacunaService _vacunaService;

        public VacunaController(ParcialContext context)
        {
            _vacunaService = new VacunaService(context);
        }

        [HttpGet]
        public IEnumerable<VacunaViewModel> Gets()
        {
            var vacunas = _vacunaService.ConsultarTodos().Select(p=> new VacunaViewModel(p));
            return vacunas;
        }

        // [HttpGet("{identificacion}")]
        // public ActionResult<UsuarioViewModel> Get(string identificacion)
        // {
        //     var usuario = _usuarioService.BuscarPorIdentificacion(identificacion);
        //     if (usuario == null) return NotFound();
        //     var usuarioViewModel = new UsuarioViewModel(usuario);
        //     return usuarioViewModel;
        // }

        [HttpPost("{key}")]
        public ActionResult<VacunaViewModel> Post(VacunaInputModel vacunaInput, string key)
        {
           Vacuna vacuna = MapearVacuna(vacunaInput, key);
            var response = _vacunaService.Guardar(vacuna, key);
            if (response.Error) 
            {
                return BadRequest(response.Mensaje);
            }
            return Ok(response.Vacuna);
        }

        private Vacuna MapearVacuna(VacunaInputModel vacunaInput, string key)
        {
            var vacuna = new Vacuna
            {
                Nombre = vacunaInput.Nombre,
                FechaDeAplicacion = vacunaInput.FechaDeAplicacion,
                FkId = key
            };
            return vacuna;
        }
    }
}