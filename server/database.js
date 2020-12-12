const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_SCHEMA || 'postgres',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'postgres',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    dialectOptions: {
      ssl: process.env.DB_SSL == "true"
    }
  });

const Product = sequelize.define('Product', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },


  job: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageBase64: {
    type: Sequelize.TEXT,
    allowNull: true
  },
});
const Order = sequelize.define('Order', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  id_Product: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  updated_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: true
  },
  finish_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: true
  },
});

module.exports = {
  sequelize: sequelize,
  Order: Order,
  Product: Product
};
