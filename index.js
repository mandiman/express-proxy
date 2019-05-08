
// Constants
const express = require('express')
const app = express()
const PORT = 3024
const HOST = '0.0.0.0'
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
   hosts: [ '']
});
client.ping({
    requestTimeout: 30000,
}, function(error) {
    if (error) {
        console.error('elasticsearch cluster is down!');
    } else {
        console.log('Everything is ok');
    }
});
app.use(express.json())
app.get('/api', (req, res) => (
    setTimeout(
        () => {
            let query = req.query;
            
            console.log( req.query),
            client.search(
                query
            ).then(response =>
                res.send(response)
            )
            .catch(error => console.log(error))
    }, 5000)
    )
)

app.listen(HOST, PORT, () => console.log(`Running on http://${HOST}:${PORT}`))