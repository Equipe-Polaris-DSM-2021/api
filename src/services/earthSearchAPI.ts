import axios from 'axios';
import 'dotenv/config'

const earthSearchAPI = axios.create({
  baseURL: process.env.EARTH_SEARCH
})

const STAC_API = axios.create({
  baseURL: process.env.STAC_API
})

export {earthSearchAPI, STAC_API}