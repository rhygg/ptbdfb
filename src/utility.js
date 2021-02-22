const Canvas = require('canvas');
const { splitMessage, Util } = require("discord.js");
const request = require("request");
const fs = require('fs');

var Crawler = require("crawler");

let rawdata = fs.readFileSync(__dirname + '/helpers/helpers.json');
let Game = JSON.parse(rawdata);

module.exports = {


shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	},
	moneyFormat(amount) {
		var formatter = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		});

		return formatter.format(amount);
	},
	getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	moneyFormatW(labelValue) {
		// Nine Zeroes for Billions
		return Math.abs(Number(labelValue)) >= 1.0e+9
			? parseFloat(Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"

			// Six Zeroes for Millions
			: Math.abs(Number(labelValue)) >= 1.0e+6
				? parseFloat(Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"

				// Three Zeroes for Thousands
				: Math.abs(Number(labelValue)) >= 1.0e+3
					? parseFloat(Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"
					: Math.abs(Number(labelValue));

	},
	isNumeric(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	},
	NotNumberCheck(value) {
		if (!this.isNumeric(value) || value === undefined || value === null) {
			value = 0;
		}
		return parseInt(value);
	}
}
