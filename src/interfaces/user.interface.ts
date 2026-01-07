import { UserStatusType } from '../types/user.types';

export interface UserInterface {
  id: string;
  name: string;
  email: string;
  password?: string;
  city: string;
  country: string;
  phoneNumber: string;
  status: UserStatusType;
  createdAt?: Date;
  updatedAt?: Date;
}
