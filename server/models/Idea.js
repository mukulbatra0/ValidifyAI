import mongoose from 'mongoose';

const competitorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  differentiation: { type: String, required: true },
}, { _id: false });

const reportSchema = new mongoose.Schema({
  problem: { type: String, default: '' },
  customer: { type: String, default: '' },
  market: { type: String, default: '' },
  competitor: { type: [competitorSchema], default: [] },
  tech_stack: { type: [String], default: [] },
  risk_level: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  profitability_score: { type: Number, min: 0, max: 100, default: 0 },
  justification: { type: String, default: '' },
}, { _id: false });

const ideaSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['pending', 'analyzing', 'completed', 'error'],
      default: 'pending',
    },
    report: { type: reportSchema, default: null },
    errorMessage: { type: String, default: null },
  },
  { timestamps: true }
);

const Idea = mongoose.model('Idea', ideaSchema);

export default Idea;
