const { scrapProduct } = require("./scrapProduct")

const cron = require('node-cron');
const nodemailer = require('nodemailer');
const open = require('open');
require('events').EventEmitter.defaultMaxListeners = 15;


const urls = [
  "https://www.auchan.fr/sony-console-ps5-edition-standard/p-c1315865",
  "https://www.fnac.com/Console-Sony-PS5-Edition-Standard/a14119956/",
  "https://www.cdiscount.com/jeux-pc-video-console/ps5/console-ps5-sony-ps5/f-1035001-son3665540797413.html",
  "https://www.micromania.fr/playstation-5-105642.html",
  "https://www.amazon.fr/gp/product/B08H93ZRK9/",
  "https://www.amazon.co.uk/PlayStation-9395003-5-Console/dp/B08H95Y452/",
  "https://www.amazon.de/Sony-Interactive-Entertainment-PlayStation-5/dp/B08H93ZRK9/",
  "https://www.amazon.es/Consola-PlayStation-5/dp/B08KKJ37F7/",
  "https://www.amazon.it/dp/B08KKJ37F7/",
  "https://www.boulanger.com/ref/1147567",
  "https://www.darty.com/nav/achat/informatique/ps4/consoles_ps4/sony_sony_ps5_standard__4876148.html",
  "https://www.cultura.com/playstation-5-edition-standard-0711719395201.html"

]
let url = "https://www.cultura.com/sony-casque-pulse-ps5-0711719387800.html"

const checkWebsite = async (url) => {
  let result = await scrapProduct(url)
  console.log(result)

  if (result) {
    console.log("dispo!!!!")
    console.log("\007")

    open(url);

    try {
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'gotps5test@gmail.com',
          pass: 'poiuyt098765'
        }
      });

      const mailOptions = {
        from: 'gotps5test@gmail.com',
        to: 'gautier.mille@gmail.com, alexandre.flament@icloud.com, demian.ortega.m@gmail.com ',
        subject: 'PS5 dispo!!!!',
        text: result
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    }
    catch (e) { console.log(e) }
  }
  else {
    console.log("-_-' pas dispo")
  }
}
cron.schedule('* * * * *', () => {
  for (url of urls) {
    checkWebsite(url)
  }
})

