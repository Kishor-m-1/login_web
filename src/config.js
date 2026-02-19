const mongoose =require('mongoose');

const connect =mongoose.connect("mongodb://localhost:27017/dbconnect");

connect.then(()=>{
    console.log("Data base connected successfully");
})
.catch(()=>{
    console.log("Cannot connect");
})
const loginschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: ({
        type: String,
        required: true
    }),
    email: ({
        type: String,
        required: true
    }),
    dob: ({
        type: String,
        required: true
    })
});
const collection= new mongoose.model("login",loginschema);
module.exports = collection;