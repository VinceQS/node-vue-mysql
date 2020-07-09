import $leaf from 'leaflet'
import 'leaflet/dist/leaflet.css'

const createMap = (divId, options) =>{
    let map = $leaf.map(divId, options);
    return map;
}
export default createMap 