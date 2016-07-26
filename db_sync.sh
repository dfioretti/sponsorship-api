#!/bin/bash

heroku pg:reset DATABASE --confirm teneosponsorship
heroku pg:push teneo_ews_development --app teneosponsorship DATABASE
