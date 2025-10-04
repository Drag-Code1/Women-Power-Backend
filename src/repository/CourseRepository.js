const CrudRepository = require('./CrudRepository');
const { Course } = require('../models');

class CourseRepository extends CrudRepository{
    constructor()
    {
        super(Course);
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

module.exports = CourseRepository ;