import { Order } from './order';

export interface Response {
  success: boolean;
  message?: string;
  order?: Order;
  address?: string;
}
