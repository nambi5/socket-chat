  
  const msgerForm = get(".msger-inputarea");
  const msgerInput = get(".msger-input");
  const msgerChat = get(".msger-chat");
  
  const BOT_MSGS = [
    "Hi, how are you?",
    "Ohh... I can't understand what you trying to say. Sorry!",
    "I like to play games... But I don't know how to play!",
    "Sorry if my answers are not relevant. :))",
    "I feel sleepy! :("
  ];
  
  // Icons made by Freepik from www.flaticon.com
  const BOT_IMG = "https://image.flaticon.com/icons/svg/327/327779.svg";
  const PERSON_IMG = "https://image.flaticon.com/icons/svg/145/145867.svg";
  const BOT_NAME = "BOT";
  const PERSON_NAME = "Sajad";
  
  msgerForm?.addEventListener("submit", ev => {
    ev.preventDefault();
    
    const msgText = msgerInput.value;
    if (!msgText) return;
    socket.emit('message', msgText);
    // appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
    msgerInput.value = "";
    
    // botResponse();
  });
  
  function appendMessage(name, text, time, side,img) {
    //   Simple solution for small apps
    const msgHTML = `
    <div class="msg ${side}-msg">
    <div class="msg-img" style="background-image: url(${img})"></div>
    
    <div class="msg-bubble">
    <div class="msg-info">
    <div class="msg-info-name">${name}</div>
    <div class="msg-info-time">${time}</div>
    </div>
    
    <div class="msg-text">${text}</div>
    </div>
    </div>
    `;
    
    msgerChat.insertAdjacentHTML("beforeend", msgHTML);
    msgerChat.scrollTop += 500;
  }
  
  function botResponse() {
    const r = random(0, BOT_MSGS.length - 1);
    const msgText = BOT_MSGS[r];
    const delay = msgText.split(" ").length * 100;
    
    setTimeout(() => {
      appendMessage(BOT_NAME, BOT_IMG, "left", msgText);
    }, delay);
  }
  

// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


// Socket stuff
myUserId = "";
const socket = io({forceNew:false});
// const username="Brad";const room="Dummy"
// socket.emit('joinRoom', { username, room });
// socket.join(scoket.id);
socket.emit('newConnect');
myUserId = socket.id;
socket.on('message',(message)=>{
  console.log(message,socket.id);  
  let side = 'right';
  let img = PERSON_IMG;
  if(message.username != socket.id){
    side = 'left'
    img = BOT_IMG;
  }
  
  appendMessage(message.username, message.text, message.time, side, img);
});
