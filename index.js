const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const landingRouter = require('./routes/landingRouter')
const roomsRouter = require('./routes/roomRouter')
const { v4 : uuidv4 } = require('uuid')

const app = express()
const PORT = process.env.PORT || 3000

const server = http.createServer(app)
const io = socketio(server)


app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res, next) => {
    res.redirect(`${newid = uuidv4()}`)
})

app.get('/:roomId', (req, res, next) => {
    res.statusCode = 200
    id = req.params.roomId
    res.render('room', {roomId : req.params.roomId})
})


io.on('connection', socket => {
    console.log('New websocket connection')
    socket.on('joinRoom', (roomId, userId) => {
        socket.join(roomId)
        console.log('roomIds join')
        socket.to(roomId).broadcast.emit('userConnected', userId)
    })
})

server.listen(PORT, () => {
    console.log('Server running on PORT ', PORT)
})