import { Request, Response } from "express";
import Landsat from "../models/Landsat";
import axios from 'axios'
import { DEV_SEED, earthSearchAPI } from "../../services/earthSearchAPI";
import 'dotenv/config'

class SatSearchController {
  async index(req: Request, res: Response) {
    //using DevSeed's API
    try {
      const { satelliteOptions, bbox, cloudCover, date_initial, date_final } = req.body

      const period = `${date_initial}/${date_final}`
    
        let imagesResponse:any = []
        
        for(let satellite of satelliteOptions) {
          console.log(satellite)
          let inputBody = {
            "bbox": bbox,
            "time": period,
            "intersects": null,
            "limit": 50,
            "query": {
              "eo:cloud_cover": {
                "lt": cloudCover
              },
              "collection": {
                "eq": satellite
              }
            },
            "sort": [
              {
                "field": "eo:cloud_cover",
                "direction": "desc"
              }
            ]
          };
    
          let headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/geo+json'
          };
    
          const satCollection = await DEV_SEED.post(
            '/stac/search',
            inputBody,
            { headers }
          )

          imagesResponse.push({[satellite]:satCollection.data})
        }

        return res.json(imagesResponse)
      } catch (err) {
        console.log(err)
      }
    }


  // with crawler method
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