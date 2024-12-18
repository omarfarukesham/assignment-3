import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";


const userSchema = new Schema<IUser>({ 
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: 3,
        maxlength: 50
    },
    email:{
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: function (value: string) {
              return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value)
            },
            message: '{VALUE} is not a valid email',
          },
          immutable: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 8,
        select: false
    },
    role:{
        type: String,
        enum: {
            values: ['admin', 'user'],
            message: '{VALUE} is not valid, please provide a valid role', 
        },
        default: 'user',
        required: true,
    },
    isBlocked: {
        type: Boolean,
        default: false,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        required: true,
    }

});

const User = model<IUser>('User', userSchema)
export default User;