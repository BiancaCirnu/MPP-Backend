const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const Concert = require("./models/Concerts")
const User = require("./models/Users")
const Artist = require('./models/Artists')
const Venue = require("./models/Venues")

const app = express()
app.use(express.json())
// Configure CORS to allow requests from your frontend
app.use(cors({
     origin:  "*",
    //origin: ["http://localhost:5173", "http://172.26.128.1:5173/"],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: "*"
}));
app.get('/', (req, res) => {
  res.json({ 
    message: 'Concerts API is running!',
    endpoints: {
      concerts: ['/getConcerts', '/createConcert', '/getConcert/:id', '/updateConcert/:id', '/deleteConcert/:id'],
      artists: ['/getArtists', '/createArtist', '/getArtist/:id', '/updateArtist/:id', '/deleteArtist/:id'],
      venues: ['/getVenues', '/createVenue', '/getVenue/:id', '/updateVenue/:id', '/deleteVenue/:id'],
      users: ['/createUser']
    }
  });
});

// Use environment variable for MongoDB connection or fallback to localhost
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/ConcertsAppDB"

// Replace your current mongoose.connect with this:
let cachedConnection = null;

async function connectToDatabase() {
  if (cachedConnection) {
    return cachedConnection;
  }
  
  try {
    const connection = await mongoose.connect(mongoUri, {
      bufferCommands: false,
      maxPoolSize: 1
    });
    cachedConnection = connection;
    console.log("Connected to MongoDB");
    return connection;
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}

// Call this in each route handler or use middleware
app.use(async (req, res, next) => {
  await connectToDatabase();
  next();
});

// manage concerts
app.post("/createConcert", (request, response) => {
    Concert.create(request.body)
        .then(concert => response.json(concert))
        .catch(error => response.json(error))
})

app.get('/getConcerts', (request, response) => {
    Concert.find({})
        .then(concert => response.json(concert))
        .catch(error => response.json(error))
})

app.get('/getConcert/:id', (req, res) => {
    const id = req.params.id;
    Concert.findById(id)
        .then(concert => res.json(concert))
        .catch(error => res.json(error))
})

app.patch('/updateConcert/:id', (request, response) => {
    const id = request.params.id;
    Concert.findByIdAndUpdate(id, request.body, { new: true })
        .then(updatedConcert => response.json(updatedConcert))
        .catch(error => response.status(500).json({ error: "Failed to update concert", details: error }));
})

app.delete("/deleteConcert/:id", (request, response) => {
    const id = request.params.id;
    Concert.findByIdAndDelete(id)
        .then(() => response.status(200).json({ message: "Concert deleted successfully" }))
        .catch(error => response.status(500).json({ error: "Failed to delete concert", details: error }));
})

// manage artists
app.get('/getArtists', (request, response) => {
    Artist.find({})
        .then(artist => response.json(artist))
        .catch(error => response.json(error))
})

app.get('/getArtist/:id', (req, res) => {
    const id = req.params.id;
    Artist.findById(id)
        .then(artist => res.json(artist))
        .catch(error => res.json(error))
})

app.post('/createArtist', (request, response) => {
    Artist.create(request.body)
        .then(artist => response.json(artist))
        .catch(error => response.json(error))
})

app.patch('/updateArtist/:id', (request, response) => {
    const id = request.params.id;
    Artist.findByIdAndUpdate(id, request.body, { new: true })
        .then(updatedArtist => response.json(updatedArtist))
        .catch(error => response.status(500).json({ error: "Failed to update artist", details: error }));
})

app.delete("/deleteArtist/:id", (request, response) => {
    const id = request.params.id;
    Artist.findByIdAndDelete(id)
        .then(() => response.status(200).json({ message: "Artist deleted successfully" }))
        .catch(error => response.status(500).json({ error: "Failed to delete artist", details: error }));
})

// manage venues
app.post("/createVenue", (request, response) => {
    Venue.create(request.body)
        .then(venue => response.json(venue))
        .catch(error => response.status(400).json({ 
            error: "Failed to create venue", 
            details: error.message 
        }));
})

app.get('/getVenues', (request, response) => {
    Venue.find({})
        .then(venues => response.json(venues))
        .catch(error => response.json(error))
})

app.get('/getVenue/:id', (req, res) => {
    const id = req.params.id;
    Venue.findById(id)
        .then(venue => res.json(venue))
        .catch(error => res.json(error))
})

app.patch('/updateVenue/:id', (request, response) => {
    const id = request.params.id;
    Venue.findByIdAndUpdate(id, request.body, { new: true })
        .then(updatedVenue => response.json(updatedVenue))
        .catch(error => response.status(500).json({ 
            error: "Failed to update venue", 
            details: error 
        }));
})

app.delete("/deleteVenue/:id", (request, response) => {
    const id = request.params.id;
    Venue.findByIdAndDelete(id)
        .then(() => response.status(200).json({ message: "Venue deleted successfully" }))
        .catch(error => response.status(500).json({ 
            error: "Failed to delete venue", 
            details: error 
        }));
})

// manage user
app.post("/createUser", (request, response) => {
    User.create(request.body)
        .then(user => response.json({ 
            message: "User created successfully", 
            userId: user._id 
        }))
        .catch(error => response.status(400).json({ 
            error: "Failed to create user", 
            details: error.message 
        }));
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`)
})

module.exports = app; 
