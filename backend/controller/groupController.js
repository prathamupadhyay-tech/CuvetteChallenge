import Group from "../models/group.js";

export const addGroup = async (req, res, next) => {
  const { description, color } = req.body;
  if (!description || !color) {
    return res
      .status(400)
      .json({ message: "color and description are required." });
  }
  const newGroup = new Group({ description, color });
  try {
    await newGroup.save();
  } catch (err) {
    return res.status(400).json({ message: err });
  }

  return res.status(200).json({ newGroup });
};

export const getBoards = async (req, res, next) => {
  try {
    let data = await Group.find();

    if (data) {
      res.status(200).json({ data: data });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
