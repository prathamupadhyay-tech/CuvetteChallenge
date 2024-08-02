import Express from "express";
import { addNotes, getNotesByGroupId } from "../controller/notesController.js";

const notesRouter = Express.Router();

notesRouter.post("/:id", addNotes);
notesRouter.get("/groupNotes/:id", getNotesByGroupId);
export default notesRouter;
