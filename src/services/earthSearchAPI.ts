import axios from 'axios';
import 'dotenv/config'

const earthSearchAPI = axios.create({
  baseURL: process.env.EARTH_SEARCH
})

export default earthSearchAPI