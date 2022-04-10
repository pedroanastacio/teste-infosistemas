import { Vehicle } from '../entities/vehicle.entity';
import { DeleteResult, EntityRepository, Repository } from 'typeorm';

@EntityRepository(Vehicle)
export class VehicleRepository extends Repository<Vehicle> {

    public createVehicle = async (vehicle: Vehicle): Promise<Vehicle> => {
        return await this.save(vehicle);
    }

    public getAllVehicles = async (): Promise<Vehicle[]> => {
        return await this.find({ order: { modelo: 'ASC' }});
    }

    public updateVehicle = async (id: string, data: Partial<Vehicle>): Promise<Vehicle> => {
        await this.update({ id }, {
            placa: data.placa,
            chassi: data.chassi,
            renavam: data.renavam,
            modelo: data.modelo,
            marca: data.marca,
            ano: data.ano,
        });

        return await this.findOne(id);
    }

    public deleteVehicle = async (id: string): Promise<DeleteResult> => {
        return await this.delete(id);
    }

    public getVehicleById = async (id: string): Promise<Vehicle> => {
        return await this.findOne(id);
    }
}