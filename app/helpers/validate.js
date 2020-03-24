
// eslint-disable-next-line no-useless-escape
const mail = (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);

module.exports = { mail };
