// eslint-disable-next-line no-undef
print(
	'Start #################################################################'
);
// // eslint-disable-next-line no-undef
// db = db.getSiblingDB('events_db');
//
// // eslint-disable-next-line no-undef
// db.createCollection('users');
//
// // eslint-disable-next-line no-undef
// db.users.insert({
// 	name: 'Denys',
// 	email: 'example@gmail.com',
// 	password: '12345768'
// });
// eslint-disable-next-line no-undef
db.getSiblingDB('admin').auth(
	process.env.MONGO_INITDB_ROOT_USERNAME,
	process.env.MONGO_INITDB_ROOT_PASSWORD
);
// eslint-disable-next-line no-undef
db.createUser({
	user: process.env.MONGO_USER,
	pwd: process.env.MONGO_PASSWORD,
	roles: ['readWrite']
});

// eslint-disable-next-line no-undef
print('END #################################################################');
