@app
pokecloud-showdown-e314

@aws
runtime nodejs18.x
# concurrency 1
# memory 1152
# profile default
# region us-west-1
# timeout 30

@http
/*
  method any
  src server

@plugins
plugin-remix
  src plugin-remix.js

@static

@tables
user
  pk *String

password
  pk *String # userId

pokemon
  id *String # pokeid
  name **String # pokename
  type String
  move String
  hp Number
  image_url String

collections
  pk *String  # userId
  sk **String # cardId

currency
  userId *String
  balance Number

note
  pk *String  # userId
  sk **String # noteId


