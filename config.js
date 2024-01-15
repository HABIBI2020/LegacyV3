import dotenv from 'dotenv';
dotenv.config();

import { fileURLToPath } from "url";
import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import moment from 'moment-timezone';
moment.tz.setDefault("Asia/kuala lumpur").locale("id")

const sekarang = moment.tz('Asia/kuala lumpur').format('dddd, DD MMMM YYYY')

export default {
	options: {
      public: true,
      antiCall: true, // reject call
      autoread: true, // auto read message
      database: "mongodb+srv://DARKSHAN:3000@cluster0.t1wsjlv.mongodb.net/
", // End .json when using JSON database or use Mongo URI
      owner: ["60148949775"], // set owner number on here
      pairing: "",
      sessionName: "SESSION_04_49_01_15_eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0NZQmFNelc5c3VJaWNFV2pVb0NPZmRiaUFTK2Nxb2Era1pFZ1ZYMlExRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTGlKdHNmUXBpTHRXQW9mVXV2U0RxcnU1VmF6QktpUm0zWEd5WXFHU2Z4ST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwRVhQbVpVTTlQVVJZNzF4NGpzMWtvQkl6OFBweVk5c1IreEdmR0FucUVzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI1MWtlaUtIUG9TSXEraXI2SkF1cUt6OFNIb3pROUpObkd4cnltMkpUUW5NPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtCc0tGU1FwZmxONWxjQ2VYOWk0RFp2Uk0yN3V1U0NKN2lvRzYxa2hCbWc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1MTTJib0VMSzFVaTlIclRVZTMwMkNJdUYwQm5nNFBHNlZkcnE0dmFhQ1U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0h6UHJKaFJPSDJNY3g2aXBtSzBKUDJyTkxnVjNmRzc2V09ab3NUanZFZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMCttc2pNZmVpcm12aU01cWpKSStQMWF5SDZHMU5hcTNSOTFoMk53RDNCMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJzRDhXeXhGem50WUJCVnpleFg2YjgxRWMxeDZ2b0hWdFVCTlR4bjJ5N0lEQzRDZm90RUgzQ3NZK0NWUDQ3V2RTK2hWcm5IVmNXUWcxbXd1VEJPMWl3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQwLCJhZHZTZWNyZXRLZXkiOiJiU29RZ040d0pwOUxLSmxIZEdiOFp2bUN1WnBDY3psV2hpc0VxbXhzb2tnPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJJNU1ZenBnR1I2MmNDN3VUb01yY1h3IiwicGhvbmVJZCI6IjhmYzliMWExLTU4YTktNDRiOC04OTg2LWI0ZmYwNTc3NmUxMCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3bjcrdWdPUHd4Vjk3RGxHMHdCSmUySytkTVU9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid1R4Ynp5cFdPYVJEeURXbStZVDNKSENGWFowPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlpQMUdGM1NZIiwibWUiOnsiaWQiOiI2MDE0ODk0OTc3NTo5QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IvCfh7Lwn4e+QW5hRmlx8J+HtfCfh7gifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ00zaDd5OFE0dktTclFZWUN5QUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlN2T0Z4S3R6aTdTT2Z5QjU5Q0dCYmd4eEZ3RVBXMzliRzlEY2E2d0VlWHc9IiwiYWNjb3VudFNpZ25hdHVyZSI6InpUT2dhZ0Q2eWd6U1pHTm9lT0o4K0RndHZDS0N4dE9iZkJraG40ZlVJOFQ5Vi82ZGppRU5SY0wxRS9rZ0JCNFcrTlM3bjRmNnQyZ0hKMUZTcVdxWEFnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiIyaktROTRGcFplOFNZaTRoNHVORHFhVVI3YWdWdFpVYU94aTNjTEpLdGN3Z1RTWlRESFVvN3VwQWxQU3VibmZjMTFLYlcxTithQ3J0cVFCaHAybE9pZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjYwMTQ4OTQ5Nzc1OjlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVXJ6aGNTcmM0dTBqbjhnZWZRaGdXNE1jUmNCRDF0L1d4dlEzR3VzQkhsOCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcwNTI5NDE4MiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFKZlAifQ==", // for name session
      prefix: /^[°•π÷×¶∆£¢€¥®™+✓_|/~!?@#%^&.©^]/i,
      pairingNumber: "60148949775", // Example Input : 62xxx
      pathPlugins: "plugins",
      wm: "*Source:* https://apiruulzz.my.id"
   },
   
   // Function Maybee
   reloadFile: (path) => reloadFile(path),
   
   // Rest APIs Cuy
   APIs: {
   	rull: "https://apiruulzz.my.id"
   },
   
   APIKeys: {
   	"https://apiruulzz.my.id": process.env.APIKEY || "rulz"
   },
   
   // Set pack name sticker on here
   Exif: {
      wm: "Rulzz",
      packId: "https://apiruulzz.my.id",
      packName: null,
      packPublish: '         Rulz. - Assistant\n      ——————————————\n\nCreated on date:\n' + sekarang,
      packEmail: "rullskeyy@gmail.com",
      packWebsite: "https://apiruulzz.my.id",
      androidApp: "https://play.google.com/store/apps/details?id=com.bitsmedia.android.muslimpro",
      iOSApp: "https://apps.apple.com/id/app/muslim-pro-al-quran-adzan/id388389451?|=id",
      emojis: [],
      isAvatar: 0,
   },

   // message  response awikwok there
   msg: {
      owner: "Features can only be accessed owner!",
      group: "Features only accessible in group!",
      private: "Features only accessible private chat!",
      admin: "Features can only be accessed by group admin!",
      botAdmin: "Bot is not admin, can't use the features!",
      bot: "Features only accessible by me",
      media: "Reply media...",
      query: "Enter Query!",
      noUrl: "please input a url.",
      error: "An error occurred while retrieving data.",
      quoted: "Reply message...",
      wait: "Wait a minute...",
      urlInvalid: "Url Invalid",
      notFound: "Result Not Found!",
      premium: "Premium Only Features!"
   }
};

async function reloadFile(file) {
  let fileP = fileURLToPath(file);
  fs.watchFile(fileP, () => {
    fs.unwatchFile(fileP);
    console.log(chalk.green(`[ UPDATE ] file => "${fileP}"`));
    import(`${file}?update=${Date.now()}`);
  });
}

reloadFile(import.meta.url);
