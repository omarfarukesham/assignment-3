import { CustomError } from '../../helpers/handleCustomError'
import { IUser } from '../user/user.interface'
import User from '../user/user.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const register = async (payload: IUser) => {
  const result = await User.create(payload)
  if(!result) {
    throw new CustomError('Failed to create user', 500);
  }

  return result
}

const login = async (payload: { email: string; password: string }) => {
  const user = await User.findOne({ email: payload?.email }).select('+password');

  if (!user) {
    throw new CustomError('This user is not found!', 404, { field: 'email' });
  }

  if (user.isBlocked) {
    throw new CustomError('This user is blocked!', 403);
  }

  const isPasswordMatched = await bcrypt.compare(payload?.password, user?.password);

  if (!isPasswordMatched) {
    throw new CustomError('Invalid credentials', 401, { field: 'password' });
  }

  const jwtPayload = { email: user.email, role: user.role };
  const token = jwt.sign(jwtPayload, "primarytestkey", { expiresIn: '10d' });

  return { token, user };
};



// const login = async (payload: { email: string; password: string }) => {
 
//   const user = await User.findOne({ email: payload?.email }).select('+password');

//   if (!user) {
//     throw new Error('This user is not found !')
//   }

//   // checking if the user is inactive
//   const userStatus = user?.isBlocked

//   if (userStatus === true) {
//     throw new Error('This user is blocked ! !')
//   }

//   //checking if the password is correct
//   const isPasswordMatched = await bcrypt.compare(
//     payload?.password,
//     user?.password
//   )

//   if (!isPasswordMatched) {
//     throw new Error('Wrong Password!!! Tell me who are you?')
//   }

//   //create token and sent to the  client
//   const jwtPayload = {
//     email: user?.email,
//     role: user?.role,
//   }

//   const token = jwt.sign(jwtPayload, "primarytestkey", { expiresIn: '10d' });

//   return {token, user};
// }

export const AuthService = {
  register,
  login,
}
