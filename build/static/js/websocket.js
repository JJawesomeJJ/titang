var web="ws://39.108.236.127:9502";
var websocket=new WebSocket(web);
websocket.onopen=function (evt) {
    console.log("连接成功");
    websocket.send(JSON.stringify(
        {
            'username':,
            'type':'init'
        }
    ));
}
websocket.onclose=function (evt) {
    console.log("关闭");
}
websocket.onmessage=function (evt) {
    alert(evt.data);
}
websocket.onerror=function (evt,e) {
    console.log('eorro');
}