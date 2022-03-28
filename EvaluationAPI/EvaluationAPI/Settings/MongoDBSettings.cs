﻿namespace EvaluationAPI.Settings
{
    public class MongoDBSettings: IMongoDBSettings
    {
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
        public string CollectionName { get; set; }
    }
}
