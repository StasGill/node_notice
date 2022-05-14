import List from "../models/list.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const addList = async (req, res) => {
  const { listName, selectedColor } = req.body;

  try {
    await List.create({
      title: listName,
      color: selectedColor,
      createdBy: [req.userId],
    });
    const lists = await List.find({ createdBy: req.userId });

    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.", error });
  }
};

export const getList = async (req, res) => {
  try {
    const lists = await List.find({ createdBy: req.userId });

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
    const lists = await List.find({ createdBy: req.userId });
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.", error });
  }
};

export const deleteList = async (req, res) => {
  const { id } = req.params;

  try {
    await List.findByIdAndDelete(id);
    const lists = await List.find({ createdBy: req.userId });
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.", error });
  }
};
