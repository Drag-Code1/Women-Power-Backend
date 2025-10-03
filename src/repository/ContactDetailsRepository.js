const CrudRepository = require('./CrudRepository');
const { ContactDetails } = require('../models');

class ContactDetailsRepository extends CrudRepository{
    constructor(){
        super(ContactDetails);
    }
}

module.exports = ContactDetailsRepository;