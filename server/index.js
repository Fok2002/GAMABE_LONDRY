import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 5000;
const dataDir = path.join(__dirname, 'data');
const bookingsPath = path.join(dataDir, 'bookings.json');

fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(bookingsPath)) {
  fs.writeFileSync(bookingsPath, JSON.stringify([], null, 2), 'utf8');
}

const readBookings = () => {
  try {
    const raw = fs.readFileSync(bookingsPath, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    return [];
  }
};

const saveBookings = (bookings) => {
  fs.writeFileSync(bookingsPath, JSON.stringify(bookings, null, 2), 'utf8');
};

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/bookings', (_req, res) => {
  res.json(readBookings());
});

app.post('/api/bookings', (req, res) => {
  const { name, service, phone, notes } = req.body || {};

  if (!name || !service || !phone) {
    return res.status(400).json({
      error: 'Name, service, and phone are required.',
    });
  }

  const newBooking = {
    id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
    name: String(name).trim(),
    service: String(service).trim(),
    phone: String(phone).trim(),
    notes: notes ? String(notes).trim() : '',
    createdAt: new Date().toISOString(),
  };

  const bookings = readBookings();
  bookings.unshift(newBooking);
  saveBookings(bookings);

  return res.status(201).json({
    message: 'Booking submitted successfully.',
    booking: newBooking,
  });
});

app.listen(PORT, () => {
  console.log(`GAMABE booking server running on http://localhost:${PORT}`);
});
