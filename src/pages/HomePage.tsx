import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Product, Category } from '../types';
import ProductCard from '../components/ProductCard';

const API_BASE = 'https://api.escuelajs.co/api/v1';

function useQueryParams() {
  const location = useLocation();
  return new URLSearchParams(location.search);
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [catLoading, setCatLoading] = useState(false);

  const queryParams = useQueryParams();
  const navigate = useNavigate();
  const location = useLocation();

  const selectedCategories = queryParams.getAll('category').map(Number);
  const sortOrder = queryParams.get('sort') || '';

  const updateParams = useCallback(
    (cats: number[], sort: string) => {
      const params = new URLSearchParams();
      cats.forEach((c) => params.append('category', String(c)));
      if (sort) params.set('sort', sort);
      navigate({ pathname: '/', search: params.toString() }, { replace: false });
    },
    [navigate]
  );

const toggleCategory = (id: number) => {
  const exists = selectedCategories.includes(id);

  if (exists) {
    updateParams(
      selectedCategories.filter((c) => c !== id),
      sortOrder
    );
  } else {
    updateParams(
      [...selectedCategories, id],
      sortOrder
    );
  }
};

  const setSort = (sort: string) => {
    updateParams(selectedCategories, sort);
  };

  useEffect(() => {
    setCatLoading(true);
    fetch(`${API_BASE}/categories`)
      .then((r) => r.json())
      .then((data) => {
        setCategories(Array.isArray(data) ? data : []);
      })
      .catch(() => setCategories([]))
      .finally(() => setCatLoading(false));
  }, []);

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      setLoading(true);

      let data: Product[] = [];

      if (selectedCategories.length === 0) {
        const res = await fetch(`${API_BASE}/products?limit=60`);
        data = await res.json();
      } else {
        const products = await Promise.all(
          selectedCategories.map(async (catId) => {
            const res = await fetch(
              `${API_BASE}/categories/${catId}/products`
            );
            return res.json();
          })
        );

        data = products.flat();
      }

      const sorted = [...data];

      switch (sortOrder) {
        case 'asc':
          sorted.sort((a, b) => a.price - b.price);
          break;
        case 'desc':
          sorted.sort((a, b) => b.price - a.price);
          break;
        case 'az':
          sorted.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'za':
          sorted.sort((a, b) => b.title.localeCompare(a.title));
          break;
      }

      setProducts(sorted);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, [location.search]);

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#1a1a1a', marginBottom: '24px' }}>
        All Products
      </h1>

      {/* Filters & Sort */}
      <div
       className="bg-white rounded-xl p-5 mb-7 shadow-sm"
      >
        <div
         className="flex flex-wrap gap-4 items-start"
        >
          <div className="flex-1 min-w-[200px]">
            <p className="text-[13px] font-semibold text-gray-600 mb-2.5 uppercase tracking-[0.5px]">
              Filter by Category
            </p>
            {catLoading ? (
              <p style={{ fontSize: '14px', color: '#999' }}>Loading categories...</p>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {categories.map((cat) => {
                  const active = selectedCategories.includes(cat.id);
                  return (
                    <button
                      key={cat.id}
                      onClick={() => toggleCategory(cat.id)}
                      className={`px-3.5 py-1.5 rounded-full border-[1.5px] text-[13px] font-medium cursor-pointer transition-all duration-150 ${active
                          ? 'border-teal-700 bg-teal-700 text-white'
                          : 'border-gray-300 bg-white text-gray-600'
                        }`}
                    >
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div style={{ minWidth: '180px' }}>
            <p className="text-[13px] font-semibold text-gray-600 mb-2.5 uppercase tracking-[0.5px]">
              Sort By
            </p>
            <select
              value={sortOrder}
              onChange={(e) => setSort(e.target.value)}
             className="w-full px-3 py-2 rounded-lg border-[1.5px] border-gray-300 text-sm text-gray-800 bg-white cursor-pointer outline-none"
            >
              <option value="">Default</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
              <option value="az">Name: A - Z</option>
              <option value="za">Name: Z - A</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
          <div
           className="w-10 h-10 border-4 border-slate-200 border-t-teal-700 rounded-full animate-spin"
          />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-15 text-gray-400">
          <p className='text-[16px]'>No products found.</p>
        </div>
      ) : (
        <div
          className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5"
        >
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </main>
  );
}
