const express = require('express');
const env = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
env.config();

// routes
const userRoutes = require('./routes/user');

// mongodb connection 
// mongodb+srv://root:<password>@cluster0.i6rzi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.i6rzi.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    
).then(() => {
    console.log('Database connected');
});

app.use(express.json());
app.use('/api', userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running ${process.env.PORT}`);
});