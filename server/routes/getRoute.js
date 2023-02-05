import express  from "express";
import getController from "../controllers/getController.js";

const router = express.Router();

router.get('/', getController);

  export default router; 