import express, { Router, Request, Response } from 'express';
import { Order } from './order.interface';
import { OrderControllers } from './order.controller';
import { OrderServices } from './order.service';



  const router: Router = express.Router();

// Create new order
router.post('/', OrderControllers.boiOrder);

// Get all orders
router.get('/', OrderControllers.getAllOrder);

// Get total revenue
router.get('/revenue', OrderControllers.getTotalOrderRevenue);

// Get single order
router.get('/:orderId', OrderControllers.getSingleOrder);

// Update order
router.patch('/:orderId', OrderControllers.updateOrder);

// Delete order
router.delete('/:orderId', OrderControllers.deleteOrder);

export const OrderRoutes = router;
