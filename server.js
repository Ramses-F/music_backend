const http = require('http');
const app = require('./app')
const port = 3006;
app.set(port, process.env.PORT || port);
const server = http.createServer(app);


server.listen(process.env.PORT || port,()=>{
    console.log(`le server demarre sur le port ${port}`)
});

// allez dans le app.js tout est deja expliquer