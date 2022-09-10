require("dotenv").config();
const fs = require("fs");
const { Client, Intents, Collection } = require("discord.js");

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES
	]
});

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

const commands = [];

client.commands = new Collection();

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
	client.commands.set(command.data.name, command);
}

const eventFiles = fs
	.readdirSync("./events")
	.filter(file => file.endsWith(".js"));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, commands));
	} else {
		client.on(event.name, (...args) => event.execute(...args, commands));
	}
}



//help command
client.on("messageCreate", message => {
	if (message.content.startsWith("<")) {
		if (message.content.substring(1) === "?") {
			message.reply("Here is a list of commands:\nPing-Pong: <ping\nHeart: <heart\nHIGH FIVE: <HIGH FIVE\nhigh five: <high five");
		}
	}
});

//ping command
client.on("messageCreate", message => {
	if (message.content.startsWith("<")) {
		if (message.content.substring(1) === "ping") {
			message.reply("Pong!!!!");
			console.log('im working')
		}
	}
});

//love command
client.on("messageCreate", message => {
	if (message.content.startsWith("<")) {
		if (message.content.substring(1) === "heart") {
			message.reply("♥");
		}
	}
});

//HIGH FIVE command
client.on("messageCreate", message => {
	if (message.content.startsWith("<")) {
		if (message.content.substring(1) === "HIGH FIVE") {
			message.reply(":pray:");
		}
	}
});

//high five command
client.on("messageCreate", message => {
	if (message.content.startsWith("<")) {
		if (message.content.substring(1) === "high five") {
			message.reply("https://cdn.discordapp.com/attachments/694674054036062248/970194137175433246/JIUS2123.PNG");
		}
	}
});
i = 0;
client.on("messageCreate", message => {
	if (message.content.startsWith("<")) {
		if (message.content.substring(1) === "high fives") {
			while (i < 5) {
				message.reply("https://cdn.discordapp.com/attachments/694674054036062248/970194137175433246/JIUS2123.PNG");
  			console.log(i);
  			i++;
			}
		}
	}
});

//↓ under construction ↓


client.on("messageCreate", message => {
	if (message.content.startsWith("<")) {
		if (message.content.substring(1) === "join") {
			const channel = client.channels.cache.get("mychannelid");
			if (!channel) return console.error("The channel does not exist!");
			channel.join().then(connection => {
				// Yay, it worked!
				console.log("Successfully connected.");
			}).catch(e => {
				// Oh no, it errored! Let's log it to console :)
				console.error(e);
			});
		};
	};
});


/*
client.on("messageCreate", message => {
	if (message.content.startsWith("<")) {
		if (message.content.substring(1) === "join") {
			const { voice } = message.member
			if (!voice.channelID) {
				message.reply('You must be in a voice channel')
				console.log(voice.channelID)
				return
			}
			voice.channel.join()
		}
	}
});
*/

/*
client.on('voiceStateUpdate', (oldState, newState) => {
	// check for bot
  if (oldState.member.user.bot) return;
	//left
	if(newState.channelID === null) {
			console.log('user left channel', oldState.channelID);
		}
	// joined
	else if(oldState.channelID === null) {
			console.log('user joined channel', newState.channelID);
			message.reply("HELLLOOOO");
		}	
		});
*/






client.on('presenceUpdate', (oldPresence, newPresence) => {
	let member = newPresence.member;
	// User id of the user you're tracking status.
	if (member.id === '266101647250423808') {
			if (oldPresence.status !== newPresence.status) {
					// Your specific channel to send a message in.
					let channel = member.guild.channels.cache.get('1004237479676756013');
					// You can also use member.guild.channels.resolve('<channelId>');

					let text = "";

					if (newPresence.status === "online") {
							text = "Our special member is online!";
							console.log('on')
					} else if (newPresence.status === "offline") {
							text = "Oh no! Our special member is offline."
							console.log('off');
					}
					// etc...

					channel.send(text);
			}
	}
});


client.on('presenceUpdate', () =>{
	let person1 = bot.users.cache.get('266101647250423808')
	let channel = member.guild.channels.cache.get('1004237479676756013');
	console.log(person1.presence.clientStatus.desktop)
	if(person1.presence.clientStatus.desktop === 'dnd' || person1.presence.clientStatus.desktop === 'online'){
			channel.send('person1 is now online')
			console.log('on 1');
	}

	else if(person1.presence.clientStatus.desktop === 'offline' || person1.presence.clientStatus.desktop === 'idle'){
			channel.send('person1 is offline');
			console.log('off 1')
	}
})


client.login(process.env.TOKEN);