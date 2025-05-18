// server/routes/stats.js or in your main router file
const express = require('express');
const router = express.Router();
const Concert = require('../models/Concerts');
const Venue = require('../models/Venues');

router.get('/getConcertStats', async (req, res) => {
  try {
    const result = await Concert.aggregate([
      {
        $lookup: {
          from: 'venues',
          localField: 'Venue',
          foreignField: 'Name',
          as: 'venueDetails'
        }
      },
      { $unwind: '$venueDetails' },
      {
        $group: {
          _id: {
            artist: '$Artist',
            city: '$venueDetails.City'
          },
          concertCount: { $sum: 1 }
        }
      },
      {
        $sort: { concertCount: -1 }
      }
    ]);

    res.json(result);
  } catch (err) {
    console.error("Aggregation error:", err);
    res.status(500).json({ error: "Failed to fetch stats." });
  }
});

module.exports = router;
