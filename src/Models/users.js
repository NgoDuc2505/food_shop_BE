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
        allowNull: false,
        unique : true,
        validate:{
          isEmail: {
            msg: "This field is not an email!!"
          }
        }
      },
      password: {
        type: DataTypes.STRING(20),
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'users',
      timestamps: true,
      createdAt: false,
      updatedAt: false,
      paranoid: true,
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
