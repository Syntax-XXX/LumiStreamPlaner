import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import cors from 'cors';
import fs from 'fs';

const app = express();
const PORT = 3000;


const WEBHOOK_URL = 'https://discord.com/api/webhooks/1375145813302448248/Db9fCcvdvl5OX0nNPjYC4D-7f9iJv1QSVZojGSvviNapfWSJJ9pWAy4j5fYvr0wGR4en';


const SCHEDULE_FILE = './schedule.json';
const MESSAGE_FILE = './webhook_message.json';


let schedule = fs.existsSync(SCHEDULE_FILE)
  ? JSON.parse(fs.readFileSync(SCHEDULE_FILE))
  : {
      Montag: "", Dienstag: "", Mittwoch: "",
      Donnerstag: "", Freitag: "", Samstag: "", Sonntag: ""
    };


let messageInfo = fs.existsSync(MESSAGE_FILE)
  ? JSON.parse(fs.readFileSync(MESSAGE_FILE))
  : null;


function buildEmbed(schedule) {
  return {
    embeds: [{
      title: "<a:wave:1352394973005221890> Aktueller Streamplan! <a:wave:1352394973005221890>",
      description: Object.entries(schedule)
        .map(([day, time]) => `${day}: ${time || '–'}`)
        .join('\n'),
      color: 0xffd700,
      footer: {
        text: "Made By SyntaxXXX for Lumizap"
      },
    }]
  };
}


async function updateWebhook() {
  const embedData = buildEmbed(schedule);

  try {
    if (messageInfo?.id && messageInfo?.webhookId && messageInfo?.token) {
      const editURL = `https://discord.com/api/webhooks/${messageInfo.webhookId}/${messageInfo.token}/messages/${messageInfo.id}`;
      await axios.patch(editURL, embedData);
      console.log("✅ Webhook message edited.");
    } else {
      await sendNewWebhook(embedData);
    }
  } catch (err) {
    const status = err?.response?.status;
    const errorData = err?.response?.data;

    console.warn("⚠️ Editing webhook failed:", status, errorData);

    if (status === 404 || status === 403) {
      console.log("📨 Attempting to send a new message...");
      await sendNewWebhook(embedData);
    }
  }
}

async function sendNewWebhook(embedData) {
  try {
    const res = await axios.post(WEBHOOK_URL + '?wait=true', embedData);
    const urlParts = new URL(WEBHOOK_URL).pathname.split('/');
    const webhookId = urlParts[3];
    const token = urlParts[4];

    messageInfo = {
      id: res.data.id,
      webhookId,
      token
    };

    fs.writeFileSync(MESSAGE_FILE, JSON.stringify(messageInfo, null, 2));
    console.log("✅ New webhook message sent and saved.");
  } catch (err) {
    console.error("❌ Failed to send new webhook:", err?.response?.data || err.message);
  }
}

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/api/schedule', (req, res) => {
  res.json(schedule);
});

app.post('/api/schedule', (req, res) => {
  schedule = { ...schedule, ...req.body };
  fs.writeFileSync(SCHEDULE_FILE, JSON.stringify(schedule, null, 2));
  updateWebhook();
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
