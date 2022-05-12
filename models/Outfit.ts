import mongoose from "mongoose";

const OutfitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  hour: String,
  totalTime: String,
  momHours: [
    {
      hour: Number,
      minute: Number,
      second: Number,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  kateHours: [
    {
      hour: Number,
      minute: Number,
      second: Number,
      totalTime: String,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

export default mongoose.models.Outfit || mongoose.model("Outfit", OutfitSchema);
