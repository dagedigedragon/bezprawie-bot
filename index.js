const express = require('express');
const mineflayer = require('mineflayer');
const app = express();
app.use(express.json());

let bots = {};

app.get('/', (req, res) => {
  res.send(`
  <h2>Bezprawie - AFK BOT 24/7</h2>
  <input id="ip" placeholder="IP np. bezprawie.falixsrv.me" value="bezprawie.falixsrv.me" style="width:300px;padding:10px">
  <input id="nick" placeholder="Nick bota" value="AFK_Bot" style="padding:10px">
  <button onclick="start()" style="padding:10px">START BOT</button>
  <p id="log"></p>
  <script>
  function start(){
    fetch('/start', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({host: document.getElementById('ip').value, username: document.getElementById('nick').value})})
   .then(r=>r.text()).then(t=>document.getElementById('log').innerText=t)
  }
  </script>
  `)
});

app.post('/start', (req, res) => {
  const { host, username } = req.body;
  if(bots[username]) bots[username].quit();

  function create() {
    console.log('Wbijam na ' + host + ' jako ' + username);
    const bot = mineflayer.createBot({ host: host, username: username, version: false });
    bots[username] = bot;
    bot.on('spawn', () => {
      bot.chat('AFK Bot online 24/7!');
      // anty-AFK
      setInterval(() => bot.swingArm('right'), 60000);
    });
    bot.on('end', () => setTimeout(create, 10000));
    bot.on('kicked', (r) => console.log('Kick:', r));
  }
  create();
  res.send('Bot ' + username + ' wbija na ' + host + ' i zostanie 24/7!');
});

app.listen(3000, () => console.log('Strona dziala'));
