const bcrypt = require('bcryptjs');
const Admin = require('../models/AdminModels');
const jwt = require('jsonwebtoken');

exports.createAdmin = async (req, res) => {
    const { email, mdp, nom, prenom, tel, poste } = req.body;

    try {
        // Vérifiez si l'email existe déjà
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).send({ message: 'L\'email existe déjà.' });
        }

        // Hash le mot de passe
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(mdp, salt);

        // Crée un nouvel admin
        const newAdmin = new Admin({
            nom,
            prenom,
            tel,
            email,
            poste,
            mdp: hashedPassword,

        });

        // Sauvegarde l'admin dans la base de données
        await newAdmin.save();
        res.status(201).send(newAdmin);
    } catch (error) {
        console.error('Erreur lors de la création de l\'admin:', error);
        res.status(500).send({ message: 'Une erreur est survenue lors de la création de l\'admin.' });
    }
};

// Utilisez la clé secrète directement dans le code
const JWT_SECRET = '76nHvxXVFxFQmWTRILXxdXdWL94vpSYAtYvVhxvfjBY=';

exports.adminLogin = async (req, res) => {
    const { email, mdp } = req.body;

    try {
        // Vérifiez si l'admin existe
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).send({ message: 'Email ou mot de passe incorrect.' });
        }

        // Vérifiez le mot de passe
        const isMatch = await bcrypt.compare(mdp, admin.mdp);
        if (!isMatch) {
            return res.status(400).send({ message: 'Email ou mot de passe incorrect.' });
        }

        // Générer un token JWT
        const token = jwt.sign({ id: admin._id, email: admin.email }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).send({ token, admin });
    } catch (error) {
        console.error('Erreur lors de la connexion de l\'admin:', error);
        res.status(500).send({ message: 'Une erreur est survenue lors de la connexion.' });
    }
};

exports.getAllAdmin = async (req, res) => {
    try {
        // Récupère tous les admins de la base de données
        const admins = await Admin.find();

        // Envoie les admins en réponse
        res.status(200).send(admins);
    } catch (error) {
        console.error('Erreur lors de la récupération des admins:', error);
        res.status(500).send({ message: 'Une erreur est survenue lors de la récupération des admins.' });
    }
};

exports.getAdminById = async (req, res) => {
    const { adminId } = req.params; // Supposant que vous passez l'ID de l'admin dans les paramètres de la requête

    try {
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).send({ message: 'Admin non trouvé.' });
        }

        res.status(200).send(admin);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'admin par ID:', error);
        res.status(500).send({ message: 'Une erreur est survenue lors de la récupération de l\'admin.' });
    }
};
