migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p9s9rnqly1tll1p")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fe8ykuvx",
    "name": "comments",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": null,
      "collectionId": "0xocaibn4ckeq9l",
      "cascadeDelete": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p9s9rnqly1tll1p")

  // remove
  collection.schema.removeField("fe8ykuvx")

  return dao.saveCollection(collection)
})
