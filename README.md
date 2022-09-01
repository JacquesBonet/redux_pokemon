# Izberg sample project
React/redux pokemon project

# installation

```bash
npm install
```

# test

```bash
̀npm run test
```

# run

```bash
npm run start
```


# what is interesting in this project

It's a resources oriented projects

The resources are described under the pages directory.

We create a directory for each resource.

The directory name is the resource name.

We have two files in the directory resource:

- file displaying the elements of the resource
- file displaying the details of a resource


## steps to do for managing a REST resource

* define a path representing the resource endpoint
* define a schema describing the fields of the resource
* export a connector permitting to manage the resources

For the list of resources, we have just to write

```jsx
import { doConnect } from '../../crud/connectors'
import { Docs } from '../../components/docs'

const schema = doc => ({
  id: { field: 'name', value: doc.name },
  title: { field: 'name', value: doc.name, type: 'text', required: true },
  height: { field: 'height', value: doc.height, type: 'text', required: true },
  weight: { field: 'weight', value: doc.weight, type: 'text', required: true },
  img: {
    field: 'url',
    value: `https://img.pokemondb.net/artwork/large/${doc.name}.jpg`,
    type: 'image',
    required: true,
  },
})

export default doConnect(schema)(Docs)
```

For the details of the resource, its similar

```jsx
import { Input } from 'antd'
import { doConnect } from '../../crud/connectors'
import { DocDetails } from '../../components/docs/DocDetails'

const empty = {
  id: null,
  name: '',
  height: 0,
  weight: 0,
  url: '',
}

const schema = (doc = empty) => ({
  id: { field: 'id', value: doc.id },
  title: { field: 'name', value: doc.name, required: true, tooltip: 'Pokemon Name', widget: Input },
  height: { field: 'height', value: doc.height, required: true, tooltip: 'Pokemon Height', widget: Input },
  weight: { field: 'weight', value: doc.weight, required: true, tooltip: 'Pokemon weight', widget: Input },
  img: {
    field: 'url',
    value: `https://img.pokemondb.net/artwork/large/${doc.name}.jpg`,
    required: true,
    widget: Input,
  },
})

export default doConnect(schema)(DocDetails)
```

# CRUD architecture

The `crud` directory contains the REST API of the application. 
It's where we find redux codes.
The actions and reducers works with any kind of REST resources.

So if you add a new resource, its not neccessary to write actions, reducers, you can use the already existing actions and reducers.

This is possible because we provide a new parameter to the actions and reducer: the path describing the resource.

The path permits to identify the store of the resource

We use redux middleware for the fetch and the search.


# Router architecture

The router take the path of the resources to build the routing engine.
We don't have to modify the router if we add a new resource. Its automatic

# UX architecture
We use ant-design library for the UX.

We use the schema associated to each resource to build the UX. 


# Infinite scrolling

The project provide infinite scrolling to display the list of objets


# To finish

The project is far to be finish to be clean.

Many things to do

Concerning the update of a resource, I get a security exception





