const express = require('express')
const app = express()
const port = 2194
var cors = require('cors');
const queueModel = require("./models/queModel")
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/queue', { useNewUrlParser: true });
// mongoose.connect('mongodb+srv://sayil:sayil2194@cluster0-myd1t.mongodb.net/test?retryWrites=true&w=majority')
const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => res.send('Hello World!'))

app.post("/save", (req, res) => {
    res.send("working")

    let newQueue = new queueModel({
        queueId: `${req.body.id}${req.body.name}`
    })
    console.log(newQueue)
    newQueue.save(function (err, data) {
        if (err)
            console.log("err")
        else {
            console.log("saved")
        }
    })

})
app.get("/getID", (req, res) => {
    queueModel.find({onQueue:true},(err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.send(data)
        }
    })
})
app.post("/delete", (req, res) => {
    console.log(req.body)
    let id = req.body.id
    if (mongoose.Types.ObjectId.isValid(id)) {
        queueModel.findByIdAndUpdate(id, {onQueue:false}, { new: true }).then((docs) => {
            if (docs) {
                res.send({ success: true, data: docs });
            } else {
                res.send({ success: false, data: "no such user exist" });
            }
        }).catch((err) => {
            res.send(err);
        })
    } else {
        res.send({ success: "false", data: "provide correct key" });
    }
    // queueModel.up   ((err, data)=>{
    //     if (err){
    //         res.send(err)
    //     }
    //     else {
    //         res.send("deleted")
    //     }
    // })
})

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))