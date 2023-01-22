migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p9s9rnqly1tll1p")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "skfdv21g",
    "name": "published",
    "type": "date",
    "required": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // add
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p9s9rnqly1tll1p")

  // remove
  collection.schema.removeField("skfdv21g")

  // remove
  collection.schema.removeField("56l0mcmq")

  return dao.saveCollection(collection)
})
