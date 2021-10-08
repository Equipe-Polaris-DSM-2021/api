import { Request, Response } from "express";
import Landsat from "../models/Landsat";
import { DEV_SEED } from "../../services/earthSearchAPI";
import 'dotenv/config'

class SatSearchController {
  async index(req: Request, res: Response) {
    try {
      const { bbox, cloudCover, date_initial, date_final } = req.body

      const period = `${date_initial}/${date_final}`

      const inputBody = {
        "bbox": bbox,
        "time": period,
        "intersects": null,
        "query": {
          "eo:cloud_cover": {
            "lt": cloudCover
          }
        },
        "sort": [
          {
            "field": "eo:cloud_cover",
            "direction": "desc"
          }
        ]
      };

      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/geo+json'

      };

      const response = await DEV_SEED.post(
        '/stac/search',
        inputBody,
        { headers }
      )

      return res.json(response.data)
    } catch (err) {
      console.log(err)
    }
  }



  // try {
  //   const { bbox, cloudCover, date_initial, date_final } = req.body

  //   const imagesLandsat = await Landsat.find({
  //     'properties.eo:cloud_cover': {
  //       '$lte': cloudCover
  //     },
  //     'properties.datetime': {
  //       '$gte': date_initial,
  //       '$lte': date_final
  //     }
  //   })

  //   let i:number = 0;

  //   const features = imagesLandsat.filter((doc:any) => {
  //     if (
  //       ! ( doc.bbox[2] <= bbox[0] && doc.bbox[3] >= bbox[1] ) || 
  //       ! ( doc.bbox[0] >= bbox[2] && doc.bbox[1] >= bbox[3] )
  //     ) {
  //       i= i + 1
  //       return doc
  //     }
  //   })

  //   console.log(i)

  //   return response.json({ "features": features })

  // } catch (err) {
  //   // console.log(err)
  //   return response.json({ "message": err })
  // }


}

export default new SatSearchController;