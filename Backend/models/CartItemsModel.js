import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { Cart } from './CartsModel.js';
import { Producte } from './ProductesModel.js';

export const CartItem = sequelize.define('cart_item', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  cart_id: { type: DataTypes.INTEGER, references: {model: Cart, key: "id"}, allowNull: false },
  product_id: { type: DataTypes.INTEGER, references: {model: Producte, key: "id"}, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: true },
}, {
  timestamps: false,
});