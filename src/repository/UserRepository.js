const { User } = require("../models");
const CrudRepository = require("./CrudRepository");

class UserRepository extends CrudRepository {

  constructor()
  {
    super(User);
  }

}

module.exports = UserRepository ;
