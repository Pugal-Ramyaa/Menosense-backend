const mongoose = require('mongoose');

const timelineSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  // Include fields from the Vitals model
  hb: { type: Number, required: true },
  sbp: { type: Number, required: true },
  dbp: { type: Number, required: true },
  fsh: { type: Number, required: true },
  prl: { type: Number, required: true },
  e2: { type: Number, required: true },
  lh: { type: Number, required: true },
  p4: { type: Number, required: true },
  vd: { type: Number, required: true },
  tsh: { type: Number, required: true },
  ft3: { type: Number, required: true },
  ft4: { type: Number, required: true },
  hr: { type: Number, required: true },
  hdl: { type: Number, required: true },
  tg: { type: Number, required: true },
  gnrh: { type: Number, required: true },
  // Include fields from the Logs model
  heartRate: { type: Number, required: true },
  weight: { type: Number, required: true },
  sleepingProblems: { type: Number, required: true },
  hotFlashes: { type: Number, required: true },
  nightSweats: { type: Number, required: true },
  chills: { type: Number, required: true },
  fatigue: { type: Number, required: true },
  headAche: { type: Number, required: true },
  vaginalDryness: { type: Number, required: true },
  moodSwings: { type: Number, required: true },
  Date: { type: Date, required: true },
});

module.exports = mongoose.model('TimelineData', timelineSchema);
