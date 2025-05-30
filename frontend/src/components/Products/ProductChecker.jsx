import { useState, useEffect } from 'react';
import axios from '../../services/api';
import { toast } from 'react-toastify';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, ingredientsRes] = await Promise.all([
          axios.get('/api/products'),
          axios.get('/api/ingredients'),
        ]);
        setProducts(productsRes.data);
        setIngredients(ingredientsRes.data);
      } catch (err) {
        toast.error('Failed to load products and ingredients');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-rose-50 via-blush to-cream">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-serif font-bold text-rose-800 text-center mb-8 animate-fade-in">
          Skincare Products & Ingredients
        </h2>
        <div className="card mb-8 animate-slide-up">
          <h3 className="text-xl font-serif text-rose-700 mb-4">Products</h3>
          {loading ? (
            <p className="text-sm font-sans text-rose-600">Loading...</p>
          ) : products.length === 0 ? (
            <p className="text-sm font-sans text-rose-600">No products available.</p>
          ) : (
            <ul className="space-y-4">
              {products.map((product) => (
                <li
                  key={product._id}
                  className="p-4 bg-rose-50 rounded-lg border border-rose-200"
                >
                  <p className="text-sm font-sans text-rose-800">
                    {product.brand} - {product.name}
                  </p>
                  {product.ingredients?.length > 0 && (
                    <p className="text-xs font-sans text-rose-600">
                      Ingredients: {product.ingredients.map((ing) => ing.name).join(', ')}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="card animate-slide-up">
          <h3 className="text-xl font-serif text-rose-700 mb-4">Ingredients</h3>
          {loading ? (
            <p className="text-sm font-sans text-rose-600">Loading...</p>
          ) : ingredients.length === 0 ? (
            <p className="text-sm font-sans text-rose-600">No ingredients available.</p>
          ) : (
            <ul className="space-y-4">
              {ingredients.map((ingredient) => (
                <li
                  key={ingredient._id}
                  className="p-4 bg-rose-50 rounded-lg border border-rose-200"
                >
                  <p className="text-sm font-sans text-rose-800">
                    {ingredient.name} ({ingredient.safety})
                  </p>
                  {ingredient.description && (
                    <p className="text-xs font-sans text-rose-600">
                      {ingredient.description}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}