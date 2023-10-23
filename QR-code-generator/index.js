const express = require("express");
const qrCode = require("qrcode");
//jimp => read or parse the image
const jimp  = require("jimp");
// qr code reader=> decode the image to get value and final decrypted message
const qrCodeReader =require("qrcode-reader");
const fs = require("fs");


const app = express();

// toFile method: converts text to qr code and saves it in a png file 
// qrCode.toFile("./newFile.png","this is text that I want to get converted into QR code", (err, url) => {
//     if(err) {
//         throw  err;
//     }
//     console.log(url);
// })




// let svgData;
//convert to svg

// qrCode.toString("Convert text to qr code image in svg format", {
//     type:"svg"
// }, (err,data )=> {
// if(err) throw err;
// svgData = data;
// });


// console.log(svgData)

// qrCode.toFile("./newFile.svg", svgData, (err, url) => {
//     if(err) throw err;

//     console.log(url);
// })


//render qr code on terminal
// qrCode.toString("Convert text to qr code image on my vs code terminal", {
// type: "terminal"
// }, (err,data )=> {
// if(err) throw err;

// // here data => contains the image of qr code which will be rendered in terminal
// console.log(data);
// });



//Start parsing the image 
// read the image file
const imageBuffer = fs.readFileSync("./newFile.png");

jimp.read(imageBuffer, (err, image) => {
    if(err) throw err;

    // create new  qr reader instance
    const qrInst = new qrCodeReader();

    //called when the image is decoded
    qrInst.callback = (err, value) => {
        if(err) throw err;

        //decrypted message 
        console.log("message after decryption");
        console.log(value.result);
    };

    //decode the image
    console.log("message before decryption")
    qrInst.decode(image.bitmap);


})

app.listen(3000, ()=> {
    console.log("server is listening on port 3000");
})