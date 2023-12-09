import { Order } from 'types';

export default function findOrderByNumber(number: string, orderList: Order[]) {
  return orderList.find(order => `${order.number}` === number);
}
