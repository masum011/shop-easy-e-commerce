import { Link } from 'react-router-dom';
import type { Product } from '../types';


interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {

    return (
        <Link
            to={`/product/${product.id}/details`}
            className='block bg-white rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-transform transition-shadow duration-200 ease-out no-underline text-inherit hover:-translate-y-1 hover:shadow-xl'

        >
            <div style={{ width: '100%', paddingTop: '75%', position: 'relative', background: '#f8f8f8' }}>
                <img
                    className='absolute top-0 left-0 w-full h-full object-cover'
                    src={product.images}
                    alt={product.title}
                />
            </div>

            <div className='p-[16px]'>
                <p className='text-[12px] text-[#888] mb-1 uppercase tracking-[0.5px]'>
                    {product.category?.name}
                </p>
                <h3
                    className='text-[15px] font-semibold text-[#1a1a1a] mb-2 overflow-hidden leading-[1.4]'
                >
                    {product.title}
                </h3>
                <p className='text-[18px] font-bold text-[#0f766e]'>${product.price.toFixed(2)}</p>
            </div>
        </Link>
    );
}
