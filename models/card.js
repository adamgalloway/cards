'use strict';

var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

var fields = {
	name: { type: String, required: true },
	notes: { type: String },
	cardType: { type: String, required: true },
        user: { type: String, required: true },
	active: { type: Boolean },
	created: { type: Date , default: Date.now } 
};

var cardSchema = new Schema(fields);

cardSchema.index({ name: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Card', cardSchema);
