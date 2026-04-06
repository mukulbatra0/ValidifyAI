import express from 'express';
import {
  createIdea,
  getAllIdeas,
  getIdeaById,
  deleteIdea,
} from '../controllers/ideasController.js';

const router = express.Router();

router.post('/', createIdea);
router.get('/', getAllIdeas);
router.get('/:id', getIdeaById);
router.delete('/:id', deleteIdea);

export default router;
