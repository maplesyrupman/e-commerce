const router = require('express').Router();
const { Category, Product, Tag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'stock', 'price'],
        include: [
          {
            model: Tag,
            as: 'tags',
            through: {attributes: []},
            attributes: ['tag_name']
          }
        ]
      }
    ]
  })
  .then(categoryData => res.status(200).json(categoryData))
  .catch(err => res.status(400).json(err))
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'stock', 'price'],
        include: [
          {
            model: Category,
            attributes: ['category_name']
          },
          {
            model: Tag,
            as: 'tags',
            through: {attributes: []},
            attributes: ['tag_name']
          }
        ]
      }
    ]
  })
  .then(categoryData => {
    if (categoryData) {
      res.status(200).json(categoryData)
    } else {
      res.status(404).json({message: `could not find category with id ${req.params.id}`})
    }
  })
  .catch(err => res.status(400).json(err))
});

router.post('/', (req, res) => {
  Category.create(req.body)
  .then(categoryData => res.status(200).json(categoryData))
  .catch(err => res.status(400).json(err))
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(categoryData => {
    if (categoryData) {
      res.status(200).json(categoryData)
    } else {
      res.status(404).json({message: `could not find category with id ${req.params.id}`})
    }
  })
  .catch(err => res.status(400).json(err))
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(catagoryData => {
    if (catagoryData) {
      res.status(200).json(catagoryData)
    } else {
      res.status(404).json({message: `could not find category with id ${req.params.id}`})
    }
  })
  .catch(err => res.status(400).json(err))
});

module.exports = router;