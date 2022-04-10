import { validate } from 'class-validator';
import { DeleteResult, getCustomRepository, getRepository } from 'typeorm';
import { Vehicle } from '../entities/vehicle.entity';
import { ValidationException } from '../exceptions/ValidationException';
import { VehicleRepository } from '../repositories/vehicle.repository';

class VehicleService {

    constructor(private readonly vehicleRepository: VehicleRepository) { }

    private validateVehicle = async (data: Partial<Vehicle>): Promise<Vehicle> => {
        const repository = getRepository(Vehicle);
        const vehicle = repository.create({
            placa: data.placa,
            chassi: data.chassi,
            renavam: data.renavam,
            modelo: data.modelo,
            marca: data.marca,
            ano: data.ano
        });

        const errors = await validate(vehicle);

        if (errors.length > 0) {
            const message: string = errors.map(e => Object.values(e.constraints)).join(',')
            throw new ValidationException(message);
        }

        return vehicle;
    }

    public createVehicle = async (data: Partial<Vehicle>): Promise<Vehicle> => {
        const vehicle = await this.validateVehicle(data);

        return await this.vehicleRepository.createVehicle(vehicle);
    }

    public getAllVehicles = async (): Promise<Vehicle[]> => {
        return await this.vehicleRepository.getAllVehicles();
    }

    public updateVehicle = async (id: string, data: Partial<Vehicle>): Promise<Vehicle> => {
        await this.validateVehicle(data);
        
        return await this.vehicleRepository.updateVehicle(id, data);
    }

    public deleteVehicle = async (id: string): Promise<DeleteResult> => {
        return await this.vehicleRepository.deleteVehicle(id);
    }

    public getVehicleById = async (id: string): Promise<Vehicle> => {
        return await this.vehicleRepository.getVehicleById(id);
    }
}

export default new VehicleService(getCustomRepository(VehicleRepository));