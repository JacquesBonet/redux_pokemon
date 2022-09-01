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
