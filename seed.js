// seed.js
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
require('dotenv').config();
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const Artist = require('./models/Artists');
const Venue = require('./models/Venues');
const Concert = require('./models/Concerts');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ConcertsAppDB';

const seedDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');

    // Clear collections
    await Artist.deleteMany();
    await Venue.deleteMany();
    await Concert.deleteMany();

    // Seed Artists
    const artists = [];
    for (let i = 0; i < 100; i++) {
      sleep(1);
      artists.push(await Artist.create({
        Name: faker.music.songName() + " " + faker.person.lastName(),
        Genre: faker.music.genre(),
        MonthlyListeners: faker.number.int({ min: 10000, max: 1000000 }),
      }));
    }

    // Seed Venues
    const venues = [];
    for (let i = 0; i < 100; i++) {
      sleep(1);
      venues.push(await Venue.create({
        Name: faker.company.name() + " Arena",
        Address: faker.location.streetAddress(),
        City: faker.location.city(),
        Country: faker.location.country(),
      }));
    }

    // Seed Concerts
    for (let i = 0; i < 100; i++) {
      sleep(1);
      const artist = faker.helpers.arrayElement(artists);
      const venue = faker.helpers.arrayElement(venues);

      await Concert.create({
        Artist: artist.Name,
        Venue: venue.Name,
        Date: faker.date.future(),
        Description: faker.lorem.sentence(),
        PosterURL: faker.image.urlLoremFlickr({ category: 'concert' }),
      });
    }

    console.log('Database seeded!');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDB();
