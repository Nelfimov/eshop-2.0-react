import { Address } from './address';
import { Order } from './order';
import { User } from './user';

export interface Response {
  success: boolean;
  message?: string;
  order?: Order;
  address?: Address;
  user?: User;
}
