import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import promotionRoutes from './routes/promotionRoutes.js';
import favoriteRoutes from './routes/favoriteRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- ROUTES ---
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/promotions', promotionRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/payment', paymentRoutes);

app.get('/', (req, res) => {
    res.send('Server Mobile Tech đang chạy...');
});

app.use((err, req, res, next) => {
    console.error("LỖI SERVER:", err);
    res.status(500).json({ 
        success: false, 
        message: "Lỗi Server: " + err.message 
    });
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on: https://mobile-tech-ct.onrender.com:${PORT}`);
});

server.keepAliveTimeout = 120 * 1000; 
server.headersTimeout = 125 * 1000;