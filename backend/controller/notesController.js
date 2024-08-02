import Group from "../models/group.js";
import Notes from "../models/notes.js";

export const addNotes = async (req, res, next) => {
  const { des } = req.body;
  const groupId = req.params.id;
  if (!des) {
    return res.status(400).json({ message: "description are required." });
  }
  try {
    const existingGroup = await Group.findById(groupId);
    if (!existingGroup) {
      return res.status(404).json({ message: "Group not found." });
    }
    const newNote = new Notes({
      des,
    });
    const savedNote = await newNote.save();
    existingGroup.notes.push(savedNote);
    await existingGroup.save();

    return res
      .status(200)
      .json({ message: "Note added successfully", group: savedNote });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

export const getNotesByGroupId = async (req, res, next) => {
  const groupId = req.params.id;
  try {
    const existingGroup = await Group.findById(groupId);

    if (!existingGroup) {
      return res.status(404).json({ message: "Group not found." });
    }

    const populatedGroup = await existingGroup.populate("notes");

    return res.status(200).json({ data: populatedGroup.notes });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
