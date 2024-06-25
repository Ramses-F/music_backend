const User = require('../models/UserModel');
const Code = require('../models/CodeModels')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const nodemailer = require ( "nodemailer" );
const schedule = require('node-schedule');

exports.registerUser = async (req, res) => {
    const { nom, prenom, mdp, tel, email } = req.body;

    try {
        // Input validation
        if (!nom || !prenom || !mdp || !tel || !email) {
            return res.status(400).json({ success: false, message: 'Tous les champs sont obligatoires' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Utilisateur déjà existant' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(mdp, salt);

        // Create a new user
        const newUser = new User({
            nom,
            prenom,
            mdp: hashedPassword,
            tel,
            email,
            statut: true
        });

        // Save the user to the database
        await newUser.save();

        // Generate a random 6-digit code
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Save the code in the Code table
        const codeEntry = new Code({
            code: verificationCode,
            dateAjout: new Date()
        });
        await codeEntry.save();

        // Setup nodemailer transport
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'falletkamagate3@gmail.com', // Remplacez par votre email
                pass: 'qqjt zniy mdcc cedc'   // Remplacez par votre mot de passe ou un mot de passe d'application
            }
        });

        // Email options
        const mailOptions = {
            from: 'falletkamagate3@gmail.com', // Remplacez par votre email
            to: email,
            subject: 'Votre code de vérification',
            text: `Votre code de vérification est : ${verificationCode}. Il expirera dans 2 minutes.`
        };

        // Send email
        await transporter.sendMail(mailOptions);

        // Schedule code deletion after 2 minutes
        schedule.scheduleJob(new Date(Date.now() + 2 * 60000), async () => {
            await Code.deleteOne({ _id: codeEntry._id });
        });

        res.status(201).json({ success: true, message: 'Utilisateur enregistré avec succès. Un code de vérification a été envoyé à votre adresse email.', user: newUser });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ success: false, message: 'Erreur serveur', error: error.message });
    }
};

exports.verifyCode = async (req, res) => {
    const { code } = req.body;

    try {
        // Input validation
        if (!code) {
            return res.status(400).json({ success: false, message: 'Le code est obligatoire' });
        }

        // Check if the code exists and is valid
        const codeEntry = await Code.findOne({ code });

        if (!codeEntry) {
            return res.status(400).json({ success: false, message: 'Code invalide ou expiré' });
        }

        // Code is valid
        res.status(200).json({ success: true, message: 'Code vérifié avec succès' });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ success: false, message: 'Erreur serveur', error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, mdp } = req.body;

    try {
        // Recherche de l'utilisateur dans la base de données
        const user = await User.findOne({ email });

        // Vérification de l'existence de l'utilisateur et de la correspondance du mot de passe
        if (!user || !(await bcrypt.compare(mdp, user.mdp))) {
            return res.status(401).json({ success: false, message: 'Email ou mot de passe incorrect' });
        }

        // Génération du token JWT
        const token = jwt.sign({ userId: user._id }, 'your_secret_key_here', { expiresIn: '1h' });

        // Retourner le token et l'ID utilisateur
        res.status(200).json({ success: true, message: 'Connexion réussie', token, userId: user._id });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ success: false, message: 'Erreur serveur', error: error.message });
    }
};


exports.getUsagerById = async (req, res) => {
    const userId = req.params.id;
    console.log('User ID:', userId); // Ajoutez ce log pour vérifier la valeur de l'ID utilisateur
  
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "ID utilisateur invalide" });
    }
  
    try {
      const usager = await User.findById(userId);
      if (!usager) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
      res.json(usager);
    } catch (err) {
      console.error(err); // Log l'erreur pour le débogage
      res.status(500).json({ message: "Erreur serveur interne" });
    }
  };

  exports.resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        // Input validation
        if (!email || !newPassword) {
            return res.status(400).json({ success: false, message: 'Email et nouveau mot de passe requis' });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update user's password
        user.mdp = hashedPassword;
        await user.save();

        res.status(200).json({ success: true, message: 'Mot de passe réinitialisé avec succès' });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ success: false, message: 'Erreur serveur', error: error.message });
    }
};

  
