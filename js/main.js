// initialize websockets:
var ws_uri = "ws://[your-domain]:9600";
var websocket = new WebSocket(ws_uri);


// chat messages container:
var chat_messages = document.getElementById("chat-messages");


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

    console.error(event);
};


// on websocket message received:
websocket.onmessage = function(event) {
    var data = JSON.parse(event.data);

    if (data.type == "message") {
        if (data.message.utf8Data) {
            data.message = JSON.parse(data.message.utf8Data).message;
        }

        MessageAdd('<div class="message">' + data.username + ': ' + data.message + '</div>');
    }
};


// on chat form submit:
document.getElementById("chat-form").addEventListener("submit", function(event) {
    event.preventDefault();

    var message_element = document.getElementsByTagName("input")[0];
    var message = message_element.value;

    var data = {
        type: "message",
        username: "You",
        message: message
    };

    websocket.send(JSON.stringify(data));

    message_element.value = "";
}, false);


// add message to chat:
function MessageAdd(message) {
    chat_messages.insertAdjacentHTML("beforeend", message);
    chat_messages.scrollTop = chat_messages.scrollHeight;
}
