import { useState } from 'react';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';

type AddToCartButtonProps = {
  product: Product;
};

const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const { addItem, items } = useCart();
  const [added, setAdded] = useState(false);

  const inCart = items.some((item) => item.product.id === product.id);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  return (
    <button
      onClick={handleAdd}
      className={`w-full py-3.5 px-6 text-white rounded-[10px] text-base font-semibold cursor-pointer transition-all duration-200 ${
        added
          ? 'bg-emerald-600 scale-[0.98]'
          : inCart
          ? 'bg-gray-700'
          : 'bg-teal-700'
      }`}
    >
      {added ? 'Added to Cart!' : inCart ? 'Add Again' : 'Add to Cart'}
    </button>
  );
};

export default AddToCartButton;