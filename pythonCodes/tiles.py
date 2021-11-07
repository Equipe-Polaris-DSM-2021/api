import gdal2tiles

# source_path = "https://s3-us-west-2.amazonaws.com/landsat-pds/L8/073/231/LC80732312016158LGN00/LC80732312016158LGN00_B4.TIF"
source_path = "/home/gabriel/Documentos/FATEC/Semestre 2/API/dev/api/pythonCodes/LC08_L1TP_219076_20210603_20210608_01_T1_B4.tiff"
destination_path = "./pythonCodes/temp"

def create_tiles(source_path, destination_path):

  options = {
    'zoom': 12,
    'nb_processes': 4,
    'tile_size': 512,
    'srs':'EPSG:4326'
  }

  gdal2tiles.generate_tiles(source_path, destination_path, **options)

create_tiles(source_path, destination_path)
