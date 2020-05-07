// initialize websockets:
var ws_uri = "ws://127.0.0.1:9600";
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
    var data = JSON.parse(event.data);

    if (data.type == "message") {
        MessageAdd('<div class="message">' + data.username + ': ' + data.message + '</div>');
    }
};


// on chat form submit:
document.getElementById("chat-form").addEventListener("submit", function(event) {
    event.preventDefault();

    var message_element = document.getElementsByTagName("input")[0];
    var message = message_element.value;

    if (message.toString().length) {
        var data = {
            type: "message",
            username: "You",
            message: message
        };

        websocket.send(JSON.stringify(data));

        message_element.value = "";
    }
}, false);


// add message to chat:
function MessageAdd(message) {
    var chat_messages = document.getElementById("chat-messages");

    chat_messages.insertAdjacentHTML("beforeend", message);
    chat_messages.scrollTop = chat_messages.scrollHeight;
}
