const mongoose = require('mongoose'); 
const axios = require('axios');
const Live = require('../models/liveModels')
require('dotenv').config();

// Fonction pour obtenir les coordonnées géographiques
const getGeolocation = async (address) => {
    const apiKey = '4f5273ca27fc4d928cadf7e5df3127d1';
    const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`);
    if (response.data.results.length > 0) {
      const location = response.data.results[0].geometry;
      return { latitude: location.lat, longitude: location.lng };
    } else {
      throw new Error('Could not fetch geolocation');
    }
  };
  exports.addLive = async (req, res) => {
    try {
      const { lieu, adresse, genre, artiste, contact_artiste, date_live, heure_live, prix_contact, tickets
           } = req.body;

      // Obtenez les coordonnées géographiques à partir de l'adresse
      const { latitude, longitude } = await getGeolocation(adresse);
  
      const liveLocation = new Live({ 
        lieu, adresse, genre, artiste, contact_artiste, date_live, heure_live, prix_contact, tickets, longitude, latitude });
      await liveLocation.save();
      res.status(201).send(liveLocation);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  exports.getAllLives = async (req, res) => {
    try {
      const lives = await Live.find();
      res.status(200).send(lives);
    } catch (error) {
      res.status(500).send({ message: 'Une erreur est survenue lors de la récupération des lives.' });
    }
  };

  exports.countLives = async (req, res) => {
    try {
      const count = await Live.countDocuments(); // Compte le nombre de documents dans la collection Live
      res.status(200).send({ count });
    } catch (error) {
      console.error('Error counting lives:', error);
      res.status(500).send({ message: 'Failed to count live events', error });
    }
  };
  
  
  
  
