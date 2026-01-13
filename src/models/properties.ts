import { ModelDefined, DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelizeConnection';
import {
  PropertyCreationAttributes,
  PropertyInterface,
} from '../interfaces/property.interface';
import {
  PropertyType,
  PropertyCategory,
  PropertyStatus,
} from '../types/property.types';

export const Property: ModelDefined<
  PropertyInterface,
  PropertyCreationAttributes
> = sequelize.define(
  'properties',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },

    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Title is required' },
        len: {
          args: [3, 50],
          msg: 'Title must be between 3 and 50   characters',
        },
      },
    },

    propertyType: {
      type: DataTypes.ENUM(...Object.values(PropertyType)),
      allowNull: false,
      validate: {
        isIn: {
          args: [Object.values(PropertyType)],
          msg: `Property type must be one of ${Object.values(PropertyType).join(', ')}`,
        },
      },
    },

    propertyCategory: {
      type: DataTypes.ENUM(...Object.values(PropertyCategory)),
      allowNull: false,
      validate: {
        isIn: {
          args: [Object.values(PropertyCategory)],
          msg: `Property category must be one of ${Object.values(PropertyCategory).join(', ')}`,
        },
      },
    },

    propertyStatus: {
      type: DataTypes.ENUM(...Object.values(PropertyStatus)),
      allowNull: false,
      validate: {
        isIn: {
          args: [Object.values(PropertyStatus)],
          msg: `Property status must be one of ${Object.values(PropertyStatus).join(', ')}`,
        },
      },
    },

    street: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    city: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },

    country: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },

    lat: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: true,
    },

    lng: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: true,
    },

    price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: 'Price must be a positive value',
        },
      },
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    parlours: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      validate: { min: 0 },
    },

    bedrooms: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      validate: { min: 0 },
    },

    bathrooms: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      validate: { min: 0 },
    },

    toilets: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      validate: { min: 0 },
    },

    kitchens: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      validate: { min: 0 },
    },

    areaSize: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },

    fenced: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },

    garage: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },

    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
  },
  {
    tableName: 'properties',
    timestamps: true,
    underscored: true,
  }
);
