import mongoose from 'mongoose';

const roomSchema = mongoose.Schema(
  {
    number: {
      type: Number,
    },
    totalBeds: {
      type: Number,
    },
    bedsTaken: {
      type: Number,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const Room = mongoose.model('Room', roomSchema);
export default Room;
