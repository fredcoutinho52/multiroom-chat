const io = require("socket.io")(3000);

const users = {};

// estabelecendo conexão
io.on("connection", socket => {
  // escutando conexão de novos usuários
  socket.on("new-user", username => {
    users[socket.id] = username;
    socket.broadcast.emit("user-connected", username);
  });

  // escutando envio de mensagem
  socket.on("send-chat-message", message => {
    socket.broadcast.emit("chat-message", { message: message, username: users[socket.id]});
  });

  // escutando desconexão de usuários
  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
  });
});