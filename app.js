const http = require("http")

const server = http.createServer((req, res)=>{
    if(req.url === "/"){
        const { fork } = require('child_process');
        const child = fork('./getCount.js');

        child.on('message', (message) => {
            // console.log('Returning /total results');
            res.setHeader("Access-Control-Allow-Origin", "*")
            res.setHeader("Content-Type", "application/json")
            res.write(JSON.stringify({name: message}))
            res.end()
        });
        child.send('START');
    }
})






server.listen(1000)