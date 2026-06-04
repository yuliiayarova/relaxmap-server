import { Schema, model } from 'mongoose';

const regionSchema = new Schema(
  {
    _id: String,
    region: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    level: String,
    note: String,
  },
  {
    versionKey: false,
  },
);

export const Region = model('Region', regionSchema);
