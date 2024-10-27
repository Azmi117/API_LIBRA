require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.DB_PORT || 8080;
const routes = require('./routes/index');

app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
});
