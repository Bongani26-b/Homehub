import React, { useState } from 'react';
import { ShoppingCart, Plus, Trash2, X } from 'lucide-react';
import { sound } from '../utils/sound';

export default function GroceriesView({ groceries, setGroceries, pantry, setPantry, addToast }) {
  const [subTab, setSubTab] = useState('groceries'); // 'groceries' | 'pantry' | 'recipes'
  const [newItemModal, setNewItemModal] = useState(false);

  const totalCartEstimate = groceries
    .filter((g) => !g.inCart)
    .reduce((acc, curr) => acc + (curr.price || 0), 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header & Sub-Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <ShoppingCart className="text-sky-400 w-7 h-7" />
            Grocery Cart & Smart Pantry
          </h2>
          <p className="text-sm text-slate-400">
            Shared shopping cart, food expiration alerts, and recipe ingredients generator
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-1 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex">
            <button
              onClick={() => setSubTab('groceries')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                subTab === 'groceries' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Shopping List ({groceries.filter((g) => !g.inCart).length})
            </button>
            <button
              onClick={() => setSubTab('pantry')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                subTab === 'pantry' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Pantry Inventory ({pantry.length})
            </button>
            <button
              onClick={() => setSubTab('recipes')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                subTab === 'recipes' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Recipe Ideas
            </button>
          </div>

          <button
            onClick={() => setNewItemModal(true)}
            className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-glow-sm transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Add Item
          </button>
        </div>
      </div>

      {/* 1. GROCERY LIST VIEW */}
      {subTab === 'groceries' && (
        <div className="space-y-4">
          {/* Cost Estimate Bar */}
          <div className="p-4 rounded-2xl glass-panel flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                🛒
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Estimated Trip Total</div>
                <div className="text-xs text-slate-400">Based on standard retail item averages</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-2xl font-extrabold text-sky-300 font-mono">
                  ${totalCartEstimate.toFixed(2)}
                </span>
              </div>
              <button
                onClick={() => {
                  setGroceries((prev) => prev.map((g) => ({ ...g, inCart: true })));
                  addToast('All items marked as purchased! 🎉', 'success');
                }}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Check All Off
              </button>
            </div>
          </div>

          {/* List of Groceries */}
          <div className="glass-panel rounded-3xl p-6 shadow-glass space-y-3">
            {groceries.map((item) => (
              <div
                key={item.id}
                className={`p-3.5 rounded-2xl border transition flex items-center justify-between ${
                  item.inCart
                    ? 'bg-slate-900/40 border-slate-800/80 opacity-60'
                    : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setGroceries((prev) =>
                        prev.map((g) => (g.id === item.id ? { ...g, inCart: !g.inCart } : g))
                      );
                      sound.play('toggle');
                    }}
                    className={`w-6 h-6 rounded-lg border flex items-center justify-center transition text-xs ${
                      item.inCart
                        ? 'bg-sky-500 border-sky-400 text-slate-950 font-bold'
                        : 'border-slate-600 hover:border-sky-400 text-transparent'
                    }`}
                  >
                    ✓
                  </button>
                  <div>
                    <div
                      className={`text-sm font-semibold ${
                        item.inCart ? 'line-through text-slate-400' : 'text-white'
                      }`}
                    >
                      {item.name}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                      <span className="text-sky-300 font-medium">{item.qty}</span>
                      <span>•</span>
                      <span>{item.category}</span>
                      <span>•</span>
                      <span className="font-mono">${(item.price || 0).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setGroceries((prev) => prev.filter((g) => g.id !== item.id));
                      addToast('Item removed from cart', 'info');
                    }}
                    className="p-1.5 text-slate-500 hover:text-rose-400 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. PANTRY INVENTORY VIEW */}
      {subTab === 'pantry' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pantry.map((item) => {
            const isExpiring = item.status === 'expiring';
            return (
              <div key={item.id} className="glass-panel rounded-3xl p-5 shadow-glass flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        isExpiring
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {isExpiring ? '⚠️ Use Soon' : '✅ Fresh'}
                    </span>
                    <span className="text-xs font-mono text-slate-400">Qty: {item.qty}</span>
                  </div>

                  <h4 className="font-bold text-white text-base mt-3">{item.name}</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Expires: <span className="font-mono text-slate-300">{item.expires}</span>
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setGroceries((prev) => [
                        {
                          id: 'g' + Date.now(),
                          name: item.name,
                          category: 'Pantry Restock',
                          qty: '1 unit',
                          inCart: false,
                          price: 4.99
                        },
                        ...prev
                      ]);
                      addToast(`Added "${item.name}" to Grocery List 🛒`, 'success');
                    }}
                    className="text-xs text-sky-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    + Add to Grocery List
                  </button>
                  <button
                    onClick={() => {
                      setPantry((prev) => prev.filter((p) => p.id !== item.id));
                      addToast('Item removed from pantry', 'info');
                    }}
                    className="p-1 text-slate-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 3. RECIPES & MEAL PLANNER */}
      {subTab === 'recipes' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Creamy Garlic Butter Pasta',
              time: '25 mins',
              servings: '4 people',
              ingredients: ['Sourdough Bread', 'Olive Oil', 'Garlic', 'Parmesan', 'Pasta'],
              emoji: '🍝'
            },
            {
              title: 'Avocado & Spinach Power Bowl',
              time: '15 mins',
              servings: '2 people',
              ingredients: ['Avocados', 'Baby Spinach', 'Greek Yogurt', 'Rolled Oats'],
              emoji: '🥑'
            },
            {
              title: 'Cold Brew Protein Smoothie',
              time: '5 mins',
              servings: '2 people',
              ingredients: ['Almond Milk', 'Cold Brew Coffee', 'Almond Butter', 'Banana'],
              emoji: '🥤'
            }
          ].map((recipe, idx) => (
            <div key={idx} className="glass-panel rounded-3xl p-6 shadow-glass flex flex-col justify-between">
              <div>
                <div className="text-4xl mb-3">{recipe.emoji}</div>
                <h4 className="font-bold text-white text-lg">{recipe.title}</h4>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                  <span>⏱ {recipe.time}</span>
                  <span>•</span>
                  <span>👥 {recipe.servings}</span>
                </div>

                <div className="mt-4">
                  <span className="text-xs font-semibold text-slate-300">Required Ingredients:</span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {recipe.ingredients.map((ing, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-300"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  recipe.ingredients.forEach((ing) => {
                    setGroceries((prev) => [
                      {
                        id: 'g' + Math.random(),
                        name: ing,
                        category: 'Recipe Ingredient',
                        qty: '1 unit',
                        inCart: false,
                        price: 3.5
                      },
                      ...prev
                    ]);
                  });
                  addToast(`All ${recipe.ingredients.length} ingredients added to Grocery Cart! 🛒`, 'success');
                }}
                className="mt-6 w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition shadow-glow-sm"
              >
                Add All Ingredients to Cart
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add Item Modal */}
      {newItemModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-700 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-white">Add Grocery or Pantry Item</h3>
              <button onClick={() => setNewItemModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                const name = form.itemName.value.trim();
                if (!name) return;
                const target = form.targetType.value;

                if (target === 'grocery') {
                  setGroceries((prev) => [
                    {
                      id: 'g' + Date.now(),
                      name,
                      category: form.category.value,
                      qty: form.qty.value || '1 unit',
                      price: parseFloat(form.price.value) || 4.5,
                      inCart: false
                    },
                    ...prev
                  ]);
                  addToast(`"${name}" added to Shopping Cart 🛒`, 'success');
                } else {
                  setPantry((prev) => [
                    {
                      id: 'p' + Date.now(),
                      name,
                      qty: form.qty.value || '1 unit',
                      expires: form.expires.value || '2026-12-01',
                      status: 'fresh'
                    },
                    ...prev
                  ]);
                  addToast(`"${name}" stored in Pantry 🥫`, 'success');
                }
                setNewItemModal(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Item Name</label>
                <input
                  name="itemName"
                  required
                  placeholder="e.g. Organic Strawberries"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Destination</label>
                  <select
                    name="targetType"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-brand-500"
                  >
                    <option value="grocery">Shopping List</option>
                    <option value="pantry">Pantry Inventory</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Quantity / Pack</label>
                  <input
                    name="qty"
                    placeholder="e.g. 2 Cartons"
                    defaultValue="1 unit"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    name="category"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-brand-500"
                  >
                    <option value="Produce">Produce</option>
                    <option value="Dairy & Alt">Dairy & Alt</option>
                    <option value="Bakery">Bakery</option>
                    <option value="Beverages">Beverages</option>
                    <option value="Household">Household</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Est. Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    defaultValue="4.99"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-brand-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Expiration Date (Pantry)
                </label>
                <input
                  type="date"
                  name="expires"
                  defaultValue="2026-11-01"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setNewItemModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold shadow-glow-sm"
                >
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
