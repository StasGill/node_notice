import mongoose from "mongoose";

const listSchema = mongoose.Schema({
  title: { type: String, required: true },
  color: { type: String, required: true },
  createdBy: { type: [String], required: true },
  createdByName: { type: [String], required: true },
  tasks: [{ type: mongoose.Types.ObjectId, ref: "Task" }],
});

const List = mongoose.model("List", listSchema);

export default List;
