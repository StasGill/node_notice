import Irregular from "../models/irregular.js";

export const getScore = async (req, res) => {
  try {
    const scores = await Irregular.find();

    const bestTen = scores
      .sort((a, b) => {
        if (a.right < b.right) {
          return 1;
        }
        if (a.right > b.right) {
          return -1;
        }
        return 0;
      })
      .map((item, index) => {
        if (index < 9) {
          return item;
        }
        return;
      });

    res.status(200).json(bestTen);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.", error });
  }
};

export const sendScore = async (req, res) => {
  try {
    const newScore = await Irregular.create(req.body);

    res.status(200).json(newScore);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.", error });
  }
};
