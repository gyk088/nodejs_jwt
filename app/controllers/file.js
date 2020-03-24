const { File } = require('../models');

const get = async (req, res) => {
  const { id } = req.params;

  const file = await File.findByPk(id);
  res.json(file);
};

const download = async (req, res) => {
  const { id } = req.params;

  const file = await File.download(id);

  if (file.name) {
    res.download(file.path, file.name);
  } else {
    res.status(404).send('error');
  }
};

const list = async (req, res) => {
  // eslint-disable-next-line camelcase
  const { list_size, page } = req.query;

  const files = await File.getPage(list_size, page);

  res.json(files);
};

const remove = async (req, res) => {
  const { id } = req.params;

  const ok = await File.remove(id);

  if (ok) {
    res.send('ok');
  } else {
    res.status(404).send('error');
  }
};

const upload = async (req, res) => {
  const files = [];
  if (req.files) {
    const keys = Object.keys(req.files);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i <= keys.length - 1; i++) {
      // eslint-disable-next-line no-await-in-loop
      const file = await File.upload(req.files[keys[i]]);
      files.push(file);
    }
  }

  res.json(files);
};

const update = async (req, res) => {
  let ok;
  if (req.files && req.params.id) {
    const keys = Object.keys(req.files);
    ok = await File.rewrite(req.files[keys[0]], req.params.id);
  }

  if (ok) {
    res.send('ok');
  } else {
    res.status(404).send('error');
  }
};

module.exports = {
  get, download, list, remove, update, upload,
};
