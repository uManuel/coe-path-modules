process.env.UV_THREADPOOL_SIZE = 1;
const cluster = require('cluster');

if(cluster.isMaster){

    // My macbook only can take advantage when creating 4 children, because of my 4 quad processor that's why using more than 4 It's 
    cluster.fork();
    cluster.fork();
    cluster.fork();
    cluster.fork();

    // cluster.fork();
    // cluster.fork();
    // cluster.fork();
    // cluster.fork();
}else{
    // Simple express app
    const express = require('express');
    const crypto = require('crypto');
    const app = express();

    app.get('/', (req, res) => {
        crypto.pbkdf2('a','b',100000,512,'sha512',()=>{
            res.send('Hello World');
        });
    });

    app.get('/fast', (req, res) => {
        res.send('Fast response');
    });

    app.listen(3000);
}