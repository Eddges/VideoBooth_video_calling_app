const express = require('express')
const { v4 : uuidv4 } = require('uuid')
const fs = require('fs')
const io = require('../index')

const landingRouter = express.Router()

let id = '';

landingRouter.route('/')
.get((req, res, next) => {

})


landingRouter.route('/:roomId')
.get((req, res, next) => {
    console.log(req.params.roomId)
    res.statusCode = 200
    id = req.params.roomId
    console.log('id : ' + id)
    module.exports = id
    res.render('room', {roomId : req.params.roomId})
})


console.log()

module.exports = landingRouter