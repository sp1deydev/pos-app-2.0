interface Item {
    price: number;
    quantity: number;
}
  
export const handleTotalPrice = (data: Item[]): number => {
  return data.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
};