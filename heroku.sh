#!/bin/bash

cp -r ~/code/teneo-apps/sponsorship-client/public/ ~/code/teneo-apps/sponsorship-api/public/
git add .
git commit -a -m "new app build"
git push origin multi
git push heroku multi:master

heroku pg:reset DATABASE --confirm teneosponsorship
heroku pg:push teneo_ews_development --app teneosponsorship DATABASE
