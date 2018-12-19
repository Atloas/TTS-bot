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
    var content = message.content.toLowerCase();
    if(content.startsWith(prefix))
    {
        console.log("IN: " + message.content);
        var command = content.split(" ")[0];
        if(command == prefix + "prefix")
        {
            if(content.split(" ").length == 1)
            {
                message.channel.send("Failed to change prefix: no prefix argument passed.");
                return;
            }
            prefix = content.split(" ")[1];
            data.prefix = prefix;
            dataToWrite = JSON.stringify(data);
            fs.writeFileSync('data.json', dataToWrite);
            message.channel.send('Prefix changed to ' + prefix);
            console.log("OUT: " + 'Prefix changed to ' + prefix);
        }
        
        else if(command == prefix + "channel")
        {
            if(content.split(" ").length == 1)
            {
                message.channel.send("Failed to change channel: no channel argument passed.");
                return;
            }
            channel = content.split(" ")[1];
            data.channel = channel;
            dataToWrite = JSON.stringify(data);
            fs.writeFileSync('data.json', dataToWrite);
            message.channel.send("Target channel changed to " + channel);
            console.log("OUT: " + "Target channel changed to " + channel);
        }

        else if(message.channel.name == channel)
        {
            var toSend;
            var doTTS = true;
            switch (command)
            {
                case prefix + "tts":
                {
                    var toSend = message.author.username.split("#")[0] + ":" +  content.slice(message.content.indexOf(" "), content.length);
                    break;
                }
                case prefix + "cabalonmars":
                {
                    toSend = "Zavala: Whether we wanted it or not, we've stepped into a war with the Cabal on Mars. So let's get to taking out their command, one by one.";
                    break;
                }
                case prefix + "drift":
                {
                    toSend = "Xol: You, Shall, Drift."
                    break;
                }
                case prefix + "fat":
                {
                    toSend = "Calus: Grow fat from strength!";
                    break;
                }
                case prefix + "cabalagain":
                {
                    toSend = "Asher: Cabal again?! With their rock-shaking, concentration-shattering machinery!";
                    break;
                }
                default:
                {
                    toSend = "Command unrecognized."
                    doTTS = false;
                    break;
                }
            }
            message.delete();
            message.channel.send(toSend, { tts: doTTS });
            console.log("OUT: " + toSend);
        }
    }
});

bot.on("ready", function()
{
    console.log("Ready!");
})

bot.login(TOKEN);