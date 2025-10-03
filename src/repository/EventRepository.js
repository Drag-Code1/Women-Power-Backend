const CrudRepository = require("./CrudRepository");
const { Event } = require("../models");

class EventRepository extends CrudRepository {
  constructor() {
    super(Event);
  }
}

module.exports = EventRepository;
