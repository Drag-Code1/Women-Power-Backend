const CrudRepository = require("./CrudRepository");
const { Event } = require("../models");

class EventRepository extends CrudRepository {
  constructor() {
    super(Event);
  }

  async countAll() {
    try {
      const count = await this.model.count();
      return count;
    } catch (error) {
      throw new AppError(
        "Could not count.",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = EventRepository;
