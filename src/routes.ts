import { Router } from 'express';
import VehicleController from './controllers/vehicle.controller';

const router = Router();

router.post('/veiculo', VehicleController.createVehicle);
router.get('/veiculo', VehicleController.getAllVehicles);
router.put('/veiculo/:id', VehicleController.updateVehicle);
router.delete('/veiculo/:id', VehicleController.deleteVehicle);
router.get('/veiculo/:id', VehicleController.getVehicleById);

export default router;