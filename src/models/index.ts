import { sequelize } from '../config/sequelizeConnection';
import { Property } from '../models/properties';
import { User } from '../models/users';

User.hasMany(Property, { foreignKey: 'user_id', as: 'properties' });
Property.belongsTo(User, { foreignKey: 'user_id', as: 'owner' });

export default {
  sequelize,
  User,
  Property,
};
