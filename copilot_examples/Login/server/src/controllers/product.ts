import { Request, Response } from 'express';
import { Product } from '../models/products';

export const getProduct = async (req: Request, res: Response) => {
  const listproducts = await  Product.findAll(); 
  
  res.json(listproducts);
}

export const getPublicProducts = async (req: Request, res: Response) => {
  try {
    const listproducts = await Product.findAll({
      where: { available: true },
      order: [['createdAt', 'DESC']]
    }); 
    
    res.json(listproducts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error fetching products',
      error
    });
  }
}

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error fetching product',
      error
    });
  }
}