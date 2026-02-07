#!/usr/bin/env node

/**
 * Instagram Token Helper Script
 *
 * This script helps you:
 * 1. Exchange short-lived token for long-lived token
 * 2. Refresh an existing long-lived token
 * 3. Check token expiry
 *
 * Usage:
 *   node scripts/get-instagram-token.js exchange <app-secret> <short-token>
 *   node scripts/get-instagram-token.js refresh <long-token>
 *   node scripts/get-instagram-token.js check <token>
 */

const https = require('https');

// Color output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(colors[color] + message + colors.reset);
}

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error('Invalid JSON response'));
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function exchangeToken(appSecret, shortToken) {
  log('\n🔄 Exchanging short-lived token for long-lived token...', 'cyan');

  const url = `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${appSecret}&access_token=${shortToken}`;

  try {
    const data = await makeRequest(url);

    if (data.access_token) {
      log('\n✅ Success! Long-lived token generated:', 'green');
      log('\n' + colors.bold + data.access_token + colors.reset, 'green');
      log(`\n📅 Expires in: ${Math.floor(data.expires_in / 86400)} days`, 'yellow');
      log('\n📋 Copy this token to your .env file:', 'cyan');
      log(`INSTAGRAM_ACCESS_TOKEN=${data.access_token}`, 'bold');

      return data;
    } else {
      throw new Error('No access token in response');
    }
  } catch (error) {
    log('\n❌ Error: ' + error.message, 'red');
    if (error.error_message) {
      log('Instagram says: ' + error.error_message, 'red');
    }
    process.exit(1);
  }
}

async function refreshToken(longToken) {
  log('\n🔄 Refreshing long-lived token...', 'cyan');

  const url = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${longToken}`;

  try {
    const data = await makeRequest(url);

    if (data.access_token) {
      log('\n✅ Success! Token refreshed:', 'green');
      log('\n' + colors.bold + data.access_token + colors.reset, 'green');
      log(`\n📅 New expiry: ${Math.floor(data.expires_in / 86400)} days from now`, 'yellow');
      log('\n📋 Update your .env file:', 'cyan');
      log(`INSTAGRAM_ACCESS_TOKEN=${data.access_token}`, 'bold');

      return data;
    } else {
      throw new Error('No access token in response');
    }
  } catch (error) {
    log('\n❌ Error: ' + error.message, 'red');
    log('💡 Your token may be expired. Generate a new one from Facebook App Dashboard.', 'yellow');
    process.exit(1);
  }
}

async function checkToken(token) {
  log('\n🔍 Checking token validity...', 'cyan');

  const url = `https://graph.instagram.com/me?fields=id,username&access_token=${token}`;

  try {
    const data = await makeRequest(url);

    if (data.id && data.username) {
      log('\n✅ Token is valid!', 'green');
      log(`📱 Instagram Account: @${data.username}`, 'cyan');
      log(`🆔 User ID: ${data.id}`, 'cyan');
      log('\n💡 Note: This doesn\'t check expiry date. Refresh tokens every 60 days.', 'yellow');

      return data;
    } else {
      throw new Error('Invalid response from Instagram');
    }
  } catch (error) {
    log('\n❌ Token is invalid or expired', 'red');
    log('Error: ' + error.message, 'red');
    process.exit(1);
  }
}

function showHelp() {
  console.log(`
${colors.bold}Instagram Token Helper${colors.reset}

${colors.cyan}Usage:${colors.reset}
  node scripts/get-instagram-token.js <command> [arguments]

${colors.cyan}Commands:${colors.reset}

  ${colors.green}exchange${colors.reset} <app-secret> <short-token>
    Exchange a short-lived token (1 hour) for a long-lived token (60 days)

    Example:
      node scripts/get-instagram-token.js exchange abc123secret IGQVJShort...

  ${colors.green}refresh${colors.reset} <long-token>
    Refresh an existing long-lived token to extend expiry by 60 days

    Example:
      node scripts/get-instagram-token.js refresh IGQVJLong...

  ${colors.green}check${colors.reset} <token>
    Check if a token is valid and see which account it belongs to

    Example:
      node scripts/get-instagram-token.js check IGQVJYour...

${colors.cyan}Where to find values:${colors.reset}
  • ${colors.yellow}app-secret${colors.reset}: Facebook App Dashboard → Settings → Basic
  • ${colors.yellow}short-token${colors.reset}: Facebook App Dashboard → Instagram Basic Display → User Token Generator
  • ${colors.yellow}long-token${colors.reset}: Your .env file or previous exchange/refresh output

${colors.cyan}Quick Start:${colors.reset}
  1. Get short-lived token from Facebook App Dashboard
  2. Run: node scripts/get-instagram-token.js exchange <secret> <token>
  3. Copy the long-lived token to your .env file
  4. Set reminder to refresh in 50 days

${colors.cyan}More info:${colors.reset}
  See INSTAGRAM_SETUP.md for complete setup guide
`);
}

// Main execution
const args = process.argv.slice(2);
const command = args[0];

if (!command || command === 'help' || command === '--help' || command === '-h') {
  showHelp();
  process.exit(0);
}

switch (command) {
  case 'exchange':
    if (args.length < 3) {
      log('❌ Error: Missing arguments', 'red');
      log('Usage: node scripts/get-instagram-token.js exchange <app-secret> <short-token>', 'yellow');
      process.exit(1);
    }
    exchangeToken(args[1], args[2]);
    break;

  case 'refresh':
    if (args.length < 2) {
      log('❌ Error: Missing token', 'red');
      log('Usage: node scripts/get-instagram-token.js refresh <long-token>', 'yellow');
      process.exit(1);
    }
    refreshToken(args[1]);
    break;

  case 'check':
    if (args.length < 2) {
      log('❌ Error: Missing token', 'red');
      log('Usage: node scripts/get-instagram-token.js check <token>', 'yellow');
      process.exit(1);
    }
    checkToken(args[1]);
    break;

  default:
    log(`❌ Unknown command: ${command}`, 'red');
    log('Run "node scripts/get-instagram-token.js help" for usage', 'yellow');
    process.exit(1);
}
