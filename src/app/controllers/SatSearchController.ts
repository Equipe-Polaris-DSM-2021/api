import { Request, Response } from "express";
import fetch from 'node-fetch';

class SatSearchController {
  async index(request:Request, response:Response) {
    const {bbox, cloudCover, time} = request.body
    
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
      'Content-Type':'application/json',
      'Accept':'application/geo+json'
    
    };
    
    fetch('https://earth-search.aws.element84.com/v0/search', {
      method: 'POST',
      body: inputBody,
      headers: headers
    }).then(function(res) {
        return res.json();
    }).then(function(body) {
      response.json(body);
    });
  }
}

export default new SatSearchController;