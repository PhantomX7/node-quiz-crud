const express = require('express')
const router = express.Router()
const Class = require('../models/class')
const { isLoggedIn } = require('../middleware/index')

// INDEX - show all Class
router.get('/', isLoggedIn, function (req, res) {
    // Get all Class from DB
  Class.find({}, function (err, allClass) {
    if (err) {
      console.log(err)
    } else {
      res.render('class/index', {classes: allClass})
    }
  })
})

// CREATE - add new Class to DB
router.post('/', function (req, res) {
  // get data from form and add to Classs array
  const nama = req.body.nama
  const nim = req.body.nim
  const tanggal = req.body.tanggal
  const kelas = req.body.kelas
  const alasan = req.body.alasan
  const disetujui = false
  const newClass = {nama: nama, nim: nim, tanggal: tanggal, kelas: kelas, alasan: alasan, disetujui: disetujui}
    // Create a new Class and save to DB
  Class.create(newClass, function (err, newlyCreated) {
    if (err) {
      console.log(err)
    } else {
      // redirect back to Classs page
      console.log(newlyCreated)
      res.redirect('/')
    }
  })
})

// NEW - show form to create new Class
router.get('/new', isLoggedIn, function (req, res) {
  res.render('class/new')
})

// SHOW - shows more info about one Class
router.get('/:id', isLoggedIn, function (req, res) {
    // find the Class with provided ID
  Class.findById(req.params.id).exec(function (err, foundClass) {
    if (err) {
      console.log(err)
    } else {
      console.log(foundClass)
            // render show template with that Class
      res.render('class/show', {classes: foundClass})
    }
  })
})

// EDIT

router.get('/:id/edit', isLoggedIn, function (req, res) {
  Class.findById(req.params.id, function (err, foundClass) {
    if (err) {
      console.log(err)
    }
    res.render('class/edit', {classes: foundClass})
  })
})

// UPDATE
router.put('/:id', isLoggedIn, function (req, res) {
    // get data from form and add to Class array

  const disetujui = Boolean(req.body.disetujui)
  Class.findByIdAndUpdate(req.params.id, {$set:{disetujui:disetujui}}, function (err, updatedClass) {
    if (err) {
      res.redirect('back')
    } else {
      res.redirect('/admin/class/' + updatedClass._id)
    }
  })
})

// DESTROY
router.delete('/:id', isLoggedIn, function (req, res) {
  Class.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect('/admin/class')
    } else {
      res.redirect('/admin/class')
    }
  })
})

module.exports = router
