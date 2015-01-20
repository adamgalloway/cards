'use strict';

var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

var fields = {
	name: { type: String, required: true, unique: true },
	description: { type: String },
	tags: [String]
};

var cardTypeSchema = new Schema(fields);

module.exports = mongoose.model('CardType', cardTypeSchema);
