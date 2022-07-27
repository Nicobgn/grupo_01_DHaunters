module.exports = (sequelize, dataTypes) => {
  let alias = "Banner";
  let cols = {
    banner_id: {
      type: dataTypes.INTEGER(6),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    image: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: dataTypes.BOOLEAN,
      allowNull: false,
      default: 1,
    },
    created_at: {
      type: dataTypes.DATE(6),
      default: dataTypes.NOW,
      allowNull: false,
    },
    updated_at: {
      type: dataTypes.DATE(6),
      default: dataTypes.NOW,
      allowNull: false,
    },
    deleted: {
      type: dataTypes.BOOLEAN,
      allowNull: false,
      default: 0,
    },
  };
  let config = {
    tableName: "banners",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  };
  const Banner = sequelize.define(alias, cols, config);

  return Banner;
};
