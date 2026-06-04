import { Schema, model } from 'mongoose';

const feedbackSchema = new Schema({});

export const Feedback = model('Feedback', feedbackSchema);
