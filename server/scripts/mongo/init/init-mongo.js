// eslint-disable-next-line no-undef
print(
	'Start #################################################################'
);
// db = db.getSiblingDB('events_db');
// db.createUser({
// 	user: 'app_user',
// 	pwd: 'api1234',
// 	roles: [{ role: 'dbOwner', db: 'events_db' }]
// });
// db.createCollection('adminUsers');

// db.getSiblingDB('admin').auth('root', 'rootpasswd');
// db.createUser({
// 	user: 'testUser',
// 	pwd: 'userpasswd',
// 	roles: ['readWrite']
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
