const {
    readdirSync
} = require("fs");
module.exports = (client) => {
    try {
        let amount = 0;
        readdirSync("./commands/").forEach((dir) => {
            const commands = readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith(".js"));
            for (let file of commands) {
                let pull = require(`../commands/${dir}/${file}`);
                pull.category = dir;
                if (pull.name) {
                    client.commands.set(pull.name, pull);
                    amount++;
                } else {
                    console.log(file, `ระบบมีปัณหา!!!`.brightRed);
                    continue;
                }
                if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name));
            }
        });
        console.log(`-------------------------------------------------`);
        console.log(`กำลังอัพโหลดคำสั่ง หากท่านได้อัพเดทโปรดรออย่างน้อง 1ชั่วโมง`.brightRed);
        console.log(`-------------------------------------------------`);
    } catch (e) {
        console.log(String(e.stack).bgRed)
    }
};