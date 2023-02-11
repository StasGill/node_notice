import mongoose from "mongoose";

const irregularSchema = mongoose.Schema({
  right: { type: Number, required: true },
  error: { type: Number, required: true },
  name: { type: String, required: true },
});

const Irregular = mongoose.model("Irregular", irregularSchema);

export default Irregular;
