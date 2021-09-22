import { Request, Response } from "express";
const app = require('./server');

const dfd = require("danfojs-node")
const tf = require("@tensorflow/tfjs-node")

//lista de repos conhecidos (falta sentinel-1 e amazonia-1)
const CBERS_AWFI_csv_URL:string = 'https://s3.amazonaws.com/cbers-meta-pds/AWFIscene_list.csv'
const CBERS_MUX_csv_URL: string = "https://s3.amazonaws.com/cbers-meta-pds/MUXscene_list.csv"
const CBERS_MUX_csv_local: string = "../file-samples/CBERS4-MUXscene_list.csv"
const CBERS_PAN10M_csv_URL: string = 'https://s3.amazonaws.com/cbers-meta-pds/PAN10Mscene_list.csv'
const CBERS_PAN5M_csv_URL: string = 'https://s3.amazonaws.com/cbers-meta-pds/PAN5Mscene_list.csv'

const Sentinel2_csv_URL: string = 'https://storage.googleapis.com/gcp-public-data-sentinel-2/index.csv.gz'

const Landsat4_8_csv_URL: string = 'https://storage.googleapis.com/gcp-public-data-landsat/index.csv.gz'

// teste utilizando a biblioteca, falta implementar o paradigma POO
// e estruturar pastas + metodos e rotas
app.use("/", async (req: Request, res: Response) => {
  dfd.read_csv(
    CBERS_MUX_csv_local, {
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
  })
})






app.listen(3333, () => {
  console.log("Polaris's API: Server Started at http://localhost:3333")
});

