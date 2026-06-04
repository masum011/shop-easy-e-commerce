import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import type { CartItem } from '../types';


function CartRow({ item }: { item: CartItem }) {
  const { removeItem, updateQuantity } = useCart();

  return (
    <div
      className="flex gap-4 items-center p-4 bg-white rounded-xl shadow-sm mb-3 flex-wrap"
    >
      <img
        src={item.product.images[0]}
        alt={item.product.title}
        style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }}
      />
      <div style={{ flex: 1, minWidth: '140px' }}>
        <p style={{ fontSize: '15px', fontWeight: 600, color: '#1a1a1a', marginBottom: '4px' }}>
          {item.product.title}
        </p>
        <p style={{ fontSize: '14px', color: '#0f766e', fontWeight: 700 }}>
          ${item.product.price.toFixed(2)} each
        </p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
          style={{
            width: '32px', height: '32px', borderRadius: '8px', border: '1.5px solid #ddd',
            background: '#f9f9f9', cursor: 'pointer', fontSize: '18px', fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          -
        </button>
        <span style={{ fontSize: '15px', fontWeight: 600, minWidth: '24px', textAlign: 'center' }}>
          {item.quantity}
        </span>
        <button
          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
          style={{
            width: '32px', height: '32px', borderRadius: '8px', border: '1.5px solid #ddd',
            background: '#f9f9f9', cursor: 'pointer', fontSize: '18px', fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          +
        </button>
      </div>
      <p style={{ fontSize: '16px', fontWeight: 700, color: '#1a1a1a', minWidth: '70px', textAlign: 'right' }}>
        ${(item.product.price * item.quantity).toFixed(2)}
      </p>
      <button
        onClick={() => removeItem(item.product.id)}
        style={{
          background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer',
          fontSize: '13px', fontWeight: 600, padding: '4px 8px',
        }}
      >
        Remove
      </button>
    </div>
  );
}

export default function CartPage() {
  const { items, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <main style={{ maxWidth: '720px', margin: '0 auto', padding: '40px 16px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#1a1a1a', marginBottom: '12px' }}>Your Cart</h1>
        <p style={{ color: '#888', fontSize: '16px', marginBottom: '28px' }}>Your cart is empty.</p>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '12px 28px', background: '#0f766e', color: '#fff',
            border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 600, cursor: 'pointer',
          }}
        >
          Browse Products
        </button>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: '720px', margin: '0 auto', padding: '24px 16px' }}>
      <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#1a1a1a', marginBottom: '24px' }}>
        Your Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
      </h1>

      <div>
        {items.map((item) => (
          <CartRow key={item.product.id} item={item} />
        ))}
      </div>

      <div
        style={{
          background: '#fff',
          borderRadius: '12px',
          padding: '20px',
          marginTop: '20px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: '14px', color: '#888' }}>{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>
            <p style={{ fontSize: '22px', fontWeight: 800, color: '#1a1a1a' }}>
              Total: ${totalPrice.toFixed(2)}
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '12px 24px', background: '#0f766e', color: '#fff',
              border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 600, cursor: 'pointer',
            }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </main>
  );
}
