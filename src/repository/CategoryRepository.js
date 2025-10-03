const CrudRepository = require('./CrudRepository');
const { Category } = require('../models');

class CategoryRepository extends CrudRepository{
    constructor()
    {
        super(Category);
    }
}

module.exports = CategoryRepository;