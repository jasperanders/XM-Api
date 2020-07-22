## API

When you generate an endpoint like "article", different files are created in /api as well as in /test

```sh
yarn run generate
```

It creates and adapts the following files

```sh
✔  ++ /test/api/article.test.js
✔  ++ /src/api/article/acl.js
✔  ++ /src/api/article/index.js
✔  ++ /src/api/article/model.js
✔  ++ /src/api/article/controller.js
✔  _+ /src/api/index.js
✔  _+ /src/api/index.js
✔  _+ /src/api/index.js
✔  _+ /src/api/acl.js
✔  _+ /src/api/acl.js
```
