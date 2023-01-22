migrate((db) => {
  const collection = new Collection({
    "id": "p9s9rnqly1tll1p",
    "created": "2023-01-21 14:14:09.022Z",
    "updated": "2023-01-21 14:14:09.022Z",
    "name": "posts",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "jynx7xx6",
        "name": "heading",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": 5,
          "max": 100,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "3yicxg7m",
        "name": "text",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": 10000,
          "pattern": ""
        }
      },
      {
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
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("p9s9rnqly1tll1p");

  return dao.deleteCollection(collection);
})
