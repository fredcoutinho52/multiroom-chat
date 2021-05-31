const socket = io("http://localhost:3000");

const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

// capturando nome de usuário
const username = prompt("Qual seu nome?");
appendMessage("Você entrou!");
socket.emit("new-user", username);

// escutando mensagem do outro usuário
socket.on("chat-message", data => {
  appendMessage(`${data.username}: ${data.message}`);
});

// escutando conexão de novos usuários
socket.on("user-connected", username => {
  appendMessage(`${username} entrou!`);
});

// escutando desconexão de usuários
socket.on("user-disconnected", username => {
  appendMessage(`${username} saiu :(`);
});

// enviando mensagem
messageForm.addEventListener("submit", e => {
  e.preventDefault();

  const message = messageInput.value
  appendMessage(`Você: ${message}`);
  socket.emit("send-chat-message", message);
  messageInput.value = "";
});

// inserindo mensagem na página
function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}