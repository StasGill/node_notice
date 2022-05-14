import mongoose from "mongoose";

const listSchema = mongoose.Schema({
  title: { type: String, required: true },
  color: { type: String, required: true },
  createdBy: { type: [String], required: true },
  id: { type: String },
});

const List = mongoose.model("List", listSchema);

export default List;
