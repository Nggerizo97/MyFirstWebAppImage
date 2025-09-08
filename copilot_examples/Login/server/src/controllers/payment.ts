import { Request, Response } from 'express';
import { PaymentService } from '../services/paymentService';
import { Order } from '../models/order';
import { User } from '../models/user';

export const processPayment = async (req: Request, res: Response) => {
  try {
    const { orderId, paymentMethod = 'test' } = req.body;
    const { username } = (req as any).user;

    // Find user
    const user: any = await User.findOne({ where: { username: username } });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Find order
    const order: any = await Order.findOne({ 
      where: { 
        id: orderId,
        userId: user.id,
        status: 'pending'
      }
    });

    if (!order) {
      return res.status(404).json({ msg: 'Order not found or already processed' });
    }

    // Process payment
    const paymentResult = await PaymentService.processPayment(
      order.amount, 
      paymentMethod
    );

    if (paymentResult.success) {
      // Update order status
      order.status = 'paid';
      order.paymentId = paymentResult.paymentId;
      await order.save();

      res.json({
        msg: 'Payment processed successfully',
        paymentId: paymentResult.paymentId,
        order: order
      });
    } else {
      // Update order status to failed
      order.status = 'failed';
      await order.save();

      res.status(400).json({
        msg: 'Payment failed',
        error: paymentResult.error
      });
    }

  } catch (error) {
    console.error('Payment processing error:', error);
    res.status(500).json({
      msg: 'Error processing payment',
      error
    });
  }
};

export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { amount, currency = 'usd' } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ msg: 'Invalid amount' });
    }

    // For demo purposes, create a mock payment intent
    const paymentIntent = {
      id: `pi_test_${Date.now()}`,
      amount: amount * 100, // Convert to cents
      currency: currency,
      status: 'requires_payment_method'
    };

    res.json({
      paymentIntent: paymentIntent,
      clientSecret: `${paymentIntent.id}_secret_test`
    });

  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({
      msg: 'Error creating payment intent',
      error
    });
  }
};