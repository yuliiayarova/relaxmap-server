import { Schema, model } from 'mongoose';

const locationTypeSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },
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
