const ProductRepo = require("../repository/ProductRepository");
const ArtistRepo = require("../repository/ArtistRepository");
const CourseRepo = require("../repository/CourseRepository");
const EventRepo = require("../repository/EventRepository");
const AppError = require("../utils/errors/AppError");
const { StatusCodes } = require("http-status-codes");

class DashboardService {
  constructor() {
    this.p_Repo = new ProductRepo();
    this.a_Repo = new ArtistRepo();
    this.c_Repo = new CourseRepo();
    this.e_Repo = new EventRepo();
  }

  async count() {
    try {
      const productCount = await this.p_Repo.countAll();
      const artistCount = await this.a_Repo.countAll();
      const courseCount = await this.c_Repo.countAll();
      const eventCount = await this.e_Repo.countAll();

      const response = { productCount, artistCount, courseCount, eventCount };

      return response;
    } catch (error) {
      throw new AppError(
        "Could not count currently",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async search(input) {
    try {
      const products = await this.p_Repo.getAllProducts();

      const filterProducts = products.filter((p) => {
        p.p_Name.toLowerCase().includes(input.toLowerCase());
      });

      return filterProducts ;
    } catch (error) {
      throw new AppError(
        "Products not found.",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = DashboardService;
