import mongoose, { Schema, model } from 'mongoose';

const roomSchema = new Schema(
  {
    roomNumber: {
      type: String,
    },
    totalBeds: {
      type: Number,
      required: true,
      default: 6,
    },
    bedsTaken: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const shelterSchema = new Schema({
  totalGuests: Number,
  currentGuests: Number,
  rooms: [roomSchema],
});

const Shelter = model('Shelter', shelterSchema, 'shelterStats');

export default Shelter;

// const createShelter = async () => {
//   const rooms = [];
//   for (let i = 1; i <= 16; i++) {
//     rooms.push({ roomNumber: i, totalBeds: 6, bedsTaken: 0 });
//   }

//   const shelter = new Shelter({
//     totalGuests: 0,
//     currentGuests: 0,
//     rooms: rooms,
//   });

//   await shelter.save();
//   console.log('Shelter created with 16 rooms');
// };

// // Main function to connect to MongoDB and create the shelter
// const main = async () => {
//   try {
//     await createShelter();
//   } catch (error) {
//     console.error('Error connecting to MongoDB or creating shelter:', error);
//   } finally {
//     mongoose.connection.close();
//   }
// };

// main();
