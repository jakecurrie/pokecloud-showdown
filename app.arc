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
  rarity String

collections
  pk *String  # userId
  sk **String # cardId
  quantity Number

pokecoins
  userId *String
  balance Number

trainers
  id *String
  name String
  imageURL String

battles
  userId *String
  battleId **String
  trainerId String
  won Number # 1 if won, else 0

achievements
  userId *String
  achievementId **String
  name String
  badgeURL String # if we want to display a badge image somewhere for each achievement

note
  pk *String  # userId
  sk **String # noteId


