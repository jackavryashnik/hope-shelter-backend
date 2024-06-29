import { Schema, model } from 'mongoose';

const roomSchema = new Schema(
  {
    number: {
      type: Number,
      require: true,
    },
    totalBeds: {
      type: Number,
      require: true,
    },
    bedsTaken: {
      type: Number,
      require: true,
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
  rooms: {
    room1: roomSchema,
    room2: roomSchema,
    room3: roomSchema,
    room4: roomSchema,
    room5: roomSchema,
    room6: roomSchema,
    room7: roomSchema,
    room8: roomSchema,
    room9: roomSchema,
    room934: roomSchema,
    room10: roomSchema,
    room11: roomSchema,
    room12: roomSchema,
    room13: roomSchema,
    room14: roomSchema,
    room15: roomSchema,
  },
});

const Shelter = model('Shelter', shelterSchema, 'shelterStats');

export default Shelter;
