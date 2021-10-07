import { Request, Response } from "express";
import Landsat from "../models/Landsat";
import 'dotenv/config'

class SatSearchController {
  async index(request: Request, response: Response) {
    try {
      const { bbox, cloudCover, time } = request.body
      
      const imagesLandsat = await Landsat.find()
      
      return response.json({"features": imagesLandsat})

    } catch (err) {
      // console.log(err)
      return response.json({ "message": err })
    }
  }
}

export default new SatSearchController;