import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';

export const newUser = async (req: Request, res: Response) => {
  
  const {username, password} = req.body;

  // Validate username is unique
  await User.findOne({ where: { username:username } }).then(user => {
    if (user) {
      return res.status(400).json({ msg: 'Username already exists' });
    }
  });

  const hashedPassword = await bcrypt.hash(password, 10) 

  //Create new user
  try{
    await User.create({
      username,
      password: hashedPassword
    });
    res.json({ 
        msg: `User ${username} created successfully`
    });
  }
  catch(error){
    console.log(error);
    res.status(500).json({
      msg: 'Error creating user',
      error
    });
  }

}

export const loginUser = async (req: Request, res: Response) => {
    //const user = new User({ name, email, password });
    //await user.save();
      const { username, password } = req.body;

      // validate username exists
      const user: any = await User.findOne({ where: { username: username } });
      if (!user) {
        return res.status(400).json({ msg: `Username ${username} do not exist in the data base` });
      }

      // validate password is correct
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ msg: 'Password incorrect' });
      }

      //Create JWT
      const token = jwt.sign({ username:username }, process.env.SECRET_KEY!,
        {
          expiresIn: 86400
        });
      res.json({
        msg: 'Login successful',
        token
      });

}