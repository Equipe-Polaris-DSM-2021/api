import { Request, Response } from "express";
import { DEV_SEED } from "../../services/earthSearchAPI";
import 'dotenv/config'

class SatSearchController {
  async index(req: Request, res: Response) {
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
}

export default new SatSearchController;
