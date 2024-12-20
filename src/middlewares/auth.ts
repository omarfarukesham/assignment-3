import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import catchAsync from '../utils/catchAsync';
import User from '../module/user/user.model';
import { TUserRole } from '../module/user/user.interface';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // checking if the token is missing
      // console.log("auth ... ",token)

    if (!token) {
      throw new Error( 'You are not authorized!');
    }

    const getToken = token.split(" ")[1]
    // checking if the given token is valid
    const decoded = jwt.verify(
   
      getToken,
      "primarytestkey",
    ) as JwtPayload;
    console.log("decode user .... blog create",decoded)
    

    const { role, email, id } = decoded;
    // console.log(role, email)

    // checking if the user is exist
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('This user is not found !')
  }

  // checking if the user is inactive
  const userStatus = user?.isBlocked

  if (userStatus === true) {
    throw new Error('This user is blocked ! !')
  }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new Error(
        'You are not authorized',
      );
    }

    req.user = decoded as JwtPayload;
    console.log(req.user)
    next();
  });
};

export default auth;