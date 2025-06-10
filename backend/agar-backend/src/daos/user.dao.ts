import User, { IUser } from '../models/user.model';

class UserDAO {
  async create(userData: Partial<IUser>): Promise<IUser> {
    const user = new User(userData);
    return user.save();
  }


 async updateNonce(user_address: string, nonce: string): Promise<IUser | null> {
    let user = await User.findOne({ user_address });

    if (!user) {
      user = new User({ user_address, nonce });
    } else {
      user.nonce = nonce;
    }

    await user.save();
    return user;
  }

  // Find a user by wallet address
  async findByWalletAddress(user_address: string): Promise<IUser | null> {
    return User.findOne({ user_address });
  }

  
}

export default new UserDAO();
