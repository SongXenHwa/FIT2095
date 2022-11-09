const express = require( 'express');
const app = express();
const morgan = require("morgan");
const ejs = require("ejs");

app.engine("html", ejs.renderFile);
app.set("view engine", "html");

app.use(express.urlencoded({ extended: false }));
app.use(morgan("common"));
app.listen(8080);

const mongoose = require('mongoose');
let url = 'mongodb://localhost:27017/lab6';

app.use(express.static('views'));
app.use(express.static('img'));

const Doctor = require('./model/doctor');
const Patient = require('./model/patient');

mongoose.connect(url, function(err){
    if(err){
        console.log('Error in Mongoose connection');
        throw err;
    }
});

// let doctor1 = new Doctor({
//     _id: new mongoose.Types.ObjectId(),
//     fullname: {firstName: 'uhawci', lastName: 'bds'},
//     dob: '2000-06-06',
//     address: {state: 'VIC', suburb: 'wxefawe', street: 'awmweesf', unit: '5'},
//     numPatients: '21'
// })

// doctor1.save(function(err){
//     if(err){
//         console.log("Error in saving");
//         throw err;
//     }
// })

// let patient1 = new Patient({
//     _id: new mongoose.Types.ObjectId(),
//     fullname: 'hawhefinbajwfena;f',
//     doctorid: doctor1._id,
//     age: '111',
//     caseDesc: 'homie is fine'
// })

// patient1.save(function(err){
//     if(err){
//         console.log("Error in saving p");
//         throw err;
//     }
// })


app.get("/", function (req, res) {
    res.render("index");
  });

app.get("/insertDoc", function (req, res) {
res.render("insertDoc");
});

app.get("/insertPat", function (req, res) {
res.render("insertPat");
});

app.get("/delPat", function (req, res) {
res.render("delPat");
});

app.get("/updateDoc", function (req, res) {
res.render("updateDoc");
});

app.post("/addDoc", function (req, res) {
    console.log(req.body.unit)
    let doctor1 = new Doctor({
        _id: new mongoose.Types.ObjectId(),
        fullname: {
            firstName: req.body.firstName,
            lastName: req.body.lastName},
        dob: req.body.dob,
        address: {
            state: req.body.state,
            suburb: req.body.suburb,
            street: req.body.street,
            unit: req.body.unit,
        },
        numPatients: req.body.numPatients,
    })
    
    // if (req.body.firstName == null || doctor1.address.state.validate())
    doctor1.save(function(err){
        if(err){
            res.render("invalidData");
        }else{
            res.redirect("/getDoc");
        }
    })
});

app.post("/addPat", function (req, res) {
    let patient1 = new Patient({
        _id: new mongoose.Types.ObjectId(),
        fullname: req.body.fullName,
        doctorid: req.body.doctorId,
        dov: req.body.dov,
        age: req.body.age,
        caseDesc: req.body.caseDesc,

    })

    Doctor.updateOne({ '_id': req.body.doctorId }, { $inc: { 'numPatients': 1 } }, function (err, doc) {
        // console.log("shessshhhh");
    });
    
    patient1.save(function(err){
        if(err){
            res.render("invalidData");
        } else{
            
            res.redirect("getPat"); 
        }
    })
});

app.get("/getDoc",function(req, res){
    Doctor.find({},function(err,obj){
        res.render("getDoc",{db:obj});
    });
});

app.get("/getPat",function(req, res){
    Patient.find({}).populate('doctorid').exec(function (err, data) {
        res.render("getPat",{db:data});
     });
});

app.post("/delPat",function(req,res){
    Patient.deleteOne({ 'fullname': req.body.fullName }, function (err, doc) {
        // console.log(doc);
    });
    res.redirect("getPat");
})

app.post("/updateDoc",function(req,res){
    Doctor.updateOne({ '_id': req.body.doctorid }, { $set: { 'numPatients': req.body.numPatients } }, function (err, doc) {
        // console.log("shessshhhh");
    });
    res.redirect("getDoc");
})