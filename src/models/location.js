import { Schema, model } from 'mongoose';

const locationSchema = new Schema({});

export const Location = model('Location', locationSchema);
