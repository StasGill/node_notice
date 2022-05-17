import mongoose from "mongoose";
import List from "../models/list.js";
import Task from "../models/task.js";

export const addTask = async (req, res) => {
  const { title, listId } = req.body;

  try {
    const newTask = await Task.create({
      title: title,
      listId: listId,
    });

    const list = await List.findById(listId);

    list.tasks = [...list.tasks, newTask];

    await list.save();

    const lists = await List.find({ createdBy: req.userId }).populate({
      path: "tasks",
      model: Task,
    });

    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.", error });
  }
};

export const getTasks = async (req, res) => {
  try {
    const lists = await List.find({ createdBy: req.userId });

    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.", error });
  }
};

export const updateTask = async (req, res) => {
  const formData = req.body;
  const { id } = req.params;

  try {
    await Task.findByIdAndUpdate(id, formData, { new: true });

    const lists = await List.find({ createdBy: req.userId }).populate({
      path: "tasks",
      model: Task,
    });

    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.", error });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);

    const list = await List.findById(deletedTask.listId);

    list.tasks = list.tasks.filter((item) => !item.equals(id));

    await list.save();

    const lists = await List.find({ createdBy: req.userId }).populate({
      path: "tasks",
      model: Task,
    });

    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.", error });
  }
};
