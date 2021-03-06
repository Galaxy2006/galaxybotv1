const Discord = require('discord.js')
const bot = new Discord.Client();
const superagent = require("superagent")

var prefix = ("g!");

bot.on('ready' , () => {
    bot.user.setPresence({ game: { name: `g!help | ${bot.guilds.size} servers | ${bot.users.size} Utilisateurs`, type: 0} });
    console.log("Bot prêt !");
});

bot.login(process.env.TOKEN);

bot.on('message', message => {
    if(message.author.bot) return;
    if (message.content === "ping"){
        message.channel.sendMessage(`pong !`);
        console.log('ping pong');
    }

    if (message.content === prefix + "help"){
        var help_embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle("🌌 GalaxyBot 🌌")
        .setDescription(":question: Faites `g!hhelp` pour avoir la page d'aide dans le channel ! :question:")
        .addField(":rotating_light:  **Administration**", "**__*SOON*__**")
        .addField(":pushpin: **Utile**", "\n`g!stats` | `g!serverinfo (ou si)` | `g!invite` | `g!report (personne) (raison)`")
        .addField(":balloon: **Fun**", "\n`g!roll` | `g!8ball` | `g!avatar` | `g!say (text)` | `g!flip` | `g!chat` | `g!chien`")
        .addField("🤝 **Support** 🤝", "\n`g!discord`")
        .setFooter("Voila pour les commandes du bot !")
        message.author.sendEmbed(help_embed);
        console.log("Commande Help demandée !");

    }

    if (message.author.bot) return undefined;

    let msg = message.content.toLowerCase();
    let args = message.content.slice(prefix.length).trim().split(' ');
    let command = args.shift().toLowerCase();

    if (command === 'say'){
    let say = args.join(' ');
    message.delete();
    message.channel.send(say);
    console.log(`Commande say effectuée sur le serveur ${message.guild}`)
    }

    if (command === 'avatar'){
      let user = message.mentions.users.first() || message.author;
    let AvatarEmbed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setAuthor(`${user.username}`)
      .setImage(user.displayAvatarURL)
      message.channel.send(AvatarEmbed)
      console.log(`Commande avatar effectuée sur le serveur ${message.guild}`)
    }

    if (message.content === prefix + "hhelp"){
        var hhelp_embed = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setTitle("🌌 GalaxyBot 🌌")
            .setDescription(":question: Faites `g!help` pour avoir la page d'aide en MP ! :question:")
            .addField(":rotating_light:  **Administration**", "**__*SOON*__**")
            .addField(":pushpin: **Utile**", "\n`g!stats` | `g!serverinfo (ou si)` | `g!invite` | `g!report (personne) (raison)`")
            .addField(":balloon: **Fun**", "\n`g!roll` | `g!8ball` | `g!avatar` | `g!say` | `g!chat` | `g!chien`")
            .addField("🤝 **Support** 🤝", "\n`g!discord`")
            .setFooter("Voila pour les commandes du bot !")
        message.channel.sendEmbed(hhelp_embed);
        console.log("Commande HHelp demandée !");

    }

    if (message.content === prefix + "stats") {
        var userCreateDate = message.author.createdAt.toString().split(" ")
        var stats_embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setTitle(`Statistiques de ${message.author.username}`)
            .addField(`**Nom**`, message.author.tag)
            .addField(`**ID**`, message.author.id)
            .addField(`**Date de creation :**`, userCreateDate[1] + ' ' + userCreateDate[2] + ' ' + userCreateDate[3])
            .setThumbnail(message.author.avatarURL)
        message.reply("regarde tes message privée tu vien de recevoir tes statistiques")
        message.author.sendEmbed(stats_embed)
    }

    if (message.content === prefix + "si"){
        let online = message.guild.members.filter(member => member.user.presence.status !== 'offline')
        var siembed = new Discord.RichEmbed()
        .setTitle("**Informations du serveur**")
        .addField("**Nom du discord :**", message.guild.name)
        .addField("**Créé le :**", message.guild.createdAt)
        .addField("**Tu as rejoint le :**", message.author.createdAt)
        .addField("**Le createur :**", message.guild.owner)
        .addField("**ID du createur :**", message.guild.ownerID)
        .addField("**ID du serveur :**", message.guild.id)
        .addField("**region :**", message.guild.region)
        .addField("**Membres :**", message.guild.memberCount)
        .addField("**Humains :**", message.guild.memberCount - message.guild.members.filter(m => m.user.bot).size)
        .addField("**Bots :**", message.guild.members.filter(m => m.user.bot).size)
        .addField("**Channels :**", `${message.guild.channels.filter(channel => channel.type === 'voice').size} salon(s) vocal(aux) / ${message.guild.channels.filter(channel => channel.type === 'text').size} salon(s) text(s)`, true)
        .addField("**Statut**", `**${message.guild.members.filter(o => o.presence.status === 'online').size}** En ligne\n**${message.guild.members.filter(i => i.presence.status === 'idle').size}** Inactif/Inactive\n**${message.guild.members.filter(dnd => dnd.presence.status === 'dnd').size}** Ne pas déranger\n**${message.guild.members.filter(off => off.presence.status === 'offline').size}** Hors ligne/Invisible\n**${message.guild.members.filter(s => s.presence.status === 'streaming').size}** En stream`)
        .addField("**Rôles**", message.guild.roles.size)
        .setThumbnail(message.guild.iconURL)
        .setColor("RANDOM")
        message.channel.sendEmbed(siembed);
  
    }

    if(message.content === prefix + "serverinfo") {
       let online = message.guild.members.filter(member => member.user.presence.status !== 'offline')
      var serverinfo = new Discord.RichEmbed()
      .setTitle("**Informations du serveur**")
      .addField("**Nom du discord :**", message.guild.name)
      .addField("**Créé le :**", message.guild.createdAt)
      .addField("**Tu as rejoint le :**", message.author.createdAt)
      .addField("**Le createur :**", message.guild.owner)
      .addField("**ID du createur :**", message.guild.ownerID)
      .addField("**ID du serveur :**", message.guild.id)
      .addField("**region :**", message.guild.region)
      .addField("**Membres :**", message.guild.memberCount)
      .addField("**Humains :**", message.guild.memberCount - message.guild.members.filter(m => m.user.bot).size)
      .addField("**Bots :**", message.guild.members.filter(m => m.user.bot).size)
      .addField("**Channels :**", `${message.guild.channels.filter(channel => channel.type === 'voice').size} salon(s) vocal(aux) / ${message.guild.channels.filter(channel => channel.type === 'text').size} text`, true)
      .addField("**Statut**", `**${message.guild.members.filter(o => o.presence.status === 'online').size}** En ligne\n**${message.guild.members.filter(i => i.presence.status === 'idle').size}** Inactif/Inactive\n**${message.guild.members.filter(dnd => dnd.presence.status === 'dnd').size}** Ne pas déranger\n**${message.guild.members.filter(off => off.presence.status === 'offline').size}** Hors ligne/Invisible\n**${message.guild.members.filter(s => s.presence.status === 'streaming').size}** En stream`)
      .addField("**Rôles**", message.guild.roles.size)
      .setThumbnail(message.guild.iconURL)
      .setColor("RANDOM")
      message.channel.sendEmbed(serverinfo);

    }

    if (message.content === prefix + "discord"){
        message.delete()
        var discordembed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle("**Discord :**")
        .addField("Discord officiel du bot :", "| https://discord.gg/axCmR9e |")
        .addField("Discord du créateur du bot :", "| https://discord.gg/a5tYCCJ |")
        message.author.sendEmbed(discordembed)

    }
    
    if (message.content === prefix + "invite") {
        var invite_embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .addField("Liens d'invitations", "Voici les liens d'invitations de :")
        .addField("GalaxyBot", "[GalaxyBot](https://discordapp.com/oauth2/authorize?client_id=447921099460575242&scope=bot&permissions=2146958591)")
        .addField("|RustyBot|", "[RustyBot](https://discordapp.com/oauth2/authorize?client_id=444128768014024725&scope=bot&permissions=2013789431)")
        .setFooter("| GalaxyBot | RustyBot |")
        message.channel.sendEmbed(invite_embed);
    }

    if (message.content === prefix + "roll") {
        random()

        if (randnum == 1) {
            message.channel.sendMessage("1");
            console.log(randnum);

        }

        if (randnum == 2) {
            message.channel.sendMessage("2");
            console.log(randnum);

        }

        if (randnum == 3) {
            message.channel.sendMessage("3");
            console.log(randnum);
    
        }
 
        if (randnum == 4) {
            message.channel.sendMessage("4");
            console.log(randnum);

        }

        if (randnum == 5) {
            message.channel.sendMessage("5");
            console.log(randnum);

        }

        if (randnum == 6) {
            message.channel.sendMessage("6");
            console.log(randnum);
    
        }

        if (randnum == 7) {
            message.channel.sendMessage("7");
            console.log(randnum);

        }

        if (randnum == 8) {
            message.channel.sendMessage("8");
            console.log(randnum);

        }

        if (randnum == 9) {
            message.channel.sendMessage("9");
            console.log(randnum);

        }

        if (randnum == 10) {
            message.channel.sendMessage("10");
            console.log(randnum);

        }

}

function random(min, max) {
min = Math.ceil(1)
max = Math.floor(10)
randnum = Math.floor(Math.random() * (max - min +1) + min)}});



