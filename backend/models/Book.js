import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  genre: String,
  description: String,
  publicationYear:Number,
  coverImageUrl:{type: String},
  averageRating: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Book', bookSchema);
