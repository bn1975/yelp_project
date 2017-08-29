module.exports = {
  // DB Config for development mode

  // OUR LOCAL SETUP FOR OUR DB
  development: {
    client: 'pg',
    connection: 'postgres://localhost/yelp_project'
  },
  // OUR PRODUCTION/LIVE SETUP
  production: {}
}
