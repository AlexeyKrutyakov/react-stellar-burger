export default function findOrderByNumber(number, orderList) {
  return orderList.find(order => `${order.number}` === number);
}
