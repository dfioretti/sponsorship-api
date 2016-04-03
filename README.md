#Teneo Sponsorship API
Backend API for Teneo Sponsorship Prototype

The API is a standalone backend designed to serve data to the React API client.
 

##Dev Setup
The sponsorship-client runs on port :3000, so we have the API server set to run on port :4000

```
bundle install
rails server -p 4000
```

##Production Deploy
Production deploy to Heroku simply push to the Heroku remote.


```
git push heroku mater
```

##Production Database Config
Easy loading of local database to production for staging demos (DATABASE_URL is a local ENV variable to the Heroku postgres server.

```
heroku pg:reset DATABASE_URL
pg_dump --no-acl --no-owner -h localhost teneo_ews_development | heroku pg:psql 
```

	