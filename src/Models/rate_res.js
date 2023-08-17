import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class rate_res extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    res_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'restaurants',
        key: 'res_id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date_rate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'rate_res',
    timestamps: false,
    indexes: [
      {
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "res_id",
        using: "BTREE",
        fields: [
          { name: "res_id" },
        ]
      },
    ]
  });
  }
}
