"use client";
import React, { useEffect, useState } from "react";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  const handleInsert = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const newProduct = await res.json();
      setProducts([...products, newProduct]);
      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
      });
    }
  };

  const handleEditClick = (product) => {
    setEditId(product._id || product.id);
    setEditForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
    });
  };
  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };
  const handleEditSave = async (id) => {
    const res = await fetch(`http://localhost:3000/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...editForm,
        price: Number(editForm.price),
        stock: Number(editForm.stock),
      }),
    });
    if (res.ok) {
      const data = await res.json();
      setProducts(products.map((p) => (p._id === id ? data.product : p)));
      setEditId(null);
    }
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/api/products/${id}`, {
      method: "DELETE",
    });
    setProducts(products.filter((p) => p._id !== id));
  };

  return (
    <div className="mb-22">
      <h2 className="my-4 font-bold text-gray-800 text-center text-2xl">
        Product Management
      </h2>
      <form
        className="flex gap-2 p-4 font-semibold text-xl"
        onSubmit={handleInsert}
        style={{ marginBottom: "2rem" }}
      >
        {/* ...dein Insert-Formular wie gehabt... */}
        <input
          className="border rounded px-2 py-1 mb-2"
          type="text"
          name="name"
          placeholder="Product name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="border rounded px-2 py-1 mb-2"
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <input
          className="border rounded px-2 py-1 mb-2"
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <input
          className="border rounded px-2 py-1 mb-2"
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        />
        <input
          className="border rounded px-2 py-1 mb-2"
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
          required
        />
        <button
          className="border px-2 py-1 mb-2 bg-gray-800 text-gray-200 rounded-xl hover:cursor-pointer"
          type="submit"
        >
          Insert
        </button>
      </form>
      <ul>
        {products.map((product, idx) => (
          <li key={product._id || product.id || idx}>
            {editId === (product._id || product.id) ? (
              <form
                className="flex gap-2 p-4 font-semibold text-xl"
                onSubmit={handleInsert}
                style={{ marginBottom: "2rem" }}
              >
                <input
                  className="border rounded px-2 py-1 mb-2"
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                />
                <input
                  className="border rounded px-2 py-1 mb-2"
                  type="text"
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                />
                <input
                  className="border rounded px-2 py-1 mb-2"
                  type="text"
                  name="category"
                  value={editForm.category}
                  onChange={handleEditChange}
                />
                <input
                  className="border rounded px-2 py-1 mb-2"
                  type="number"
                  name="price"
                  value={editForm.price}
                  onChange={handleEditChange}
                />
                <input
                  className="border rounded px-2 py-1 mb-2"
                  type="number"
                  name="stock"
                  value={editForm.stock}
                  onChange={handleEditChange}
                />
                <button
                  className="border px-2 py-1 mb-2 bg-gray-800 text-gray-200 rounded-xl hover:cursor-pointer"
                  onClick={() => handleEditSave(product._id || product.id)}
                >
                  Save
                </button>
                <button
                  className="border px-2 py-1 mb-2 bg-gray-800 text-gray-200 rounded-xl hover:cursor-pointer"
                  onClick={() => setEditId(null)}
                >
                  Cancel
                </button>
              </form>
            ) : (
              <div className="m-4 p-4 border rounded-lg shadow-sm hover:shadow-md transition">
                <div>
                  <p className="text-xl font-bold">{product.name}</p>
                  <p>
                    <span className="font-semibold italic">Description:</span>
                    {product.description}{" "}
                  </p>
                  <p>
                    <span className="font-semibold italic">Category: </span>
                    {product.category}{" "}
                  </p>
                  <p>
                    <span className="font-semibold italic">Price: </span>
                    {product.price}€{" "}
                  </p>
                  <p>
                    <span className="font-semibold italic">Stock: </span>
                    {product.stock}
                  </p>
                </div>
                <button
                  className="border px-2 py-1 mb-2 bg-gray-800 text-gray-200 rounded-xl hover:cursor-pointer"
                  onClick={() => handleEditClick(product)}
                  style={{ marginLeft: "1rem" }}
                >
                  Edit
                </button>
                <button
                  className="border px-2 py-1 mb-2 bg-gray-800 text-gray-200 rounded-xl hover:cursor-pointer"
                  onClick={() => handleDelete(product._id || product.id)}
                  style={{ marginLeft: "1rem" }}
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
