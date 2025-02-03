/* eslint-disable no-console */
import { Request, Response, NextFunction} from 'express';
import { OrderServices } from './order.service';
import Stripe from 'stripe';
import { OrderModel } from './order.model';
import { Order } from './order.interface';
// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-01-27.acacia",
});


export const OrderControllers = {
  createOrder: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, product, quantity, totalPrice, paymentMethodId } = req.body;
        console.log(req.body)
      if (!email || !product || !quantity || !totalPrice || !paymentMethodId) {
        return res.status(400).json({ 
          success: false, 
          message: "Missing required fields" 
        });
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(totalPrice * 100),
        currency: "usd",
        payment_method: paymentMethodId,
        confirmation_method: "manual",
        confirm: true,
      });

      const orderPayload: Order = {
        id: paymentIntent.id,
        email,
        product,
        quantity,
        totalPrice,
        paymentStatus: "pending",
        paymentIntentId: paymentIntent.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const newOrder = await OrderServices.createOrderIntoDB(orderPayload);

      return res.status(200).json({
        success: true,
        message: "Order created successfully",
        clientSecret: paymentIntent.client_secret,
        order: newOrder,
      });
    } catch (error) {
      next(error);
    }
  },

  getAllOrder: async (req: Request, res: Response) => {
    try {
      const result = await OrderServices.getAlOrdersFromDB();
  
      res.status(200).json({
        success: true,
        message: 'Order retrieved successfully',
        data: result,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve Order',
      });
    }
  },

  getSingleOrder: async (req: Request, res: Response) => {
    try {
      const { orderId } = req.params;
      const result = await OrderServices.getSingleOrderFromDB(orderId);
      res.status(200).json({
        success: true,
        message: 'Order retrieved successfully',
        data: result,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve order',
      });
    }
  },
  updateOrder: async (req: Request, res: Response): Promise<void> => {
    try {
      const  orderId  = req.params.orderId;
      const data = req.body;
  
  
      const result = await OrderServices.updateOrderFromDB(orderId, data);
  
      if (!result) {
         res.status(404).json({
          success: false,
          message: 'Order not found',
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Order updated successfully',
        data: result,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: 'Failed to update Order',
      });
    }
  },
  deleteOrder: async (req: Request, res: Response): Promise<void>  => {
    try {
      const { orderId } = req.params;
  
      const result = await OrderServices.deleteOrderFromDB(orderId);
  
      if (!result) {
          res.status(404).json({
          success: false,
          message: 'Order not found',
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Order deleted successfully',
        data: result,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: 'Failed to delete Order',
      });
    }
  },
  getTotalOrderRevenue: async (req: Request, res: Response) => {
    try {
      const result = await OrderServices.getTotalPriceFromDB();
      res.status(200).json({
        success: true,
        message: 'Revenue calculated successfully',
        data: { totalRevenue: result },
      });
    } catch (err) {
      console.error('Error calculating total revenue:', err);
      res.status(500).json({
        success: false,
        message: 'Failed to calculate revenue. Please try again later.',
      });
    }
  }

};






// export const OrderControllers = {
//     // createOrder1,
//     // createOrder,
//     getAllOrder,
//     getSingleOrder,
//     updateOrder,
//     deleteOrder,
//     getTotalOrderRevenue
// };
