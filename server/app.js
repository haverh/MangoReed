const express = require('express');
const cors = require('cors');
const axios = require('axios');

const routes = require('./routes/index');
const port = 8888;
const app = express();

app.use(cors({
    origin: ['https://mango-reed.vercel.app', 'http://localhost:4200', 'https://mango-reed.web.app'],
    methods: ["GET", "POST"],
    credentials: true,
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

routes(app, axios);

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

module.exports = app;