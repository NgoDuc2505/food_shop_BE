import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class restaurants extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    res_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    res_name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    descb: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'restaurants',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "res_id" },
        ]
      },
    ]
  });
  }
}
