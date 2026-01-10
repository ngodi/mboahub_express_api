import { Model, Optional } from 'sequelize';
import { UserStatusType } from '../types/user.types';

export interface UserInterface {
  id?: string;
  name: string;
  email: string;
  password?: string;
  city: string;
  country: string;
  emailVerified?: boolean;
  phoneNumber: string;
  status: UserStatusType;
  created_at?: Date;
  updated_at?: Date;
}

export interface UserCreationAttributes extends Optional<
  UserInterface,
  'id' | 'created_at' | 'updated_at'
> {}

export interface UserModel
  extends Model<UserInterface, UserCreationAttributes>, UserInterface {}

export interface CurrentUserInterface {
  id: string;
  email: string;
  name: string;
}
