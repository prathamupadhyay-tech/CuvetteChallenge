import Express from "express";
import { addGroup, getBoards } from "../controller/groupController.js";

const groupRouter = Express.Router();

groupRouter.post("/", addGroup);
groupRouter.get("/all", getBoards);
export default groupRouter;
