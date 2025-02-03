import Stripe from 'stripe';
import express, { Router } from 'express';
import { OrderControllers } from './order.controller';
import { Order } from './order.interface';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-01-27.acacia",
  });

const router: Router = express.Router();

// Create new order
router.post('/', OrderControllers.createOrder);

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
