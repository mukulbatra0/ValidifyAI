import Idea from '../models/Idea.js';
import { analyzeIdea } from '../services/openaiService.js';

// POST /api/ideas — Create idea and trigger async AI analysis
export const createIdea = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: true, message: 'Title and description are required.' });
  }
  if (title.trim().length < 3) {
    return res.status(400).json({ error: true, message: 'Title must be at least 3 characters.' });
  }
  if (description.trim().length < 20) {
    return res.status(400).json({ error: true, message: 'Description must be at least 20 characters.' });
  }

  // Save idea immediately with 'analyzing' status
  const idea = await Idea.create({
    title: title.trim(),
    description: description.trim(),
    status: 'analyzing',
  });

  res.status(201).json({ success: true, data: idea });

  // Run AI analysis in background (non-blocking)
  setImmediate(async () => {
    try {
      const report = await analyzeIdea(idea.title, idea.description);
      await Idea.findByIdAndUpdate(idea._id, {
        status: 'completed',
        report,
        errorMessage: null,
      });
      console.log(`✅ Analysis completed for idea: ${idea._id}`);
    } catch (err) {
      console.error(`❌ Analysis failed for idea ${idea._id}:`, err.message);
      await Idea.findByIdAndUpdate(idea._id, {
        status: 'error',
        errorMessage: err.message,
      });
    }
  });
};

// GET /api/ideas — Get all ideas (newest first)
export const getAllIdeas = async (req, res) => {
  const ideas = await Idea.find({})
    .select('title description status report.risk_level report.profitability_score createdAt')
    .sort({ createdAt: -1 });

  res.json({ success: true, count: ideas.length, data: ideas });
};

// GET /api/ideas/:id — Get single idea with full report
export const getIdeaById = async (req, res) => {
  const idea = await Idea.findById(req.params.id);
  if (!idea) {
    return res.status(404).json({ error: true, message: 'Idea not found.' });
  }
  res.json({ success: true, data: idea });
};

// DELETE /api/ideas/:id — Delete idea
export const deleteIdea = async (req, res) => {
  const idea = await Idea.findByIdAndDelete(req.params.id);
  if (!idea) {
    return res.status(404).json({ error: true, message: 'Idea not found.' });
  }
  res.json({ success: true, message: 'Idea deleted successfully.' });
};
