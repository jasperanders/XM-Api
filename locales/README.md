## Internationalization (i18n)

RESTexpress uses the [i18n](https://github.com/mashpie/i18n-node) library.

Lightweight simple translation module with dynamic json storage. Supports plain vanilla node.js apps and should work with any framework (like express, restify and probably more) that exposes an app.use() method passing in res and req objects. Uses common ```__('...')``` syntax in app and templates. Stores language files in json files compatible to [webtranslateit](https://webtranslateit.com) json format. Adds new strings on-the-fly when first used in your app. No extra parsing needed.

This automatically generates new data records from the messages which the project generates.
