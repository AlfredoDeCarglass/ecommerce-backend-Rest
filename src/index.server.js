const express = require('express');
const env = require('dotenv');
const mongoose = require('mongoose');

const app = express();
env.config();

// routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

// mongodb connection 
// mongodb+srv://root:<password>@cluster0.i6rzi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

// abrir una conexión a la base de datos 
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.i6rzi.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    
).then(() => {
    console.log('Database connected');
});


// Para cargar la función de middleware, llame a app.use(), especificando la función de middleware
app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);

// Vincula y escucha las conexiones en el host y el puerto especificados.
app.listen(process.env.PORT, () => {
    console.log(`Server is running ${process.env.PORT}`);
})