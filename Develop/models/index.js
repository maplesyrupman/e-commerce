// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_key'
})
// Categories have many Products
Category.hasMany(Product)
// Products belongToMany Tags (through ProductTag)
// Product.belongsToMany(Tag, {
//   through: ProductTag,
//   as: 'products',
//   foreignKey: 'product_tag'
// })
// Tags belongToMany Products (through ProductTag)


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
