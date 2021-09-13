const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Con Mongoose, todo se deriva de un esquema. Hagamos una referencia a él y definamos nuestros propiedades.

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    userName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    hash_password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    contactNumber: {
        type: String
    },
    profilePicture: {
        type: String
    }
}, {timestamps: true});

// La timestamps opción le dice mongoose para asignar los campos createdAt y updatedAt a su esquema.


// Los virtuales son propiedades del documento que puede obtener y configurar, pero que no se conservan en MongoDB.
userSchema.virtual('password')
.set(function(password) {
    this.hash_password = bcrypt.hashSync(password, 10);
});

userSchema.virtual('fullName')
.get(function(){
    return `${this.firstName} ${this.lastName}`;
});

// También podemos definir nuestros propios métodos de instancia de documentos personalizados.
userSchema.methods = {
    authenticate: async function (password) {
      return await bcrypt.compareSync(password, this.hash_password);
    },
  };



module.exports = mongoose.model('User', userSchema);