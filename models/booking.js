const mongoose=require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
    default: 'Pending'
  }
}, { timestamps: true });
const booking=mongoose.model("booking",bookingSchema);
module.exports=booking;