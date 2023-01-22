migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p9s9rnqly1tll1p")

  collection.deleteRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p9s9rnqly1tll1p")

  collection.deleteRule = null

  return dao.saveCollection(collection)
})
