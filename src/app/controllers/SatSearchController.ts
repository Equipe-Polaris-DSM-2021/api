import { Request, Response } from "express";
import fetch from 'node-fetch';

class SatSearchController {
  async index(request:Request, response:Response) {
    const inputBody = `{
      "bbox": [
        -45.8870659,
        23.1702737,
        -45.8921662,
        -23.1713824
      ],
      "time": "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z",
      "intersects": null,
      "query": {
        "eo:cloud_cover": {
          "lt": 50
        }
      },
      "sort": [
        {
          "field": "eo:cloud_cover",
          "direction": "desc"
        }
      ]
    }`;
    const headers = {
      'Content-Type':'application/json',
      'Accept':'application/geo+json'
    
    };
    
    fetch('https://earth-search.aws.element84.com/v0/search',
    {
      method: 'POST',
      body: inputBody,
      headers: headers
    })
    .then(function(res) {
        return res.json();
    }).then(function(body) {
      response.json(body);
    });
  }
}

export default new SatSearchController;