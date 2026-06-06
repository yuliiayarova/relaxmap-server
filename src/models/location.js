import { Schema, model } from 'mongoose';

const locationSchema = new Schema(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Location = model('Location', locationSchema);
