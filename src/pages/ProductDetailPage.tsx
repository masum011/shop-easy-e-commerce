import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Product } from '../types';
import AddToCartButton from '../components/AddToCartButton';

const API_BASE = 'https://api.escuelajs.co/api/v1';


export default function ProductDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    useEffect(() => {
        if (!id) return;
        setLoading(true);
        setError('');
        fetch(`${API_BASE}/products/${id}`)
            .then((r) => {
                if (!r.ok) throw new Error('Product not found');
                return r.json();
            })
            .then((data) => setProduct(data))
            .catch(() => setError('Product not found.'))
            .finally(() => setLoading(false));
    }, [id]);



    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div
                    className="w-12 h-12 border-4 border-slate-200 border-t-teal-700 rounded-full animate-[spin_0.8s_linear_infinite]"
                />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="text-center py-20 px-4">
                <p className="text-lg text-red-500 mb-5">{error || 'Product not found.'}</p>
                <button
                    onClick={() => navigate('/')}
                    className="py-2.5 px-6 bg-teal-700 text-white rounded-lg cursor-pointer text-[15px]"
                >
                    Back to Home
                </button>
            </div>
        );
    }


    return (
        <main className='max-w-[960px] mx-auto py-6 px-4'>
            <button
                onClick={() => navigate(-1)}
                className='inline-flex items-center gap-1.5 bg-transparent border-0 text-teal-700 text-sm font-semibold cursor-pointer mb-6 p-0'
            >
                &#8592; Back to Products
            </button>

            <div
                className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-10 bg-white rounded-2xl overflow-hidden shadow-lg"
            >
                <div className="bg-[#f8f8f8] min-h-[360px] relative">
                    <img
                        src={product.images}
                        alt={product.title}
                        className="w-full h-full min-h-[360px] object-cover block"
                    />
                </div>

                {/* Info */}
                <div className='p-[32px]'>
                    <p
                        className="text-xs text-teal-700 font-semibold uppercase tracking-[0.8px] mb-2"
                    >
                        {product.category?.name}
                    </p>
                    <h1 className="text-[26px] font-bold text-[#1a1a1a] mb-4 leading-[1.3]">
                        {product.title}
                    </h1>
                    <p className="text-3xl font-extrabold text-teal-700 mb-5">
                        ${product.price.toFixed(2)}
                    </p>
                    <p className="text-[15px] text-gray-600 leading-[1.7] mb-8">
                        {product.description}
                    </p>
                    <AddToCartButton product={product} />
                </div>
            </div>
        </main>
    );
}
