import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { User } from './userModel.js';

export const Cart = sequelize.define('carts', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, references: { model: User, key: "id" }, allowNull: false },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  timestamps: false,
});