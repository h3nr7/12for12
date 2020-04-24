import * as mongoose from 'mongoose';
import { Food as IFood } from './food.interface';

export type FoodDocument = mongoose.Document & mongoose.DocumentToObjectOptions & IFood;

const foodSchema = new mongoose.Schema({
    name: String,
    amountPer: String,
    calories: Number
});

export const Food = mongoose.model<FoodDocument>("Food", foodSchema);