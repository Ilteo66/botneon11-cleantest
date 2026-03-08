# VareBot

## Overview
VareBot is a WhatsApp bot built with Node.js using the Baileys library. It provides various features including AI integration, group moderation, media downloads, games, sticker creation, and utility tools.

## Project Structure
- `based.js` - Main entry point
- `config.js` - Configuration file with API keys and global settings
- `handler.js` - Message handler logic
- `lib/` - Library utilities
- `plugins/` - Bot command plugins
- `media/` - Media assets

## Setup
The bot is configured to run with Node.js 20. Dependencies are managed via npm.

### Running the Bot
```bash
npm start
```

On startup, the bot presents two login options:
1. QR Code scanning
2. 8-digit pairing code

## Dependencies
Key dependencies include:
- `@realvare/based` - Core WhatsApp library
- `puppeteer` - Browser automation
- `canvas` - Image manipulation
- `fluent-ffmpeg` - Media processing
- `youtube-dl-exec` - YouTube downloads

## Configuration
API keys and bot settings are configured in `config.js`. Update the placeholder values with valid API keys for full functionality.

## Recent Changes
- 2026-01-25: Initial Replit environment setup
