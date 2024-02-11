require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const DBConnection = require("./config/db");

DBConnection();
const app = express();
const port = process.env.PORT || 3000;

const { UserRouter, ProductRouter } = require("./routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`\n\n${Date().toLocaleString()}`);
    console.log(`new request, its method: ${req.method}`);
    console.log(`the url requested: ${req.url}\n`);
    next();
});

app.use("/user", UserRouter);
app.use("/product", ProductRouter);

app.use((req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
});

app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
});