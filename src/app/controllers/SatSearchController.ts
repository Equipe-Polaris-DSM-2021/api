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

      const features = await imagesLandsat.filter((doc:any) => {
        if (
          doc.bbox[0] <= bbox[0] && doc.bbox[2] >= bbox[0] || 
          doc.bbox[1] <= bbox[1] && doc.bbox[3] >= bbox[1]
        ){
          return doc
        }
      })

      return response.json({ "features": features })

    } catch (err) {
      // console.log(err)
      return response.json({ "message": err })
    }
  }
}

export default new SatSearchController;