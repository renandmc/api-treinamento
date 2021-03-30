module.exports = {
  host: process.env.DB_HOST || 'ec2-34-225-167-77.compute-1.amazonaws.com', //'localhost',
  username: process.env.DB_USERNAME || 'ojvureaantkegl', //'postgres',
  password: process.env.DB_PASSWORD || 'd1ef302ea7effa696005afab4712501a54cdef15c59f9ed2a1abc9655af6d79d', //'root',
  database: process.env.DB_DATABASE || 'df6sjmdfbr9cod', //'api-governanca',
  dialect: 'postgres',
  migrationStorageTableName: 'sequelize_meta',
  define: {
    timestamps: true,
    underscored: true
  },
  dialectOptions: {
    ssl: { rejectUnauthorized: false }
  },
  pool: {
    max: 20,
    min: 0,
    idle: 5000
  }
};

// URL postgresql Heroku
// url:       postgres://kiwsshxxeetpdb:bde3d10e552811148cc87a26fa8274877b9d371afff75ccbf5bf395af7f4816b@ec2-52-86-73-86.compute-1.amazonaws.com:5432/dag0ijg0bgsn3s
// host:      ec2-52-86-73-86.compute-1.amazonaws.com
// username:  kiwsshxxeetpdb
// password:  bde3d10e552811148cc87a26fa8274877b9d371afff75ccbf5bf395af7f4816b
// database:  dag0ijg0bgsn3s