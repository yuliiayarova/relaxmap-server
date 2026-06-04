import { Schema, model } from 'mongoose';

const locationTypeSchema = new Schema(
  {
    _id: String,
    type: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    shortDescription: String,
  },
  {
    versionKey: false,
  },
);

export const LocationType = model(
  'LocationType',
  locationTypeSchema,
  'location_types',
);
