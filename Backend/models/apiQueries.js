import { User, Producte } from './models.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

export const registerUser = async (userData) => {
    try {
        const { nom, email, password } = userData;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            nom,
            email,
            password: hashedPassword
        });
        return newUser;
    } catch (error) {
        throw new Error('Error registering user: ' + error.message);
    }
}

export const loginUser = async (email, password) => {
    try {
        const user = await User.findOne({
            attributes: ['id', 'nom', 'email', 'password'],
            where: { email }
        });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return null;
        }
        return user;
    } catch (error) {
        throw new Error('Error logging in user: ' + error.message);
    }
}

export const getProductesModel = async () => {
    try {
        const productes = await Producte.findAll();
        return productes;
    } catch (error) {
        throw new Error('Error retrieving productes: ' + error.message);
    }
}

export const generateAuthToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export const verifyAuthToken = (token) => {
  try {
    if (!token) {
      return { authenticated: false };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { authenticated: true, userId: decoded.id };
  } catch (err) {
    console.error('Error al verificar el token:', err.message);
    return { authenticated: false };
  }
};