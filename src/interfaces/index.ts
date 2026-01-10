import { Property } from '../models/properties';
import { User } from '../models/users';

User.hasMany(Property, { foreignKey: 'userId', as: 'properties' });
Property.belongsTo(User, { foreignKey: 'userId', as: 'owner' });

export default {
  User,
  Property,
};
