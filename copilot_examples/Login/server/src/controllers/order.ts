import { Request, Response } from 'express';
import { Order } from '../models/order';
import { Product } from '../models/products';
import { User } from '../models/user';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { productId, amount, paymentMethod } = req.body;
    const { username } = (req as any).user;

    // Find user by username
    const user: any = await User.findOne({ where: { username: username } });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Verify product exists and is available
    const product: any = await Product.findByPk(productId);
    if (!product || !product.available) {
      return res.status(404).json({ msg: 'Product not found or not available' });
    }

    // Create the order
    const order = await Order.create({
      userId: user.id,
      productId: productId,
      amount: amount,
      paymentMethod: paymentMethod || 'test',
      status: 'pending'
    });

    res.json({
      msg: 'Order created successfully',
      order: order
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error creating order',
      error
    });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const { username } = (req as any).user;

    // Find user by username
    const user: any = await User.findOne({ where: { username: username } });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Get orders for this user with product details
    const orders = await Order.findAll({
      where: { userId: user.id },
      include: [{
        model: Product,
        as: 'product'
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json(orders);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error fetching orders',
      error
    });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, paymentId } = req.body;
    const { username } = (req as any).user;

    // Find user by username
    const user: any = await User.findOne({ where: { username: username } });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Find and update order
    const order: any = await Order.findOne({ 
      where: { 
        id: id,
        userId: user.id 
      }
    });

    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    order.status = status;
    if (paymentId) {
      order.paymentId = paymentId;
    }
    await order.save();

    res.json({
      msg: 'Order status updated successfully',
      order: order
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error updating order status',
      error
    });
  }
};