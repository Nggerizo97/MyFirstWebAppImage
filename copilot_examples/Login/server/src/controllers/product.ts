import { Request, Response } from 'express';
import { Product } from '../models/products';

export const getProduct = async (req: Request, res: Response) => {
  const listproducts = await  Product.findAll(); 
  
  res.json(listproducts);
}