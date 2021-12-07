const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    include: [
      {
        model: Product,
        as: 'products',
        through: {attributes: []},
        attributes: ['id', 'product_name', 'price', 'stock'],
        include: [
          {
            model: Category,
            attributes: ['category_name']
          },
          {
            model: Tag,
            as: 'tags',
            through: {attributes: []}
          }
        ]
      }
    ]
  })
  .then(dbTagData => res.status(200).json(dbTagData))
  .catch(err => {
    res.status(400).json(err)
  })
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        as: 'products',
        through: {attributes: []},
        include: [
          {
            model: Category,
            attributes: ['category_name']
          },
          {
            model: Tag,
            as: 'tags',
            through: {attributes: []}
          }
        ]
      }
    ]
  })
  .then(tagData => {
    if (tagData) {
      res.status(200).json(tagData)
    } else {
      res.status(404).json({message: `could not find tag with id ${req.params.id}`})
    }
  })
  .catch(err => res.status(400).json(err))
});

router.post('/', (req, res) => {
  Tag.create(req.body)
  .then(tagData => res.status(200).json(tagData))
  .catch(err => res.status(400).json(err))
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(tagData => {
    if (tagData) {
      res.status(200).json(tagData)
    } else {
      res.status(404).json({message: `could not find tag with id ${req.params.id}`})
    }
  })
  .catch(err => res.status(400).json(err))
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(tagData => {
    if (tagData) {
      res.status(200).json(tagData)
    } else {
      res.status(404).json({message: `could not find tag with id ${req.params.id}`})
    }
  })
  .catch(err => res.status(400).json(err))
});

module.exports = router;
