const CrudRepository = require("./CrudRepository");
const db = require("../models");
const AppError = require("../utils/errors/AppError");
const { StatusCodes } = require("http-status-codes");

class OrderRepository extends CrudRepository {
  constructor() {
    super(db.Order);
    this.db = db;
  }

  async getAllByUserId(userId) {
    try {
      const orders = await this.model.findAll({
        where: { user_id: userId },
        include: [
          {
            model: this.db.OrderItem,
            attributes: ["quantity", "price"],
          },
          {
            model: this.db.Address,
            attributes: ["address", "city", "state", "pincode", "mobileNo", "type"],
          },
        ],
        order: [["order_date", "DESC"]],
      });

      // Format the response
      const formattedOrders = orders.map((order) => {
        const productCount = order.OrderItems.length;
        const totalPrice = order.OrderItems.reduce((sum, item) => {
          return sum + item.quantity * parseFloat(item.price);
        }, 0);

        return {
          id: order.id,
          order_date: order.order_date,
          status: order.status,
          productCount,
          totalPrice: totalPrice.toFixed(2),
          address: order.Address ? {
            address: order.Address.address,
            city: order.Address.city,
            state: order.Address.state,
            pincode: order.Address.pincode,
            mobileNo: order.Address.mobileNo,
            type: order.Address.type,
          } : null,
        };
      });

      return formattedOrders;
    } catch (error) {
      console.error("Fetch user orders error:", error);
      throw new AppError(
        "cannot find orders",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getAllRecent() {
    try {
      const orders = await this.model.findAll({
        include: [
          {
            model: this.db.User,
            attributes: ["firstName", "lastName"],
          },
          {
            model: this.db.OrderItem,
            attributes: ["quantity", "price"],
          },
          {
            model: this.db.Address,
            attributes: ["address", "city", "state", "pincode", "mobileNo", "type"],
          },
        ],
        order: [["order_date", "DESC"]],
      });

      // Format the response
      const formattedOrders = orders.map((order) => {
        const productCount = order.OrderItems.length;
        const totalPrice = order.OrderItems.reduce((sum, item) => {
          return sum + item.quantity * parseFloat(item.price);
        }, 0);

        return {
          id: order.id,
          order_date: order.order_date,
          firstName: order.User.firstName,
          lastName: order.User.lastName,
          productCount,
          totalPrice: totalPrice.toFixed(2),
          address_id: order.address_id,
          address: order.Address ? {
            address: order.Address.address,
            city: order.Address.city,
            state: order.Address.state,
            pincode: order.Address.pincode,
            mobileNo: order.Address.mobileNo,
            type: order.Address.type,
          } : null,
        };
      });

      return formattedOrders;
    } catch (error) {
      console.error("Fetch orders error:", error);
      throw new AppError(
        "Cannot fetch orders",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getDetailedById(id) {
    try {
      const order = await this.model.findByPk(id, {
        include: [
          {
            model: this.db.User,
            attributes: ["firstName", "lastName", "email", "mobileNo"],
          },
          {
            model: this.db.OrderItem,
            include: [
              {
                model: this.db.Product,
                attributes: ["p_Name", "price", "thumbnail", "discount"],
              },
            ],
          },
          {
            model: this.db.Address,
          },
        ],
      });

      if (!order) {
        throw new AppError("Order not found", StatusCodes.NOT_FOUND);
      }

      return order;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(
        "Cannot fetch order details",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = OrderRepository;
