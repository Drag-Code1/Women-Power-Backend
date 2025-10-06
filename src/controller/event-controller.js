const EventService = require("../service/event-service");
const { StatusCodes } = require("http-status-codes");
const success = require("../utils/success/success-response");

const eventServ = new EventService();

class EventController {
  //1.add new event
  async createEvent(req, res, next) {
    try {
      const response = await eventServ.addNewEvent(req.body);
      return res
        .status(StatusCodes.CREATED)
        .json(success(response, "Event added successfully"));
    } catch (error) {
      next(error);
    }
  }

  //2.get All Events
  async getAllEvents(req, res, next) {
    try {
      const response = await eventServ.getAllEvents();
      return res
        .status(StatusCodes.OK)
        .json(success(response, "All events retrived"));
    } catch (error) {
      next(error);
    }
  }

  //3.update events
  async updateEvent(req, res, next) {
    try {
      const response = await eventServ.updateEvent(req.params.id, req.body);
      return res
        .status(StatusCodes.OK)
        .json(success(response, "Event updated"));
    } catch (error) {
      next(error);
    }
  }

  //4.delete event
  async deleteEvent(req, res, next) {
    try {
      const response = await eventServ.deleteEvent(req.params.id);
      return res
        .status(StatusCodes.OK)
        .json(success(response, "Event deleted."));
    } catch (error) {
      next(error);
    }
  }

  //5.get by id
  async getEventById(req, res, next) {
    try {
      const response = await eventServ.getEventById(req.params.id);
      return res
        .status(StatusCodes.OK)
        .json(success(response, "Event details"));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new EventController();
