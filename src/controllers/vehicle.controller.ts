import { Request, Response, NextFunction } from 'express';
import VehicleService from '../services/vehicle.service';

class VehicleController {

   constructor(private readonly vehicleService: typeof VehicleService) {}

   public createVehicle = async (req: Request, res: Response, next: NextFunction) => {
      const data = req.body;

      try {
         const newVehicle = await this.vehicleService.createVehicle(data);

         return res.status(201).json(newVehicle);
      } catch (error) {
         next(error);
      }
   }

   public getAllVehicles = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const vehicles = await this.vehicleService.getAllVehicles();

         return res.json(vehicles);
      } catch (error) {
           next(error);
      }
   }

   public updateVehicle = async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const data = req.body;

      try {
         const updatedVehicle = await this.vehicleService.updateVehicle(id, data);
         
         return res.json(updatedVehicle);
      } catch (error) {
           next(error);
      }
   }

   public deleteVehicle = async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      try {
         const deletedVehicle = await this.vehicleService.deleteVehicle(id);
        
         return res.json(deletedVehicle);
      } catch (error) {
           next(error);
      }
   }

   public getVehicleById = async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      try {
         const vehicle = await this.vehicleService.getVehicleById(id);
        
         return res.json(vehicle);
      }  catch (error) {
           next(error);
      }
   }
}

export default new VehicleController(VehicleService);

