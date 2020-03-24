/* eslint-disable no-param-reassign */
const { DataTypes } = require('sequelize');
const fs = require('fs');
const sequelize = require('../sequelize');


const File = sequelize.define('file', {
  name: DataTypes.STRING,
  ext: DataTypes.STRING,
  type: DataTypes.STRING,
  size: DataTypes.INTEGER,
}, {});

File.getPage = async (pageCount = 10, page = 1) => {
  const files = await File.findAll({ offset: (page - 1) * pageCount, limit: +pageCount });
  const count = await File.count();
  return { files, count };
};

File.upload = async (file) => {
  const fileNameArr = file.name.split('.');
  const ext = fileNameArr.pop();
  const fileName = fileNameArr.join('.');

  const result = await File.build({
    name: fileName,
    type: file.mimetype,
    size: file.size,
    ext,
  }).save();

  try {
    file.mv(`${__dirname}/../../uploades/${result.id}`);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }

  return result;
};

File.rewrite = async (file, id) => {
  if (id === undefined) {
    return 0;
  }

  const fileNameArr = file.name.split('.');
  const ext = fileNameArr.pop();
  const fileName = fileNameArr.join('.');

  const result = await File.update({
    name: fileName,
    type: file.mimetype,
    size: file.size,
    ext,
  }, {
    where: {
      id,
    },
  });

  if (result[0]) {
    try {
      file.mv(`${__dirname}/../../uploades/${id}`);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }

  return result[0];
};

File.remove = async (id) => {
  const result = File.destroy({
    where: {
      id,
    },
  });

  try {
    fs.unlinkSync(`${__dirname}/../../uploades/${id}`);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  return result;
};

File.download = async (id) => {
  const file = await File.findByPk(id);
  return {
    name: file ? `${file.name}.${file.ext}` : null,
    path: `${__dirname}/../../uploades/${id}`,
  };
};

module.exports = File;
