const request = require('request')
const notifier = require('node-notifier');
const open = require('open');
const franc = require('franc')
var express = require('express')
var app=express()
var bodyParser = require("body-parser")
server = app.listen(process.env.PORT || 3000, listening)

const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require ('util');
const creds = require('./client_secret.json')


app.use(bodyParser.urlencoded({ extended: true }));


app.get('/spreed',async (req,res)=>{

  const doc = new GoogleSpreadsheet('1sF19-ABGrMtkhOji4cqAzBBrCRvW49Vj7lfy6Q6zQAA')
  await promisify (doc.useServiceAccountAuth)(creds);
  const info = await promisify(doc.getInfo)();
   
  const sheet = info.worksheets[0];

  const row={
     	message: req.query.id   	
  }
  await promisify(sheet.addRow)(row);
   
  res.json({})
})
app.get('/res',async (req,res)=>{

  const doc = new GoogleSpreadsheet("spreadsheet_id")
  await promisify (doc.useServiceAccountAuth)(creds);
  const info = await promisify(doc.getInfo)();

  const sheet = info.worksheets[0];
  const rows= await promisify(sheet.getRows)({
        offset: 1
  });
  var list=[]
  rows.forEach(row=>{
	list.push(row);
  })
  //await promisify(sheet.addRow)(row);
  

  res.json(list)
})



function listening(){
  console.log("connected!")
}


