import { Request, Response } from 'express';
const dfd = require("danfojs-node")
const tf = require("@tensorflow/tfjs-node")

class Sentinel2Controller {
  async index(req: Request, res: Response) {
    const Sentinel2_csv_URL: string = 'https://storage.googleapis.com/gcp-public-data-sentinel-2/index.csv.gz'
    dfd.read_csv(
        Sentinel2_csv_URL, {
        hasHeader: false,
        delimiter: ',',
        columnNames: [
          'sensor', 'path', 'row', 'acquisition_date', 'processing_level',
          'ul_lat', 'ul_lon', 'ur_lat', 'ur_lon',
          'lr_lat', 'lr_lon', 'll_lat', 'll_lon',
          'download_url',
          'band_5_gain', 'band_6_gain', 'band_7_gain', 'band_8_gain',
          'sun_elevation', 'sun_azimuth',
          'band_5_download_url', 'band_6_download_url', 'band_7_download_url', 'band_8_download_url'
        ]
      }
      ).then((df: any) => {
    
        df.query({
          column: "path", is: "==", to: "151", inplace: true
        })
    
        df.query({
          column: "row", is: "==", to: "102", inplace: true
        })
    
        df.to_json().then((json: any) => {
          return res.send(JSON.parse(json))
        })
    
      }).catch((err: any) => {
        console.log("=====================\nerror: " + err + "\n=====================")
        return res.json({"message": err})
      })
  }
}

export default new Sentinel2Controller();