import { Request, Response } from "express";
import Landsat from "../models/Landsat";
import 'dotenv/config'

class SatSearchController {
  async index(request: Request, response: Response) {
    try {
      const { bbox, cloudCover, date_initial, date_final } = request.body
      
      const imagesLandsat = await Landsat.find({
        'properties.eo:cloud_cover': {
            '$lte': cloudCover
        },
        'properties.datetime': {
            '$gte': date_initial, 
            '$lte': date_final
        }
    })
      
      return response.json({"features": imagesLandsat})

    } catch (err) {
      // console.log(err)
      return response.json({ "message": err })
    }
  }
}

export default new SatSearchController;