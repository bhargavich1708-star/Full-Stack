const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3002;

app.use(cors());
app.use(bodyParser.json());

app.post('/calculate', (req, res) => {
    const { principal, rate, time, frequency } = req.body;

    if (principal === undefined || rate === undefined || time === undefined || frequency === undefined) {
        return res.status(400).json({ error: 'Missing required fields: principal, rate, time, frequency' });
    }

    const P = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const n = parseInt(frequency);

    if (isNaN(P) || isNaN(r) || isNaN(t) || isNaN(n)) {
        return res.status(400).json({ error: 'All fields must be valid numbers' });
    }

    // A = P(1 + r/n)^(nt)
    const amount = P * Math.pow((1 + (r / n)), (n * t));
    const interest = amount - P;

    res.json({
        principal: P,
        rate: parseFloat(rate),
        time: t,
        frequency: n,
        interest: interest.toFixed(2),
        total: amount.toFixed(2)
    });
});

app.listen(PORT, () => {
    console.log(`Compound Interest Service running on port ${PORT}`);
});
