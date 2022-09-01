import { Input } from 'antd'
import { doConnect } from '../../crud/connectors'
import { DocDetails } from '../../components/docs'

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
