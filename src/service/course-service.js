const CourseRepository = require("../repository/CourseRepository");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/AppError");

class CourseService {
  constructor() {
    this.courseRepo = new CourseRepository();
  }

  //1.Add new course
  async addNewCourse(data) {
    try {
      const response = await this.courseRepo.create(data);
      return response;
    } catch (error) {
      throw new AppError(
        "failed to create course",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  //2.get All categories
  async getAllCourses() {
    try {
      const response = await this.courseRepo.getAll();
      return response;
    } catch (error) {
      throw new AppError(
        "failed to fetch courses",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  //3.update course
  async updateCourse(id, data) {
    try {
      const response = await this.courseRepo.update(id, data);
      return response;
    } catch (error) {
      throw new AppError(
        "failed to update course",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  //4.delete course
  async deleteCourse(id) {
    try {
      const response = await this.courseRepo.destroy(id);
      return response;
    } catch (error) {
      throw error;
    }
  }

    //5.get by Id
  async getCourseById(id) {
    try {
      const response = await this.courseRepo.get(id);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CourseService ;
