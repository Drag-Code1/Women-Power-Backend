const CourseService = require("../service/course-service");
const { StatusCodes } = require("http-status-codes");
const success = require("../utils/success/success-response");

const courseServ = new CourseService();

class CourseController {
  //1.add new category
  async createCourse(req, res, next) {
    try {
      const response = await courseServ.addNewCourse(req.body);
      return res
        .status(StatusCodes.CREATED)
        .json(success(response, "Course added successfully"));
    } catch (error) {
      next(error);
    }
  }

  //2.get All Courses
  async getAllCourses(req, res, next) {
    try {
      const response = await courseServ.getAllCourses();
      return res
        .status(StatusCodes.OK)
        .json(success(response, "All courses retrived"));
    } catch (error) {
      next(error);
    }
  }

  //3.update
  async updateCourse(req, res, next) {
    try {
      const response = await courseServ.updateCourse(req.params.id, req.body);
      return res
        .status(StatusCodes.OK)
        .json(success(response, "Course updated"));
    } catch (error) {
      next(error);
    }
  }

  //4.delete
  async deleteCourse(req, res, next) {
    try {
      const response = await courseServ.deleteCourse(req.params.id);
      return res
        .status(StatusCodes.OK)
        .json(success(response, "Course deleted."));
    } catch (error) {
      next(error);
    }
  }

  //5.get by id
  async getCourseById(req, res, next) {
    try {
      const response = await courseServ.getCourseById(req.params.id);
      return res
        .status(StatusCodes.OK)
        .json(success(response, "Course details"));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CourseController();