bot.on("message", function(message) {
    if(message.author.bot) return;
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(prefix)) return;

    var args = message.content.substring(prefix.length).split(" ");

    switch (args[0].toLowerCase()) {
        case "8ball":
        let args = message.content.split(" ").slice(1);
        let tte = args.join(" ")
        if (!tte){
            return message.reply("Merci de poser une question :8ball:")};

            var replys = [
                "Oui",
                "Non",
                "Je sais pas",
                "Peut être ( ͡° ͜ʖ ͡°)",
                "Probablement",
                "Probablement pas",
                "Je ne pense pas",
                "Je pense que oui",
                "De loin",
                "C'est possible",
                "C'est une grande question",
                "Probablement",
                "Google est ton ami",
                "T'es relou avec ta question",
                "Je t'aime pas",
                "Je t'aime",
                "Je répondrai pas",
                "Bien sûr",
                "J'ai faim désolé, pas à manger moi pas répondre",
                "Je suis pas là",
                "Sûrement",
                "Sûrement pas",
                "Pourquoi cette questions ?",
                "Certainement",
                "Ces logique que oui !",
                "Ces logique que non !",
                "Certainement pas"
            ];

            let reponse = (replys[Math.floor(Math.random() * replys.length)])
            var bembed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setDescription(":8ball: 8ball :8ball:")
            .addField("Question", tte)
            .addField("Réponse", reponse)
         message.channel.sendEmbed(bembed)

}});

