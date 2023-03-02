import { User } from './user';

export interface Address {
  _id: Types.ObjectId;
  street: string;
  city: string;
  zip: number;
  country: string;
  fullName: string;
  user?: User | string;
  type: 'billing' | 'shipping';
  email: string;
}
