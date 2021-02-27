var express = require('express')
var router = express.Router()

router.get('/getmusic', (req, res) => {

  res.json({
    music: 'clasical'
  })
})

module.exports = router