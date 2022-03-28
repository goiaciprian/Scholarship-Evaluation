using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EvaluationAPI.Services
{
    public interface IService<T>
    {
        public Task<List<T>> GetAllAsync();

        public Task<T> GetByIdAsync(Guid id);

        public Task<T> CreateAsync(T model);

        public Task<T> UpdateAsync(Guid id, T model);

        public Task<T> DeleteByIdAsync(Guid id);

    }
}
