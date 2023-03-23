import { Order } from './order';
import { User } from './user';

export interface Response {
  success: boolean;
  message?: string;
  order?: Order;
  address?: string;
  user?: User;
}
