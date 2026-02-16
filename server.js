const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// In-memory Database
const products = [
    { id: 1, name: "Kong T-Shirt", price: 25.00 },
    { id: 2, name: "Insomnia Sticker Pack", price: 5.00 },
    { id: 3, name: "API Gateway Hoodie", price: 50.00 }
];
let cart = [];
let orders = [];

// --- Endpoints ---

// 1. List Products
app.get('/products', (req, res) => {
    res.json(products);
});

// 2. Get Product Details
app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if (product) res.json(product);
    else res.status(404).json({ error: "Product not found" });
});

// 3. Add to Cart
app.post('/cart', (req, res) => {
    const { productId, quantity } = req.body;
    const product = products.find(p => p.id == productId);
    
    if (!product) return res.status(404).json({ error: "Product not found" });
    
    cart.push({ productId, name: product.name, quantity, price: product.price });
    res.status(201).json({ message: "Added to cart", cart });
});

// 4. View Cart
app.get('/cart', (req, res) => {
    res.json(cart);
});

// 5. Place Order (Requires Fake Auth)
app.post('/orders', (req, res) => {
    const authHeader = req.headers.authorization;
    
    // Simple secret check
    if (!authHeader || authHeader !== "Bearer my-secret-token") {
        return res.status(401).json({ error: "Unauthorized. Please check your API Token." });
    }

    if (cart.length === 0) return res.status(400).json({ error: "Cart is empty" });

    const order = {
        orderId: uuidv4(),
        items: [...cart],
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        status: "PAID",
        timestamp: new Date()
    };
    
    orders.push(order);
    cart = []; // Clear cart
    res.status(201).json(order);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));