const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "help",
    description: "Shows all commands Or shows more info about a command",
    category: "util",
    aliases: ["h"],
    execute(bot, message, args) {

        const cmdArgs = args[0];

        if (cmdArgs) {
            const cmd = bot.commands.get(cmdArgs) || bot.commands.get(bot.aliases.get(cmdArgs));
            if (!cmd) return message.channel.send("Command or alias not found");


            const aliases = cmd.aliases ? cmd.aliases.map(a => a) : "None";
            const embed = new MessageEmbed()
                .setColor("BLUE")
                .setTitle(`Command: ${cmd.name}`)
                .addField("Aliases", aliases)
                .addField("Description", cmd.description ? cmd.description : "Not specified")
                .addField("Usage", cmd.usage ? cmd.usage : "Not specified");

            return message.channel.send(embed);
        }

        const commands = bot.commands;
        const utilsCmds = commands.filter(cmd => cmd.category === "util").map(cmd => cmd.name).join(", ");
        const adminCmds = commands.filter(cmd => cmd.category === "admin").map(cmd => cmd.name).join(", ");
        const animalCmds = commands.filter(cmd => cmd.category === "animal").map(cmd => cmd.name).join(", ");
        const botOwnerCmds = commands.filter(cmd => cmd.category === "botowner").map(cmd => cmd.name).join(", ");
        const gameCmds = commands.filter(cmd => cmd.category === "games").map(cmd => cmd.name).join(", ");
        const musicCmds = commands.filter(cmd => cmd.category === "music").map(cmd => cmd.name).join(", ");
        const nsfwCmds = commands.filter(cmd => cmd.category === "nsfw").map(cmd => cmd.name).join(", ");
        const economyCmds = commands.filter(cmd => cmd.category === "economy").map(cmd => cmd.name).join(", ");

        const embed = new MessageEmbed()
            .setTimestamp()
            .setFooter(message.author.username)
            .setColor("BLUE")
            .addField("Admin Commands", `\`\`\`${adminCmds}\`\`\``)
            .addField("Animal Commands", `\`\`\`${animalCmds}\`\`\``)
            .addField("BotOwner Commands", `\`\`\`${botOwnerCmds}\`\`\``)
            .addField("Game Commands", `\`\`\`${gameCmds}\`\`\``)
            .addField("Music Commands", `\`\`\`${musicCmds}\`\`\``)
            .addField("NSFW Commands", `\`\`\`${nsfwCmds}\`\`\``)
            .addField("Util Commands", `\`\`\`${utilsCmds}\`\`\``)
            .addField("Economy Commands", `\`\`\`${economyCmds}\`\`\``)
            .setDescription("use `!help <command name | alias>` to view more info about a command ")
            .setTitle("Help");

        message.channel.send(embed);
    }
};