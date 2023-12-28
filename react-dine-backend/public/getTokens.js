const axios = require("axios");

async function getRefreshToken(code) {
  try {
    const { data } = await axios.post("https://oauth2.googleapis.com/token", {
      client_id:
        "645518468833-n717gm661pgi1rstp2veuctrnl0cmfte.apps.googleusercontent.com",
      client_secret: "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",
      code,
      grant_type: "authorization_code",
      redirect_uri: "http://127.0.0.1:5173/callback",
    });

    console.log(data); // { access_token, expires_in, refresh_token, scope, token_type }
  } catch (error) {
    console.error(error);
  }
}

// Call the function with the authorization code
getRefreshToken(
  "4/0AfJohXlZOcT_jY1MWaVtpebQFtKfsC9C1UxFyLmI4q_iN78h8IZFK3YCtqfQeHJc4iuWLQ&scope=https://mail.google.com/"
);
