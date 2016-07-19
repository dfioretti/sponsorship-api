#!/bin/bash

cp ~/code/teneo-apps/sponsorship-client/public/dist/js/app.* ~/code/teneo-apps/sponsorship-api/public/dist/js
git push heroku multi:master
