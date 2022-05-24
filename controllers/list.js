import mongoose from "mongoose";
import List from "../models/list.js";
import Task from "../models/task.js";
import User from "../models/user.js";

export const addList = async (req, res) => {
  const { listName, selectedColor, userName } = req.body;

  try {
    // const user = await User.findById(req.userId);

    await List.create({
      title: listName,
      color: selectedColor,
      createdBy: req.userId,
      createdByName: [userName],
    });

    const lists = await List.find({ createdBy: req.userId });

    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.", error });
  }
};

export const getList = async (req, res) => {
  try {
    // const user = await User.findById(req.userId);
    // console.log("work");

    // console.log("first", user);
    const lists = await List.find({ createdBy: req.userId }).populate({
      path: "tasks",
      model: Task,
    });

    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.", error });
  }
};

export const updateList = async (req, res) => {
  const { listName, selectedColor, id } = req.body;

  try {
    await List.findByIdAndUpdate(
      id,
      {
        title: listName,
        color: selectedColor,
      },
      {
        new: true,
      }
    );

    const lists = await List.find({ createdBy: req.userId }).populate({
      path: "tasks",
      model: Task,
    });

    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.", error });
  }
};

export const deleteList = async (req, res) => {
  const { id } = req.params;

  try {
    await List.findByIdAndDelete(id);

    const lists = await List.find({ createdBy: req.userId }).populate({
      path: "tasks",
      model: Task,
    });

    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.", error });
  }
};

export const shareList = async (req, res) => {
  const { shareId, userName } = req.body;

  // const ObjectId = mongoose.Types.ObjectId;
  // const id1 = new ObjectId(req.userId);
  // console.log("ID", id1);
  try {
    const sharedList = await List.findById(shareId);

    const isAdded = !sharedList?.createdBy.includes(req.userId);

    if (isAdded) {
      sharedList.createdBy = [...sharedList.createdBy, req.userId];
      sharedList.createdByName = [...sharedList.createdByName, userName];
      await sharedList.save();
    }

    const lists = await List.find({ createdBy: req.userId }).populate({
      path: "tasks",
      model: Task,
    });

    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.", error });
  }
};

//  62893e5abf5249e377e6d0c4
