import { Schema, model } from 'mongoose';
import { LocationType } from './locationType.js';

const locationSchema = new Schema(
  {
    image: {
      type: String,
      required: false,
      default: 'https://ac.goit.global/fullstack/react/default-avatar.jpg',
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    locationType: {
      type: Schema.Types.ObjectId,
      ref: 'LocationType', //чтото не понял на кого ссылаться
      required: true,
    },
    region: {
      type: Schema.Types.ObjectId,
      ref: 'Region', //чтото не понял на кого ссылаться
      required: true,
    },
    rate: {
      type: Number,
      required: false,
      default: 0,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    coordinates: {
      lat: { type: Number, required: true },
      lon: { type: Number, required: true },
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    feedbacksId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Feedback', //чтото не понял на кого ссылаться
      },
    ],
  },
  { versionKey: false, timestamps: true },
);

export const Location = model('Location', locationSchema);
