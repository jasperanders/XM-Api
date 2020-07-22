## Services

Services are expandable modules that can be added or removed. Dependencies between services should be avoided.

```bash
|-- services
    |-- auth
    |-- express
    |-- mongoose
    |-- request
    |-- response
    |-- sendgrid
```

If the module also offers the possibility to extend it, you can create subfolders like plugins. For example with mongoose

```bash
|-- services
    |-- mongoose
        |-- plugins
            |-- filter.js
            |-- gravatar.js
            |-- ownership.js
            |-- paginate.js
        |-- index.js  
```
