const express = require("express");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/error");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");
const PORT = process.env.PORT || 4000;

connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



const app = express();
app.use(cors({
  origin: 'https://social-media-app-mern-swart.vercel.app', // Replace with the origin of your frontend application
  credentials: true ,
  // Allow credentials (cookies) to be sent and received
}));
const server = app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});

// ============= socket.io ==============
const io = require("socket.io")(server, {
  cors: {
    origin: "https://social-media-app-mern-swart.vercel.app",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("🚀 Someone connected!");
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("sendMessage", ({ senderId, receiverId, content }) => {
    const user = getUser(receiverId);
    io.to(user?.socketId).emit("getMessage", {
      senderId,
      content,
    });
  });

  socket.on("typing", ({ senderId, receiverId }) => {
    const user = getUser(receiverId);
    io.to(user?.socketId).emit("typing", senderId);
  });

  socket.on("typing stop", ({ senderId, receiverId }) => {
    const user = getUser(receiverId);
    io.to(user?.socketId).emit("typing stop", senderId);
  });

  socket.on("disconnect", () => {
    console.log("⚠️ Someone disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());
app.use("/public", express.static("public"));

if (process.env.NODE_ENV != "production") {
  require("dotenv").config({ path: "./config/config.env" });
}
app.get('/',(req,res)=>{
  res.send('Server is running')
})
// import routes
const post = require("./routes/postRoute");
const user = require("./routes/userRoute");
const chat = require("./routes/chatRoute");
const message = require("./routes/messageRoute");

app.use("/api/v1", post);
app.use("/api/v1", user);
app.use("/api/v1", chat);
app.use("/api/v1", message);




// error middleware
app.use(errorMiddleware);

module.exports = app;
