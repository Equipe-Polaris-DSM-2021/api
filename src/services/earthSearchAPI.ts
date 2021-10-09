import axios from 'axios';
import 'dotenv/config'

const earthSearchAPI = axios.create({
  baseURL: process.env.EARTH_SEARCH
})

const STAC_API = axios.create({
  baseURL: process.env.STAC_API
})

const DEV_SEED = axios.create({
  baseURL: process.env.DEV_SEED
})

export {earthSearchAPI, STAC_API, DEV_SEED}