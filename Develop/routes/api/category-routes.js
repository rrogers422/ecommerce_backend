const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id' ]
    }
  })
  .then(dbCatInfo => {
    if (!dbCatInfo) {
      res.status(404).json({message: 'Nothing Found'});
      return;
    }
    res.json(dbCatInfo);
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(500).json(err)
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id' ]
    }
  })
  .then(dbCatInfo => {
    if (!dbCatInfo) {
      res.status(404).json({message: 'none were found'});
      return;
    }
    res.json(dbCatInfo);
  })
  .catch(err => {
    res.status(500).json(err)
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then(dbCatInfo => res.json(dbCatInfo))
  .catch(err => {
    console.log(err);
    res.status(500).jsom(err);
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(dbCatInfo => {
    if (!dbCatInfo) {
      res.status(404).json({ message: 'no categories with that ID'});
      return;
    }
    res.json(dbCatInfo);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
