const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/glossary');

const GlossSchema = mongoose.Schema({
  word: {
    type: String,
    required: true
  },
  definition: {
    type: String,
    required: true
  }
});

const GlossItem = mongoose.model('GlossItem', GlossSchema);

module.exports = GlossItem;