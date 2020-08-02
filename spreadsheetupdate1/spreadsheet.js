/*const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');
const creds = require('./client_secret.json');

async function accessSpreadsheet()
{
	const doc=new GoogleSpreadsheet('1sF19-ABGrMtkhOji4cqAzBBrCRvW49Vj7lfy6Q6zQAA');
	await promisify(doc.useServiceAccountAuth)(creds);
	const info = await promisify(doc.getInfo)();
	const sheet = info.worksheets[0];
	console.log(`Title: ${sheet.title},Rows: ${sheet.rowCount}`);
	const row={
     	message: 'brent'   	
	}
	await promisify(sheet.addRow)(row);
}
accessSpreadsheet();*/
const request = require('request')
const notifier = require('node-notifier');
const open = require('open');
const franc = require('franc')
var express = require('express')
var app=express()
var bodyParser = require("body-parser")
server = app.listen(process.env.PORT || 3000, listening)
//const apikey = 'kLFyyPexKK4ad5DFNO7FQ2OwC'
//const apiSecretKey = 'RPc7PkuVozbYlYWVWaeuns0xs4BFkUQxKd67Z2TKgmy7TTv2X5'
//const accessToken = '2606595998-RapcfnBC62X3CqhitK4nFjQ8FsLxMFRUsrwYUqs'
//const accessTokenSecret = 'j0LTYDeK20lBz7bCLoNcLhe2HiUqFhOeFYUZgxTVyKWJD'

//////SpreadSheet requirements
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

  const doc = new GoogleSpreadsheet('1sF19-ABGrMtkhOji4cqAzBBrCRvW49Vj7lfy6Q6zQAA')
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


