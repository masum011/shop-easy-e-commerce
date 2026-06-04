import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';

const HomePage = lazy(() => import("./pages/HomePage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const CartPage = lazy(() => import("./pages/CartPage"));

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="flex min-h-screen flex-col bg-gray-100">
          <Header />
          <main className="flex-1">
            <Suspense
              fallback={
                <div className="flex h-40 items-center justify-center">
                  <p className="text-lg font-medium">Loading...</p>
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                  path="/product/:id/details"
                  element={<ProductDetailPage />}
                />
                <Route path="/cart" element={<CartPage />} />
              </Routes>
            </Suspense>
          </main>

          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
