const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send({ hi: 'there' });
});

const PORT = process.env.PORT || 5000; // dynamic port binding - use env var in Heroku, and port 5000 locally
app.listen(PORT);
