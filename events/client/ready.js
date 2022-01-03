const config = require("../../botconfig/config.json");
const { change_status } = require("../../handlers/functions");
module.exports = client => {
  try{
    try{
      const stringlength = 69;
      console.log("\n")
      console.log(`                      เข้าสู่ระบบ  ${client.user.tag}`)
      console.log("\n")
      console.log("VVV ห้ามลบนะคับ VVV")
      console.log("Code By Tomato6966")
      console.log("EDIT code by KCCH dev")
      console.log("Fix bug by KCCH dev")
      
    }catch{ /* */ }
    change_status(client);
    setInterval(()=>{
      change_status(client);
    }, 15 * 1000);
  
  } catch (e){
    //console.log(String(e.stack).grey.italic.dim.bgRed)
  }
}

