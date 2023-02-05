import mongoose from "mongoose";


const seatSchema = new mongoose.Schema({
    seatNumber: { type: Number, unique: true },
    isAvailable: { type: Boolean, default: true },
    rowNumber: { type: Number }
  });
  
  const Seat = mongoose.model('Seat', seatSchema);

export default Seat  
  