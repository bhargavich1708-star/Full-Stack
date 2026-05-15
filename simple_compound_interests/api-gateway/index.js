const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const SIMPLE_INTEREST_URL = 'http://localhost:3001/calculate';
const COMPOUND_INTEREST_URL = 'http://localhost:3002/calculate';

app.post('/api/simple-interest', async (req, res) => {
    try {
        const response = await axios.post(SIMPLE_INTEREST_URL, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { error: 'Internal Server Error' });
    }
});

app.post('/api/compound-interest', async (req, res) => {
    try {
        const response = await axios.post(COMPOUND_INTEREST_URL, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});
