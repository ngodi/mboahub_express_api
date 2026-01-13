import { ModelDefined, DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelizeConnection';
import {
  UserCreationAttributes,
  UserInterface,
} from '../interfaces/user.interface';
import { UserStatusType } from '../types/user.types';

export const User: ModelDefined<UserInterface, UserCreationAttributes> =
  sequelize.define(
    'users',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      email: {
        type: DataTypes.STRING(25),
        allowNull: false,
        unique: {
          name: 'unique_email',
          msg: 'This email is already taken',
        },
        validate: {
          isEmail: { msg: 'Must be a valid email address' },
        },
      },

      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Password is required' },
          len: {
            args: [8, 255],
            msg: 'Password must be at least 8 characters long',
          },
        },
      },
      emailVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Name is required' },
          len: {
            args: [3, 30],
            msg: 'Name must be between 3 and 30 characters',
          },
        },
      },

      phoneNumber: {
        type: DataTypes.STRING(18),
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Phone number is required' },
          len: {
            args: [9, 18],
            msg: 'Phone number must be betweeb 9 to 18 characters long',
          },
        },
      },

      status: {
        type: DataTypes.ENUM(...Object.keys(UserStatusType)),
        allowNull: false,
        defaultValue: UserStatusType.ACTIVE,
        validate: {
          isIn: {
            args: [Object.keys(UserStatusType)],
            msg: `Status must be one of ${Object.keys(UserStatusType).join(', ')}`,
          },
        },
      },
      city: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      underscored: true,
    }
  );

User.prototype.toJSON = function () {
  const values = { ...this.get() };
  delete values.password;
  return values;
};
