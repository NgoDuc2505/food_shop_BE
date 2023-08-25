import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class users extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    user_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    full_name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    facebook_app_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: true,
    paranoid: true,
    updatedAt:false,
    createdAt: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
