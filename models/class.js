const mongoose = require('mongoose')
const eventSchema = new mongoose.Schema({
  nama: String,
  nim: String,
  tanggal: Date,
  kelas: String,
  alasan: String,
  createdAt: { type: Date, default: Date.now },
  disetujui: Boolean
})

module.exports = mongoose.model('Class', eventSchema)
