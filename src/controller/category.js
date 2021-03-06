const Category = require('../models/category');
const slugify = require('slugify');
const category = require('../models/category');

function createCategories(categories, parentId = null) {
    const categoryList = [];
    let category;
    if (parentId == null) {
        category = categories.filter((cat) => cat.parentId == undefined);
    } else {
        category = categories.filter((cat) => cat.parentId == parentId);
    }

    for (let cate of category) {
        categoryList.push({
          _id: cate._id,
          name: cate.name,
          slug: cate.slug,
          parentId: cate.parentId,
          type: cate.type,
          children: createCategories(categories, cate._id),
        });
    }
    return categoryList;
}

exports.addCategory = (req, res) => {

    const categoryObject = {
        name: req.body.name,
        slug: slugify(req.body.name)
    }

    if (req.body.parentId) {
        categoryObject.parentId = req.body.parentId;
    }

    const cat = new Category(categoryObject);
    cat.save((error, category) => {
        if (error) return res.status(400).json({error});
        if (category) return res.status(201).json({category});
    });

}

exports.getCategories = (req, res) => {
    Category.find({})
    .exec((error, categories)  => {
        if (error) return res.status(400).json({error});
        if (categories) {
            const categoriesList = createCategories(categories);
            return res.status(200).json({categoriesList});
        }
        
    });
}