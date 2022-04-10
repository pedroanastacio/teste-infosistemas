import { createConnection, getConnectionOptions, getConnection } from 'typeorm';

export const connectDatabase = async (connectionName: string = 'dev') => {
    try {
        const connectionOptions = await getConnectionOptions(connectionName);
        await createConnection({ ...connectionOptions, name: 'default' });
        return import('./app');
    } catch (error) {
        console.error('Error: ', error);
    }
}

connectDatabase();

export const clearDatabase = async () => {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    entities.forEach(async (entity) => {
        const repository = connection.getRepository(entity.name);
        await repository.query(`DELETE FROM ${entity.tableName}`);
    });
};

