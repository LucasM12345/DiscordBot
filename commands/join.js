const { SlashCommandBuilder } = require("@discordjs/builders");
const { execute } = require("./echo");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("join")
		.setDescription("joins the vc!"),
  async execute(message) {
    const { voice } = message.member
    
    if (!voice.channelID) {
      message.reply('You must be in a voice channel')
      console.log(voice.channelID)
      return
    }
    
    voice.channel.join()
  }
}