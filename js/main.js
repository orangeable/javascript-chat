// initialize websockets:
var ws_uri = "wss://127.0.0.1:9600";
var websocket = new WebSocket(ws_uri);


// on websocket open:
websocket.onopen = function(event) {
    MessageAdd('<div class="message green">You have entered the chat room.</div>');
};


// on websocket close:
websocket.onclose = function(event) {
    MessageAdd('<div class="message blue">You have been disconnected.</div>');
};


// on websocket error:
websocket.onerror = function(event) {
    MessageAdd('<div class="message red">Connection to chat failed.</div>');
};


// on websocket message received:
websocket.onmessage = function(event) {
    let data = JSON.parse(event.data);

    if (data.type == "message") {
        MessageAdd('<div class="message">' + data.username + ': ' + data.message + '</div>');
    }
};


// on chat form submit:
document.getElementById("chat-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let message_element = document.getElementsByTagName("input")[0];
    let message = message_element.value;

    if (message.toString().length) {
        let username = localStorage.getItem("username");

        let data = {
            type: "message",
            username: username,
            message: message
        };

        websocket.send(JSON.stringify(data));
        message_element.value = "";
    }
}, false);


// add message to chat:
function MessageAdd(message) {
    let chat_messages = document.getElementById("chat-messages");

    chat_messages.insertAdjacentHTML("beforeend", message);
    chat_messages.scrollTop = chat_messages.scrollHeight;
}


// create your username:
function Username() {
	let username = window.prompt("Enter your username:", "");

	if (username.toString().length > 2) {
		localStorage.setItem("username", username);
	}
	else {
		alert("Your username must be at least two characters.");
		Username();
	}
}

Username();
