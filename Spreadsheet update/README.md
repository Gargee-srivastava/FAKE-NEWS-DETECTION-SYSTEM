# Google spreadsheet update api 
This api is used to save the details from Whatsapp bot.

# technology stack
Node js

# working
  It will automatically update google spreadsheet and also send data to website
  
  
# Deployment

Clone the repository
```bash
git clone https://github.com/Gargee-srivastava/RK304_Techclans.git
cd RK304_Techclans/Spreadsheet\ update
```

This api will be deployed in Heroku. So, Login to [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli). After that follow these steps from command line now

```bash
git init
heroku git:remote -a spreadsheetupdate1
git add .
git git commit -am "commit"
git push heroku master
```

So, this will be the api's for requesting in the spreadsheet where `{text}` will be replaced by message given by user to bot.
* POST request(update sheet) : https://spreadsheetupdate1.herokuapp.com/spreed?id={text}
* GET (retrive data) : https://spreadsheetupdate1.herokuapp.com/res