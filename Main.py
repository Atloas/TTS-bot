import discord

client = discord.Client()

@client.event
async def on_ready():
    print('Logged in as')
    print(client.user.name)
    print(client.user.id)
    print('------')


@client.event
async def on_message(message):
    if message.author == client.user:
        return
            
    elif message.content.startswith('$tts'):
        toSend = "/tts " + str(message.author.display_name).split('#')[0] + " " + message.content
        await client.send_message(message.channel, toSend)

    elif message.content.startswith('$'):
        error = '{} is not recognized as a command, please check your spelling or use $help for a list of commands'.format(message.content)
        embed = discord.Embed(title="**Error**",
                              description=error,
                              color=chat_color)
        await client.send_message(message.channel, embed=embed)

client.run('NTIzNzgzMTA5NDc3NDAwNTc2.Dvei0A.IndPbbHE9L87NxLS3GLbTes3PJI')