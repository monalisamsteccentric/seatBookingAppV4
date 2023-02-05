import Seat from "../models/SeatModel.js";

const getController = (req, res) => {
    Seat.find({}).sort({ seatNumber: 1 }).exec((err, seats) => {
      if (err) {
        res.send(err);
      } else {
        res.json(seats);
      }
    });
  }

  export default getController;