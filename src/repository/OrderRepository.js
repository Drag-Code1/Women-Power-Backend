const CrudRepository = require('./CrudRepository');
const { Order } = require('../models');

class OrderRepository extends CrudRepository
{
    constructor()
    {
        super(Order);
    }
}

module.exports = OrderRepository;