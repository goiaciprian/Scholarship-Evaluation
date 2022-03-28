using AutoMapper;
using EvaluationAPI.DTOs;
using EvaluationAPI.Models;

namespace EvaluationAPI.Mapping
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            CreateMap<Intern, InternDTO>();
            CreateMap<InternDTO, Intern>();

        }
    }
}
