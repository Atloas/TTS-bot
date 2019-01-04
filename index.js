const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
const TOKEN = "NTIzNzgzMTA5NDc3NDAwNTc2.DveuiQ.XSEIRR4qbYkJTMlFx9MCxwvB0_A";

var rawData = fs.readFileSync("data.json");
var data = JSON.parse(rawData);
var dataToWrite;
var channel = data.channel;
var prefix = data.prefix;

var date = new Date();

function getFormattedDate()
{
    return "[" + date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + " " + date.getMinutes() + ":" + date.getHours() + "]";
}

bot.on("message", function(message)
{
    var content = message.content.toLowerCase();
    var toSend = "Command unrecognized!";

    if(message.author == bot.user)
        return;

    //Preset commands
    if(content.startsWith(prefix))
    {
        console.log(getFormattedDate() + " IN: " + message.author.username + ": " + message.content);
        var doTTS = true;
        var command = content.split(" ")[0];
        if(command == prefix + "prefix")
        {
            doTTS = false;
            toSend = setPrefix(content);
        }
        else if(command == prefix + "channel")
        {
            doTTS = false;
            toSend = content.split(" ").length == 1 ? getChannel() : setChannel(content);
        }
        else if(message.channel.name == channel)
        {
            switch (command)
            {
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
                case prefix + "drown":
                {
                    toSend = "Xol: You, Shall, Drown, In, The, Deep.";
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
                case prefix + "dreams":
                {
                    toSend = "Shia: Don't let your dreams be dreams!";
                    break;
                }
                case prefix + "ignore":
                {
                    return;
                }
                default:
                {
                    doTTS = false;
                }
            }
        }
        if(doTTS)
            message.delete();
        message.channel.send(toSend, { tts: doTTS });
        console.log(getFormattedDate() + " OUT: " + toSend);
    }

    //General TTS
    else if(message.channel.name == channel)
    {
        console.log(getFormattedDate() + " IN: " + message.author.username + ": " + message.content);
        toSend = message.author.username.split("#")[0] + ": " + content;
        message.delete();
        message.channel.send(toSend, { tts: true });
        console.log(getFormattedDate() + " OUT: " + toSend);
    }
});

function setPrefix(content)
{
    if(content.split(" ").length == 1)
    {
        console.log(getFormattedDate() + " OUT: ERROR: Failed to change prefix: no prefix argument passed.");
        return "ERROR: Failed to change prefix: no prefix argument passed.";
    }

    prefix = content.split(" ")[1];
    data.prefix = prefix;
    dataToWrite = JSON.stringify(data);
    fs.writeFileSync('data.json', dataToWrite);
    console.log(getFormattedDate() + " OUT: Prefix changed to " + prefix);
    return "Prefix changed to " + prefix;
}

function setChannel(content)
{

    channel = content.split(" ")[1];
    data.channel = channel;
    dataToWrite = JSON.stringify(data);
    fs.writeFileSync('data.json', dataToWrite);
    console.log(getFormattedDate() + " OUT: Channel changed to " + channel);
    return "Channel changed to " + channel;
}

function getChannel()
{
    console.log(getFormattedDate() + " OUT: Channel is set to " + channel);
    return "Channel is set to " + channel;
}

bot.on("ready", function()
{
    console.log("Ready!");
})

bot.login(TOKEN);