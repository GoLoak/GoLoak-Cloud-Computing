const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const auth = require('./routes/auth');
const bodyParser = require('body-parser');
const fileRoutes = require('./routes/file-upload-routes');
const dotenv = require("dotenv");
dotenv.config()
const url = process.env.MONGO_URL
mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
        console.log(err);
    });



const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use('/auth', auth);

app.get('/', (req, res) => {
    res.send("JWT Authentictaion API");
});

app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', fileRoutes.routes);

app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running!");
});