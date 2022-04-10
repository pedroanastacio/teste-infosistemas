export = [
    {
        name: 'dev',
        type: 'better-sqlite3',
        database: './database/db.db',
        entities: ['./src/entities/*.{js,ts}'],
        migrations: ['./src/migrations/*.{js,ts}'],
        cli: {
            'entitiesDir': './src/entities',
            'migrationsDir': './src/migrations',
        },
        synchronize: false,
        migrationsRun: true,
        logging: false
    },
    {
        name: 'test',
        type: 'better-sqlite3',
        database: ':memory:',
        dropSchema: true,
        entities: ['./src/entities/*.{js,ts}'],
        synchronize: true,
        logging: false
    }
];