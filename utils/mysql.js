const mysql = require('mysql');
const config = require('config');

const con = mysql.createPool(config.get('mysql_db'));

const MySQL = {
	query(query, values) {
		return new Promise((resolve, reject) => {
			con.query(query, values, (err, res) => {
				if (err) {
					reject(err);
				}
				resolve(res);
			});
		});
	}
}

module.exports = MySQL;