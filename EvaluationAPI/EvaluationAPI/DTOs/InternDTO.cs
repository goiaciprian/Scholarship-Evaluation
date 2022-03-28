using System;
using System.ComponentModel.DataAnnotations;

namespace EvaluationAPI.DTOs
{
    public class InternDTO
    {
        public Guid? Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public DateTime BirthDate { get; set; }
    }
}
