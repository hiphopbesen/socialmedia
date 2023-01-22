migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0xocaibn4ckeq9l")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8jjnwtpf",
    "name": "post",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "collectionId": "p9s9rnqly1tll1p",
      "cascadeDelete": true
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0xocaibn4ckeq9l")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8jjnwtpf",
    "name": "post",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "collectionId": "p9s9rnqly1tll1p",
      "cascadeDelete": false
    }
  }))

  return dao.saveCollection(collection)
})
