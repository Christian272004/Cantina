import { User, Producte, Cart, CartItem } from './models.js';
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

export const verifyCart = async (userId) => {
    try {
        const cart = await Cart.findOne({
            where: { user_id: userId }
        });
        return cart;
    } catch (error) {
        throw new Error('Error verifying cart: ' + error.message);
    }
};

export const createCart = async (userId) => {
    try {
        const cart = await Cart.create({
            user_id: userId,
            created_at: new Date(),
        });
        return cart;
    } catch (error) {
        throw new Error('Error creating cart: ' + error.message);
    }
}

export const guardarProducto = async (productId, cartId) => {
    try {
        const cartItem = await CartItem.create({
            cart_id: cartId,
            product_id: productId,
            quantity: 1,
        });
        return cartItem;
    } catch (error) {
        throw new Error('Error saving product to cart: ' + error.message);
    }
}

export const producto = async (productId, cartId) => {
    try {
        const cartItem = await CartItem.findOne({
            where: {
                cart_id: cartId,
                product_id: productId
            }
        });
        // Sumar uno si existe
        if (cartItem) {
            cartItem.quantity += 1;
            await cartItem.save();
        } else {
            // Si no existe, crear uno nuevo
            const newCartItem = await CartItem.create({
                cart_id: cartId,
                product_id: productId,
                quantity: 1,
            });
            return newCartItem;
        }
        return cartItem;
    } catch (error) {
        throw new Error('Error finding product in cart: ' + error.message);
    }
}