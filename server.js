import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const LANGBASE_API_KEY = process.env.LANGBASE_API_KEY;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/ask', async (req, res) => {
  try {
    if (!LANGBASE_API_KEY) {
      return res.status(500).json({ error: 'Server missing LANGBASE_API_KEY' });
    }

    const input = req.body.input || '';
    const response = await fetch('https://api.langbase.com/harmoniqaorg/drug-discovery-ai-agent-7714', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LANGBASE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ input })
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(500).json({ error: text });
    }

    const data = await response.json();
    return res.json({ response: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unexpected server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
