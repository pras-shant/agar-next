import mongoose, { Document, Model, Schema } from 'mongoose';

// Interface for User Document
export interface IUser extends Document {
  user_address?: string; // Made optional with `?`
  username?: string;
  email?: string;
  created_at: Date;
  is_active: boolean;
  nonce?: string; // Made optional with `?`
}

// User Schema
const UserSchema = new Schema<IUser>(
  {
    user_address: { type: String, unique: true, sparse: true }, // Unique and sparse
    username: { type: String },
    email: { type: String, unique: true, sparse: true }, // Unique and sparse
    created_at: { type: Date, default: Date.now },
    is_active: { type: Boolean, default: false },
    nonce: { type: String },
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt` automatically
  }
);

// Create or reuse the User model
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
