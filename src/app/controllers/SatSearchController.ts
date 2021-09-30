import { Request, Response } from "express";
import earthSearchAPI from "../../services/earthSearchAPI";
import 'dotenv/config'

class SatSearchController {
  async index(request: Request, response: Response) {
    try {
      const { bbox, cloudCover, time } = request.body

      const inputBody = `{
        "bbox": ${bbox},
        "time": ${time},
        "intersects": null,
        "query": {
          "eo:cloud_cover": {
            "lt": ${cloudCover}
          }
        },
        "sort": [
          {
            "field": "eo:cloud_cover",
            "direction": "asc"
          }
        ]
      }`;
      
      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/geo+json'
      };
      
      const featureCollection = await earthSearchAPI.post(
        `/search`,
        inputBody, {
          headers: headers
        }
        )
        
    return response.json(featureCollection.data)
    
  } catch (err) {
    return response.json({"message": err})
    }
    
  }
}

export default new SatSearchController;