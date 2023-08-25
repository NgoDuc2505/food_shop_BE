import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class food extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    food_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    food_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    descb: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'food_type',
        key: 'type_id'
      }
    }
  }, {
    sequelize,
    tableName: 'food',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "food_id" },
        ]
      },
      {
        name: "type_id",
        using: "BTREE",
        fields: [
          { name: "type_id" },
        ]
      },
    ]
  });
  }
}
