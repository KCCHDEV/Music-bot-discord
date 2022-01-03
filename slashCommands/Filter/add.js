const {
	MessageEmbed,
	Message
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
const FiltersSettings = require("../../botconfig/filters.json");
const {
	check_if_dj
} = require("../../handlers/functions")

module.exports = {
	name: "add", //the command name for the Slash Command
	description: "เพิ่ม Filter เข้าสู้การเล่น", //the command description for Slash Command Overview
	cooldown: 5,
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
	options: [ 
		{
			"String": {
				name: "filters",
				description: "เพิ่ม filter ที่คุณต้องการ",
				required: true
			}
		}, 
	],
	run: async (client, interaction) => {
		try {
			//things u can directly access in an interaction!
			const {
				member,
				channelId,
				guildId,
				applicationId,
				commandName,
				deferred,
				replied,
				ephemeral,
				options,
				id,
				createdTimestamp
			} = interaction;
			const {
				guild
			} = member;
			const {
				channel
			} = member.voice;
			if (!channel) return interaction.reply({
				embeds: [
					new MessageEmbed().setColor(ee.wrongcolor).setTitle(`${client.allEmojis.x} **โปรดเข้ามา ${guild.me.voice.channel ? "" : ""} VC ที่มีหนูก่อน**`)
				],
				ephemeral: true
			})
			if (channel.guild.me.voice.channel && channel.guild.me.voice.channel.id != channel.id) {
				return interaction.reply({
					embeds: [new MessageEmbed()
						.setColor(ee.wrongcolor)
						.setFooter(ee.footertext, ee.footericon)
						.setTitle(`${client.allEmojis.x} เข้ามาอยู่กับ__หนูก่อน__`)
						.setDescription(`<#${guild.me.voice.channel.id}>`)
					],
					ephemeral: true
				});
			}
			try {
				let newQueue = client.distube.getQueue(guildId);
				if (!newQueue || !newQueue.songs || newQueue.songs.length == 0) return interaction.reply({
					embeds: [
						new MessageEmbed().setColor(ee.wrongcolor).setTitle(`${client.allEmojis.x} **หนูยังไม่ได้ร้องเพลงอะไรเลยนะ**`)
					],
					ephemeral: true
				})
				if (check_if_dj(client, member, newQueue.songs[0])) {
					return interaction.reply({
						embeds: [new MessageEmbed()
							.setColor(ee.wrongcolor)
							.setFooter(ee.footertext, ee.footericon)
							.setTitle(`${client.allEmojis.x}**คุณไม่สามารถใช้ได้ __ต้องการ DJ ROLES__**`)
							.setDescription(`**DJ-ROLES:**\n> ${check_if_dj(client, member, newQueue.songs[0])}`)
						],
						ephemeral: true
					});
				}
				let filters = options.getString("filters").toLowerCase().split(" ");
				if (!filters) filters = [options.getString("filters").toLowerCase()]
				if (filters.some(a => !FiltersSettings[a])) {
					return interaction.reply({
						embeds: [
							new MessageEmbed()
							.setColor(ee.wrongcolor)
							.setFooter(ee.footertext, ee.footericon)
							.setTitle(`${client.allEmojis.x} **คุณต้องใส่ Filter ให้ถุกต้อง**`)
							.setDescription("**สามารถใส่ filter ได้มากกว่า 1 นะแค่คุณเว้นวรรค**")
							.addField("**ตัวกรองที่ถูกต้องทั้งหมด:**", Object.keys(FiltersSettings).map(f => `\`${f}\``).join(", ") + "\n\n**ข้อความ:**\n> **")
						],
					})
				}
				let toAdded = [];
				//add new filters
				filters.forEach((f) => {
					if (!newQueue.filters.includes(f)) {
						toAdded.push(f)
					}
				})
				if (!toAdded || toAdded.length == 0) {
					return interaction.reply({
						embeds: [
							new MessageEmbed()
							.setColor(ee.wrongcolor)
							.setFooter(ee.footertext, ee.footericon)
							.setTitle(`${client.allEmojis.x} **คุณยังไม่ได้เพิ่มตัวกรอง ซึ่งยังไม่อยู่ในตัวกรอง**`)
							.addField("**__current__ Filters:**", newQueue.filters.map(f => `\`${f}\``).join(", "))
						],
					})
				}
				await newQueue.setFilter(toAdded);
				interaction.reply({
					embeds: [new MessageEmbed()
					  .setColor(ee.color)
					  .setTimestamp()
					  .setTitle(`♨️ **เพิ่ม ${toAdded.length} ${toAdded.length == filters.length ? "Filters": ` ${filters.length} ฟิลเตอร์! ส่วนที่เหลือเป็นส่วนหนึ่งของตัวกรองแล้ว!`}**`)
					  .setFooter(`💢 ใช้งานโดย: ${member.user.tag}`, member.user.displayAvatarURL({dynamic: true}))]
					})

			} catch (e) {
				console.log(e.stack ? e.stack : e)
				interaction.editReply({
					content: `${client.allEmojis.x} | Error: `,
					embeds: [
						new MessageEmbed().setColor(ee.wrongcolor)
						.setDescription(`\`\`\`${e}\`\`\``)
					],
					ephemeral: true
				})
			}
		} catch (e) {
			console.log(String(e.stack).bgRed)
		}
	}
}
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
