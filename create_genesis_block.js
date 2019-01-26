block = require('./block').block;
block = new block(0, Date(), "Genesis Block", "0");
exports.create_genesis_block = block;