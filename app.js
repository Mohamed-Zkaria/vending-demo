require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;
const mongoURL = process.env.MONGODB_URL;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`\n\n${Date().toLocaleString()}`);
    console.log(`new request, its method: ${req.method}`);
    console.log(`the url requested: ${req.url}\n`);
    next();
});

app.get('/', (req, res) => {
    res.send('Working...')
});

mongoose.connect(mongoURL).catch(err=>{
    console.log("error", err)
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
});