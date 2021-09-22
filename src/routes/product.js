const express = require('express');
const multer = require('multer');
const path = require('path');
const shortid = require('shortid');
const { requireSignin, adminMiddleware } = require('../common');
const { createProduct } = require('../controller/product');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads') )
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  });
  
const upload = multer({ storage });

router.post('/product/create', requireSignin, adminMiddleware, upload.array('productImg'), createProduct);

// router.get('/product/getCategory', getCategories);

module.exports = router;