using EvaluationAPI.Models;
using EvaluationAPI.Settings;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EvaluationAPI.Services.InternService
{
    public class InternService : IInternService
    {
        private readonly IMongoCollection<Intern> _interns;

        public InternService(IMongoDBSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _interns = database.GetCollection<Intern>(settings.CollectionName); ;
        }

        public async Task<Intern> CreateAsync(Intern intern)
        {
            intern.Id = Guid.NewGuid();
            await _interns.InsertOneAsync(intern);
            return intern;
        }

        public async Task<Intern> DeleteByIdAsync(Guid id)
        {
            return await _interns.FindOneAndDeleteAsync( intern => intern.Id == id);
        }

        public async Task<List<Intern>> GetAllAsync()
        {
            return await (await _interns.FindAsync(intern => true)).ToListAsync();
        }

        public async Task<Intern> GetByIdAsync(Guid id)
        {
            return await (await _interns.FindAsync(intern => intern.Id == id)).FirstOrDefaultAsync();
        }

        public async Task<Intern> UpdateAsync(Guid id, Intern intern)
        {
            await _interns.FindOneAndReplaceAsync(intern => intern.Id == id, intern);
            return intern;
        }
    }
}
