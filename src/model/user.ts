import { Schema, model } from 'mongoose';

interface IUser {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}

const userSchema = new Schema<IUser>({
  name: String,
  email: String,
  password: String,
  phoneNumber: { type: String, default: '1234567890' },
});

const User = model('User', userSchema);

export default User;
