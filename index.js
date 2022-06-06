const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const fileRoutes = require('./routes/file-upload-routes');
const dotenv = require("dotenv");
const api = require('./routes/api');
const userRoutes = require('./routes/userRoutes');
const { authorizeUser } = require('./middlewares/userMiddlewares');
const admin = require('./routes/admin');
dotenv.config()
const url = process.env.MONGO_URL
mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("MongoDB connection success"))
    .catch((err) => {
        console.log(err);
    });



const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use('/auth', userRoutes);

app.get('/', (req, res) => {
    res.send("Welcome API GoLoak");
});

app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// const middelware = ['/api'];
// app.use( middelware, authorizeUser);

app.use('/api', api);
app.use('/admin', admin);


app.use('/upload-file', fileRoutes.routes);

app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running!");
});