import React, { useState, useEffect } from 'react';

function ProductManagement() {
    const [products, setProducts] = useState([]);
    const [productName, setProductName] = useState('');
    const [sellingPrice, setSellingPrice] = useState('');
    const [category, setCategory] = useState('Electronic Items');

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        setProducts(storedProducts);
    }, []);

    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const newProduct = {
            productName: productName,
            sellingPrice: sellingPrice,
            category: category,
            _id: Math.random().toString(36).substr(2, 9) // Generating a unique ID
        };

        setProducts([...products, newProduct]);
        clearInputFields();
    };

    const deleteProduct = (id) => {
        const updatedProducts = products.filter(product => product._id !== id);
        setProducts(updatedProducts);
    };

    const clearInputFields = () => {
        setProductName('');
        setSellingPrice('');
        setCategory('Electronic Items');
    };

    return (
        <div>
            <h2>Add Product</h2>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="productName">Product Name</label>
                <input type="text" name="productName" value={productName} onChange={(e) => setProductName(e.target.value)} required />

                <label htmlFor="sellingPrice">Selling Price</label>
                <input type="number" name="sellingPrice" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} required />

                <label htmlFor="category">Category</label>
                <select name="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
                    <option value="Electronic Items">Electronic Items</option>
                    <option value="Food Items">Food Items</option>
                    <option value="Skincare">Skincare</option>
                    <option value="Others">Others</option>
                </select>

                <button type="submit">Add Product</button>
            </form>

            <h2>Product List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Selling Price</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>{product.productName}</td>
                            <td>{product.sellingPrice}</td>
                            <td>{product.category}</td>
                            <td>
                                <button onClick={() => deleteProduct(product._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductManagement;
