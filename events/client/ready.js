const config = require("../../botconfig/config.json")
const { change_status } = require("../../handlers/functions");
module.exports = client => {
  try{
    try{
      const stringlength = 69;
      console.log("\n")
      console.log(`      `.bold.brightGreen + `บอทเริ่มการทำงานแล้ว`.bold.brightGreen + " ".repeat(-1+stringlength-` `.length-`Discord Bot is online!
      `.length)+ "".bold.brightGreen)
      console.log(`      `.bold.brightGreen + ` บอทที่ทำงาน --> ${client.user.tag}  `.bold.brightGreen+ " ".repeat(-1+stringlength-` `.length-`  ${client.user.tag} `.length)+ "".bold.brightGreen)
    }catch{ /* */ }
    change_status(client);
    setInterval(()=>{
      change_status(client);
    }, 15 * 1000);
  
  } catch (e){
    console.log(String(e.stack).grey.italic.dim.bgRed)
  }
}

