migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p9s9rnqly1tll1p")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "56l0mcmq",
    "name": "user",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": true
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p9s9rnqly1tll1p")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "56l0mcmq",
    "name": "by",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": true
    }
  }))

  return dao.saveCollection(collection)
})
