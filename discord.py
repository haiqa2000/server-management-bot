import discord
import os
import asyncio
from discord.ext import commands, tasks
from dotenv import load_dotenv

# 1. Load the token from the .env file
load_dotenv()
TOKEN = os.getenv('DISCORD_TOKEN')

# 2. Setup Intents (Must have Presence turned on in Developer Portal!)
intents = discord.Intents.default()
intents.presences = True
intents.message_content = True 

bot = commands.Bot(command_prefix="!", intents=intents)

# 3. Your Funny "Overworked Manager" Statuses
activities = [
    discord.Activity(type=discord.ActivityType.watching, name="for rule breakers..."),
    discord.Activity(type=discord.ActivityType.listening, name="to bad excuses"),
    discord.Activity(type=discord.ActivityType.playing, name="Ban Hammer Roulette"),
    discord.Activity(type=discord.ActivityType.watching, name="the server burn"),
    discord.Activity(type=discord.ActivityType.competing, name="the 'I hate pings' contest")
]

@tasks.loop(seconds=60)
async def rotate_presence():
    for act in activities:
        # Sets status to DND (Red Dot)
        await bot.change_presence(status=discord.Status.dnd, activity=act)
        await asyncio.sleep(60)

@bot.event
async def on_ready():
    print(f'✅ {bot.user.name} is online and judging everyone.')
    rotate_presence.start()

# 4. Run the Bot
if TOKEN:
    bot.run(TOKEN)
else:
    print("❌ ERROR: DISCORD_TOKEN not found in .env file.")