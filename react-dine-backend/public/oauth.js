const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  "645518468833-n717gm661pgi1rstp2veuctrnl0cmfte.apps.googleusercontent.com",
  "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",
  "http://127.0.0.1:5173/callback"
);

// generate a url that asks permissions for Google's scopes
const scopes = ["https://mail.google.com/"];

const url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: "offline",

  // If you only need one scope you can pass it as a string
  scope: scopes,
});

console.log(url);
