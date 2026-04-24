const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

//Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is running...');
});

app.get('/api/message', (req, res) => {
    res.json({message: 'Message from backend'});
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
