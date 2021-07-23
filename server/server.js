const express=require('express')
const app=express();
const connectDB=require('./config/db')
const cors=require('cors');
const cookieParser = require('cookie-parser');
const soketio = require('socket.io');
const http = require('http');
const router = require('./router');
//connect database
connectDB();
app.use(cookieParser())
//this is impt other wise req.body will be undefined
app.use(express.json())
app.use(cors({ origin: ' http://localhost:3000', credentials: true }));


app.get('/',(req,res)=>res.json('apirunning'))
// app.use('/api/cookie',require('./routes/api/cookie'));
app.use('/api/users',require('./routes/api/users'));

app.use('/api/login',require('./routes/api/authlogin'))
app.use(cookieParser());
const PORT=process.env.PORT||5000







const { addUser, removeUser, getUser, getUsersInRoom } = require('./user.js');





const server = http.createServer(app);
const io = soketio(server);

io.on('connection', (socket) => {

    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room});

        if(error) {
            return callback(error);
        }

        socket.emit('message', {user: 'admin', text: `${user.name}, welcome to the room ${user.room}`});
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined ${user.room}.`});

        socket.join(user.room);

        io.to(user.room).emit('roomData',{ room: user.room, users: getUsersInRoom(user,room)});

        callback();
    });
    // get message
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        
        if (message.type == "file"){
            io.to(user.room).emit('message', { user: user.name, ...message});
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});    
        } else {
            io.to(user.room).emit('message', { user: user.name, text: message});
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});    
        }
        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
         
        if(user) {
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.`});
        }
    })
});

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));













