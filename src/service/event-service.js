const EventRepository = require("../repository/EventRepository");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/AppError");

class EventService {
  constructor() {
    this.eventRepo = new EventRepository();
  }

  //1.Add new event
  async addNewEvent(data) {
    try {
      const response = await this.eventRepo.create(data);
      return response;
    } catch (error) {
      throw new AppError(
        "failed to create event",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  //2.get All Events
  async getAllEvents() {
    try {
      const response = await this.eventRepo.getAll();
      return response;
    } catch (error) {
      throw new AppError(
        "failed to fetch events",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  //3.update event
  async updateEvent(id, data) {
    try {
      const response = await this.eventRepo.update(id, data);
      return response;
    } catch (error) {
      throw new AppError(
        "failed to update event",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  //4.delete event
  async deleteEvent(id) {
    try {
      const response = await this.eventRepo.destroy(id);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = EventService ;
