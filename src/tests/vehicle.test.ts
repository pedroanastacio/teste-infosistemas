import { connectDatabase, clearDatabase } from '..';
import { getConnection, getRepository } from 'typeorm';
import { Vehicle } from '../entities/vehicle.entity';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiJsonSchema from 'chai-json-schema';

chai.use(chaiHttp);
chai.use(chaiJsonSchema);

const newVehicle = {
    placa: 'ADP0757',
    chassi: '33nWRrz548wAA2731',
    renavam: '91020694923',
    modelo: 'Uno',
    marca: 'FIAT',
    ano: 2006
}

var vehicleSchema = {
    type: 'object',
    required: ['id', 'placa', 'chassi', 'renavam', 'modelo', 'marca', 'ano', 'created_at', 'updated_at'],
    properties: {
        id: {
            type: 'string'
        },
        placa: {
            type: 'string',
            length: 7
        },
        chassi: {
            type: 'string',
            length: 17
        },
        renavam: {
            type: 'string',
            length: 11
        },
        modelo: {
            type: 'string'
        },
        marca: {
            type: 'string'
        },
        ano: {
            type: 'number',
            minimum: 1900,
            maxium: 2100
        },
        created_at: {
            type: 'string'
        },
        updated_at: {
            type: 'string'
        }
    }
};

const createNewVehicle = async (vehicle: Partial<Vehicle> = newVehicle): Promise<Vehicle> => {
    const vehicleRepository = getRepository(Vehicle);
    return await vehicleRepository.save(vehicle);
}

describe('Vehicles CRUD unit tests', () => {

    let app;

    before(async () => {
        const mod = await connectDatabase('test');
        app = (mod as any).default;
    });

    after(async () => {
        await getConnection().close();
    });

    afterEach(async () => {
        await clearDatabase();
    });

    describe('/POST veiculo', () => {

        it('should register a vehicle', (done) => {
            chai.request(app)
                .post('/veiculo')
                .send(newVehicle)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.jsonSchema(vehicleSchema);
                    done();
                });
        });

        describe('should not register a vehicle', () => {
            let createdVehicle: Vehicle;

            before(async () => {
                createdVehicle = await createNewVehicle();
            })

            it('with same license plate', (done) => {
                chai.request(app)
                    .post('/veiculo')
                    .send(newVehicle)
                    .end((err, res) => {
                        expect(res).to.have.status(500);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('code', 'SQLITE_CONSTRAINT_UNIQUE');
                        done();
                    });
            });

            it('without chassi', (done) => {
                let vehicleToBeRegistered = { ...newVehicle };
                delete vehicleToBeRegistered.chassi;

                chai.request(app)
                    .post('/veiculo')
                    .send(vehicleToBeRegistered)
                    .end((err, res) => {
                        expect(res).to.have.status(400);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('name', 'Validation Error');
                        expect(res.body).to.have.property('code');
                        expect(res.body).to.have.property('message').to.include('Chassi');
                        done();
                    });
            });
        });
    });

    describe('/GET veiculo', () => {

        it('should list all the vehicles', (done) => {
            chai.request(app)
                .get('/veiculo')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array').be.empty;
                    done();
                })
        });

    });

    describe('/PUT veiculo/:id', () => {
        let createdVehicle: Vehicle;

        before(async () => {
            createdVehicle = await createNewVehicle();
        })

        it('should update a vehicle given the id', (done) => {
            chai.request(app)
                .put(`/veiculo/${createdVehicle.id}`)
                .send(newVehicle)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.jsonSchema(vehicleSchema);
                    done();
                })
        })
    });

    describe('/DELETE veiculo/:id ', () => {
        let createdVehicle: Vehicle;

        before(async () => {
            createdVehicle = await createNewVehicle();
        })

        it('should delete a vehicle given the id', (done) => {
            chai.request(app)
                .delete(`/veiculo/${createdVehicle.id}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('raw');
                    expect(res.body).to.have.property('affected').eql(1);
                    done();
                })
        });
    });

    describe('/GET veiculo/:id', () => {
        let createdVehicle: Vehicle;

        before(async () => {
            createdVehicle = await createNewVehicle();
        })

        it('should get a vehicle given the id', (done) => {
            chai.request(app)
                .get(`/veiculo/${createdVehicle.id}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.jsonSchema(vehicleSchema);
                    done();
                })
        })
    });
});


