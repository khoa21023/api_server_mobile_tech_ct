import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// --- IMPORT CÁC ROUTES ---
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

// --- MIDDLEWARE ---
app.use(cors());

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// --- ĐỊNH NGHĨA ROUTES ---
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

const server = app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
});

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;