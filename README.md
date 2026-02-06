<<<<<<< HEAD
# Discord Server Management Bot

A modular Discord server management bot built in JavaScript for counting games, tickets, ranking, birthdays, booster roles, logging, and moderation.

## Features

- Counting channel with mistake tracking and reset.
- Ticket system: open, claim, add users, close with logs.
- Rank and simple leaderboard based on messages.
- Birthday storage and listing.
- Custom roles for boosters (create, share, unshare).
- Sticky messages for announcements.
- Message delete logging and moderation commands.
- Prefix commands (`!`) and a slash command only for `/help`.

## Getting Started

1. Clone the repository.
2. Run `npm install`.
3. Create a `.env` file (see `.env` example in the repo).
4. Fill in your token, guild and channel IDs.
5. Run `npm start`.

Deploy the bot on **bot-hosting.net** by uploading the project and setting the start command to `npm start`.

## Commands

- `!help` – List commands.
- `!ticket open [reason]` – Create a ticket.
- `!ticket claim` – Claim a ticket.
- `!ticket add @user` – Add user to ticket.
- `!ticket close` – Close ticket.
- `!rank` – Show your rank.
- `!rank top` – Show leaderboard.
- `!birthday set DD-MM` – Set your birthday.
- `!birthday get [@user]` – Get birthday.
- `!birthday list` – List birthdays.
- `!role create <name> [#hex]` – Booster custom role.
- `!role share @user` / `!role unshare @user`.
- `!mod kick @user [reason]`, `!mod ban @user [reason]`.
- `!mod nick [@user] <new nick>`.
- `!stick set <text>`, `!stick clear`.
- `!util ping`, `!util info`.

## Documentation Site

The `website/` folder contains a static HTML/CSS/JS documentation site designed for GitHub Pages with a dark aesthetic.

- Push the repository to GitHub.
- Enable GitHub Pages for the main branch, root folder.
- The docs will be served from `website/index.html`.
=======
# Discord Server Management Bot

A modular Discord server management bot built in JavaScript for counting games, tickets, ranking, birthdays, booster roles, logging, and moderation.

## Features

- Counting channel with mistake tracking and reset.
- Ticket system: open, claim, add users, close with logs.
- Rank and simple leaderboard based on messages.
- Birthday storage and listing.
- Custom roles for boosters (create, share, unshare).
- Sticky messages for announcements.
- Message delete logging and moderation commands.
- Prefix commands (`!`) and a slash command only for `/help`.

## Getting Started

1. Clone the repository.
2. Run `npm install`.
3. Create a `.env` file (see `.env` example in the repo).
4. Fill in your token, guild and channel IDs.
5. Run `npm start`.

Deploy the bot on **bot-hosting.net** by uploading the project and setting the start command to `npm start`.

## Commands

- `!help` – List commands.
- `!ticket open [reason]` – Create a ticket.
- `!ticket claim` – Claim a ticket.
- `!ticket add @user` – Add user to ticket.
- `!ticket close` – Close ticket.
- `!rank` – Show your rank.
- `!rank top` – Show leaderboard.
- `!birthday set DD-MM` – Set your birthday.
- `!birthday get [@user]` – Get birthday.
- `!birthday list` – List birthdays.
- `!role create <name> [#hex]` – Booster custom role.
- `!role share @user` / `!role unshare @user`.
- `!mod kick @user [reason]`, `!mod ban @user [reason]`.
- `!mod nick [@user] <new nick>`.
- `!stick set <text>`, `!stick clear`.
- `!util ping`, `!util info`.

## Documentation Site

The `website/` folder contains a static HTML/CSS/JS documentation site designed for GitHub Pages with a dark aesthetic.

- Push the repository to GitHub.
- Enable GitHub Pages for the main branch, root folder.
- The docs will be served from `website/index.html`.
>>>>>>> 00a1228229a7e3bdb54e4ee910a6cbf0722bd8fa
