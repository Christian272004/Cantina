import { sequelize } from '../config/db.js';
import { User } from './userModel.js';
import { Producte } from './ProductesModel.js';
import { Cart } from './CartsModel.js';
import { CartItem } from './CartItemsModel.js';

export { sequelize, User, Producte, Cart, CartItem };