bot.on('message', message => {
    if(message.author.bot) return;
    if (message.content === prefix + "flip") {
        random();
    
        if (randnum == 1) {
            message.channel.sendMessage("Pile !");
            console.log("Pile");
    
        }
    
        if (randnum == 2) {
            message.channel.sendMessage("Face !");
            console.log("Face");
    
        }

};       
          
function random(min, max) {
min = Math.ceil(1)
max = Math.floor(2)
randnum = Math.floor(Math.random() * (max - min +1) + min)}});

bot.on('message', message => {
    if(message.author.bot) return;
    if(message.content.startsWith(prefix + 'report')){
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
  
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
  
      let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!rUser) return message.channel.send(":x: Je ne trouve pas l'utilisateur. :x:");
      let reason = args.join(" ").slice(22);
  
  
      let reportchannel = message.guild.channels.find(`name`, "reports");
      if (!reportchannel) return message.channel.send("Le channel ``reports`` est inexistant sur le serveur.");
  
      message.channel.send(`L'utilisateur **${rUser.user.tag}** a bien  été report !`)
  
      let reportembed = new Discord.RichEmbed()
      .setTitle("**Reports**")
      .setColor("RANDOM")
      .addField("**Personne report :**", `${rUser} Avec l'ID : ${rUser.id}`)
      .addField("**Report par :**", `${message.author} Avec l'ID : ${message.author.id}`)
      .addField("**Channel :**", message.channel)
      .addField("**À :**", message.createdAt)
      .addField("**Raison :**", reason);
  
  
      message.delete().catch(O_o=>{});
      reportchannel.send(reportembed);
  
      return;

}});

bot.on("message", async (message) => {
    if(message.author.bot) return;
    if (message.content === prefix + "chat") {
        const { body } = await superagent
        .get('aws.random.cat/meow')
        const chatembed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle("Meow ! :cat:")
        .setImage(body.file)
        message.channel.sendEmbed(chatembed)
    
    }

});

bot.on("message", async (message) => {
    if(message.author.bot) return;
    if(message.content === prefix + "chien") {
        const { body } = await superagent
        .get('https://dog.ceo/api/breeds/image/random');
        const dogembed = new Discord.RichEmbed()
        .setColor(0x954D23)
        .setTitle("Woof :dog:")
        .setImage(body.message)
        message.channel.sendEmbed(dogembed)
    

}});
  
