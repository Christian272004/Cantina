import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const Producte = sequelize.define('productes', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nom: { type: DataTypes.STRING, allowNull: false },
  preu: { type: DataTypes.INTEGER, allowNull: false },
  disponible: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: true },
  categoria: { type: DataTypes.ENUM('begudes', 'entrepans', 'per-picar', 'fruita', 'menu', 'especials'), allowNull: false },
  unitats: { type: DataTypes.INTEGER, allowNull: false }
}, {
  timestamps: false,
});