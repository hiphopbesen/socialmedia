migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p9s9rnqly1tll1p")

  // remove
  collection.schema.removeField("vqnjmuww")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lhd3so8j",
    "name": "image",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p9s9rnqly1tll1p")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vqnjmuww",
    "name": "image",
    "type": "url",
    "required": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  // remove
  collection.schema.removeField("lhd3so8j")

  return dao.saveCollection(collection)
})
