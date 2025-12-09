
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' })); // Support large payloads if needed
app.use(express.static(path.join(__dirname, 'build'))); // Serve the React App
app.use('/assets', express.static(path.join(__dirname, 'public/assets'))); // Serve Uploads

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'public/assets/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Sanitize filename and add timestamp to prevent caching issues
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'upload-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage: storage });

// --- API ROUTES ---

// 1. Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 2. Get Data (Read from JSON file)
const DATA_FILE = path.join(__dirname, 'server-data.json');

app.get('/api/data', (req, res) => {
  if (fs.existsSync(DATA_FILE)) {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    res.json(JSON.parse(data));
  } else {
    // If no server data exists yet, return empty object (frontend will use defaults)
    res.json({});
  }
});

// 3. Save Data (Write to JSON file)
app.post('/api/data', (req, res) => {
  const newData = req.body;
  fs.writeFileSync(DATA_FILE, JSON.stringify(newData, null, 2));
  res.json({ success: true });
});

// 4. Upload Image
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  // Return the public URL
  const publicUrl = `/assets/uploads/${req.file.filename}`;
  res.json({ url: publicUrl });
});

// Fallback for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Uploads directory: ${uploadDir}`);
});
