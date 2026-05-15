const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/calculate', (req, res) => {
    const { principal, rate, time } = req.body;

    if (principal === undefined || rate === undefined || time === undefined) {
        return res.status(400).json({ error: 'Missing required fields: principal, rate, time' });
    }

    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(time);

    if (isNaN(p) || isNaN(r) || isNaN(t)) {
        return res.status(400).json({ error: 'All fields must be valid numbers' });
    }

    const interest = (p * r * t) / 100;
    const total = p + interest;

    res.json({
        principal: p,
        rate: r,
        time: t,
        interest: interest.toFixed(2),
        total: total.toFixed(2)
    });
});

app.listen(PORT, () => {
    console.log(`Simple Interest Service running on port ${PORT}`);
});
