import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ShoppingBag } from 'lucide-react';


export default function Header() {
  const { totalItems } = useCart();

  return (
    <header
      className='bg-white border-b border-[#e8e8e8] sticky top-0 z-[100] shadow-[0_1px_6px_rgba(0,0,0,0.06)]'
    >
      <div
        className='max-w-[1200px] mx-auto px-4 h-16 flex items-center justify-between'
      >
        <Link
          to="/"
          className='text-[22px] font-extrabold text-[#0f766e] no-underline tracking-[-0.5px]'
        ><span className='flex items-center gap-1'><ShoppingBag />ShopEasy
          </span>

        </Link>

        <nav className='flex gap-6 items-center'>
          <Link
            to="/"
            className='text-[14px] font-medium text-[#555] no-underline'
          >
            Products
          </Link>
          <Link
            to="/cart"
            className="flex items-center gap-2 text-sm font-semibold text-teal-700 no-underline bg-green-50 py-2 px-[14px] rounded-lg transition-colors duration-150"
          >
            <ShoppingCart size={18} />
            Cart
            {totalItems > 0 && (
              <span
                className="bg-teal-700 text-white rounded-xl px-[7px] py-[1px] text-xs font-bold"
              >
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
