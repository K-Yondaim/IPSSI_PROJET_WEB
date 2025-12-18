const express = require('express');
const cors = require('cors');
const { initModels } = require('./models'); // ORM Init
const userRoutes = require('./routes/userRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();
const port = 8000;

// Middleware
app.use(express.json());
app.use(express.text());
app.use(cors());

// Initialize Database Tables via ORM
initModels();

// Routes
app.use('/api', userRoutes);     // Prefixing API routes is best practice
app.use('/api', commentRoutes);  // note: original didn't have /api, but better for structure. I will keep original paths in routes or adapt frontend.
// To minimize frontend breakage WITHOUT changing frontend code yet, I should check frontend.
// Frontend package.json showed "proxy" is not set, so it probably calls localhost:8000 directly.
// The original server.js had /users, /populate, etc. directly at root.
// I will keep them at root for now to avoid breaking frontend immediately, or I need to check frontend fetching logic.
// Let's bind them to root for compatibility first.

app.use('/', userRoutes);
app.use('/', commentRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
