import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 5000;

// Resolve paths for history database file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const HISTORY_FILE_PATH = path.join(__dirname, 'history.json');

app.use(cors());
app.use(express.json());

// Initialize history.json if it doesn't exist
async function initHistoryFile() {
  try {
    await fs.access(HISTORY_FILE_PATH);
  } catch (error) {
    // File doesn't exist, create it with empty array
    await fs.writeFile(HISTORY_FILE_PATH, JSON.stringify([], null, 2), 'utf-8');
  }
}

// Read history from JSON file
async function readHistory() {
  try {
    await initHistoryFile();
    const data = await fs.readFile(HISTORY_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading history file:', error);
    return [];
  }
}

// Write history to JSON file
async function writeHistory(history) {
  try {
    await fs.writeFile(HISTORY_FILE_PATH, JSON.stringify(history, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing history file:', error);
  }
}

// GET all history items
app.get('/api/history', async (req, res) => {
  try {
    const history = await readHistory();
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve search history' });
  }
});

// POST add/update a search history item
app.post('/api/history', async (req, res) => {
  try {
    const { city } = req.body;
    if (!city || typeof city !== 'string' || city.trim() === '') {
      return res.status(400).json({ error: 'City name is required' });
    }

    const trimmedCity = city.trim();
    let history = await readHistory();

    // Remove existing entry for the same city (case-insensitive check) to avoid duplicates
    history = history.filter(item => item.city.toLowerCase() !== trimmedCity.toLowerCase());

    // Insert new search item at the beginning
    const newItem = {
      id: Date.now().toString(),
      city: trimmedCity,
      timestamp: new Date().toISOString()
    };
    history.unshift(newItem);

    // Keep history length reasonable (e.g. last 50 queries)
    if (history.length > 50) {
      history = history.slice(0, 50);
    }

    await writeHistory(history);
    res.status(201).json(history);
  } catch (error) {
    console.error('Error saving history item:', error);
    res.status(500).json({ error: 'Failed to save search history item' });
  }
});

// DELETE a specific search history item by city name
app.delete('/api/history/:city', async (req, res) => {
  try {
    const { city } = req.params;
    let history = await readHistory();

    history = history.filter(item => item.city.toLowerCase() !== city.toLowerCase());
    await writeHistory(history);

    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete history item' });
  }
});

// DELETE clear all history
app.delete('/api/history', async (req, res) => {
  try {
    await writeHistory([]);
    res.json([]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to clear search history' });
  }
});

// Serve frontend static files if we are in production
// (In this setup, we'll keep dev concurrently, but this is great for completeness)
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// Fallback to index.html for SPA routing
app.get('*', async (req, res, next) => {
  try {
    await fs.access(path.join(distPath, 'index.html'));
    res.sendFile(path.join(distPath, 'index.html'));
  } catch (err) {
    // If frontend hasn't been built yet, just let backend run
    next();
  }
});

// Start the server
initHistoryFile().then(() => {
  app.listen(PORT, () => {
    console.log(`History backend server running on port ${PORT}`);
  });
});
