using AutoMapper;
using EvaluationAPI.DTOs;
using EvaluationAPI.Models;
using EvaluationAPI.Services.InternService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EvaluationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InternsController : ControllerBase
    {
        private readonly IInternService _internService;
        private readonly IMapper _mapper;

        public InternsController(IInternService service, IMapper mapper)
        {
            _internService = service ?? throw new ArgumentNullException(nameof(service));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        /// <summary>
        /// Get all interns
        /// </summary>
        /// <response code="200">Success</response>
        /// <response code="500">Server error</response>
        [HttpGet]
        public async Task<IActionResult> GetAllInternsAsync()
        {
            var dtos = _mapper.Map<List<InternDTO>>(await _internService.GetAllAsync());
            return Ok(dtos);
        }

        /// <summary>
        /// Get intern by id
        /// </summary>
        /// <param name="id">Id of the intern</param>
        /// <response code="200">Success</response>
        /// <response code="500">Server error</response>
        [HttpGet("{id}", Name = "GetById")]
        public async Task<IActionResult> GetInternByIdAsync([FromRoute] Guid id)
        {
            var intern = await _internService.GetByIdAsync(id);
            if (intern == null)
                return NotFound();
            return Ok(_mapper.Map<InternDTO>(intern));

        }

        /// <summary>
        /// Create a new intern
        /// </summary>
        /// <param name="internDTO">Intern object</param>
        /// <response code="200">Success</response>
        /// <response code="500">Server error</response>
        [HttpPost]
        public async Task<IActionResult> CreateInternAsync([FromBody] InternDTO internDTO)
        {
            var intern = _mapper.Map<Intern>(internDTO);
            var createdIntern = await _internService.CreateAsync(intern);
            return CreatedAtRoute("GetById", new { id = createdIntern.Id }, _mapper.Map<InternDTO>(createdIntern));
        }

        /// <summary>
        /// Updates an existing intern
        /// </summary>
        /// <param name="id">id of the existing intern</param>
        /// <param name="internDTO">updated intern object</param>
        /// <response code="200">Success</response>
        /// <response code="500">Server error</response>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateInternAsync([FromRoute] Guid id, [FromBody] InternDTO internDTO)
        {
            internDTO.Id = id;
            var intern = _mapper.Map<Intern>(internDTO);
            var updatedIntern = await _internService.UpdateAsync(id, intern);
            if (updatedIntern == null)
                return NotFound();
            return Ok(_mapper.Map<InternDTO>(intern));
        }

        /// <summary>
        /// Delete an intern by id
        /// </summary>
        /// <param name="id">Id of the intern</param>
        /// <response code="200">Success</response>
        /// <response code="500">Server error</response>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInternById([FromRoute] Guid id)
        {
            var intern = await _internService.DeleteByIdAsync(id);
            if (intern == null)
                return NotFound();
            return Ok(_mapper.Map<InternDTO>(intern));
        }
    }
}
