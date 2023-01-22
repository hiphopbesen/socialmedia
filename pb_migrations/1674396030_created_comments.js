migrate((db) => {
  const collection = new Collection({
    "id": "0xocaibn4ckeq9l",
    "created": "2023-01-22 14:00:30.929Z",
    "updated": "2023-01-22 14:00:30.929Z",
    "name": "comments",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "r7mgmrnc",
        "name": "comment",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": 1,
          "max": 400,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "cszu9eod",
        "name": "user",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false
        }
      },
      {
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
  const collection = dao.findCollectionByNameOrId("0xocaibn4ckeq9l");

  return dao.deleteCollection(collection);
})
