migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p9s9rnqly1tll1p")

  // remove
  collection.schema.removeField("skfdv21g")

  return dao.saveCollection(collection)
}, (db) => {
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

  return dao.saveCollection(collection)
})
