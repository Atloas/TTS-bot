const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
const TOKEN = "NTIzNzgzMTA5NDc3NDAwNTc2.DveuiQ.XSEIRR4qbYkJTMlFx9MCxwvB0_A";

var rawData = fs.readFileSync("data.json");
var data = JSON.parse(rawData);
var dataToWrite;
var channel = data.channel;
var prefix = data.prefix;

bot.on("message", function(message)
{
    if(message.content.startsWith(prefix + "prefix"))
    {
        if(message.content.split(" ").length == 1)
        {
            message.channel.send("Failed to change prefix: no prefix argument passed.");
            return;
        }
        prefix = message.content.split(" ")[1];
        data.prefix = prefix;
        dataToWrite = JSON.stringify(data);
        fs.writeFileSync('data.json', dataToWrite);
        message.channel.send('Prefix changed to ' + prefix);
    }
    
    else if(message.content.startsWith(prefix + "channel"))
    {
        if(message.content.split(" ").length == 1)
        {
            message.channel.send("Failed to change channel: no channel argument passed.");
            return;
        }
        channel = message.content.split(" ")[1];
        data.channel = channel;
        dataToWrite = JSON.stringify(data);
        fs.writeFileSync('data.json', dataToWrite);
        message.channel.send("Target channel changed to " + channel);
    }

    else if(message.channel.name == channel && message.content.startsWith(prefix + "tts"))
    {
        var toSend = message.author.username.split("#")[0] + ":" +  message.content.slice(message.content.indexOf(" "), message.content.length);
        message.delete();
        message.channel.send(toSend, { tts: true });
    }

    else if(message.channel.name == channel && message.content.startsWith(prefix + "cabalonmars"))
    {
        var toSend = "Zavala: Whether we wanted it or not, we've stepped into a war with the Cabal on Mars. So let's get to taking out their command, one by one. Valus Ta'aurc. From what I can gather he commands the Siege Dancers from an Imperial Land Tank outside of Rubicon. He's well protected, but with the right team, we can punch through those defenses, take this beast out, and break their grip on Freehold.";
        message.delete();
        message.channel.send(toSend, { tts: true });
    }
});

bot.on("ready", function()
{
    console.log("Ready!");
})

bot.login(TOKEN);