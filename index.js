const Discord = require("discord.js");
//module Discord ระบบหลักของบอทนะจ๊ะ
const config = require(`./botconfig/config.json`);
//ข้อมูลการตั้งค่า
const settings = require(`./botconfig/settings.json`);
//ข้อมูลการตั้งค่า 2
const filters = require(`./botconfig/filters.json`);
//Data bassboost
const colors = require("colors");
//module ตั่งสี 
const Enmap = require("enmap");
const libsodium = require("libsodium-wrappers");
const ffmpeg = require("ffmpeg-static");
const voice = require("@discordjs/voice");
const DisTube = require("distube").default;
//DisTube module คือตัวเล่นเพลงนะ ถ้าไม่ใส่ api
const https = require('https-proxy-agent');
const client = new Discord.Client({
    shards: "auto",
    allowedMentions: {
      parse: [ ],
      repliedUser: false,
    },
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    intents: [ 
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    ],
    //อันนี้ไม่ใช่ stats bot ไอบ้า
    presence: {
      activity: {
        name: `เชี้ยย คนอ่านหน้ารักอ่ะ`, 
        type: "PLAYING", 
      },
      status: "online"
    }
});
//BOT CODED BY: Tomato#6966
//Gui TH By KCCH
//update 2022 now i Love vs code
//vs code is good
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
let spotifyoptions = {
  parallel: true,
  emitEventsAfterFetching: true,
}
if(config.spotify_api.enabled){
  spotifyoptions.api = {
    clientId: config.spotify_api.clientId,
    clientSecret: config.spotify_api.clientSecret,
  }
}
client.distube = new DisTube(client, {
  emitNewSongOnly: false,
  leaveOnEmpty: true,
  leaveOnFinish: true,
  leaveOnStop: true,
  savePreviousSongs: true,
  emitAddSongWhenCreatingQueue: false,
  searchSongs: 0,
  youtubeCookie: config.youtubeCookie,
  nsfw: true,
  emptyCooldown: 25,
  ytdlOptions: {
    highWaterMark: 1024 * 1024 * 64,
    quality: "highestaudio",
    format: "audioonly",
    liveBuffer: 60000,
    dlChunkSize: 1024 * 1024 * 64,
  },
  youtubeDL: true,
  updateYouTubeDL: true,
  customFilters: filters,
  plugins: [
    new SpotifyPlugin(spotifyoptions),
    new SoundCloudPlugin()
  ]
})





client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = require("fs").readdirSync(`./commands`);
client.allEmojis = require("./botconfig/emojis.json");
client.setMaxListeners(100); require('events').defaultMaxListeners = 100;
client.settings = new Enmap({ name: "settings",dataDir: "./databases/settings"});
client.infos = new Enmap({ name: "infos", dataDir: "./databases/infos"});
["events", "commands", "slashCommands", settings.antiCrash ? "antiCrash" : null, "distubeEvent"]
    .filter(Boolean)
    .forEach(h => {
        require(`./handlers/${h}`)(client);
    })|| config.token
client.login(process.env.token || config.token) //login ผ่าน Token 




//หน้าเว็บ

 client.on("ready", () => {
  require("./dashboard/index.js")(client);
 })







//อัพเดท code
console.log('<------------------------------------->')
console.log(' อัพเดท code วันที่ 29 เดือน ธันวาคม ปี 2564')
console.log('<------------------------------------->')
