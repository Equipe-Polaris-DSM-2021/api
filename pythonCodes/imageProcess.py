# # To add a new cell, type '# %%'
# # To add a new markdown cell, type '# %% [markdown]'
# # %%
# from IPython import get_ipython

# get_ipython().system('pip install rasterio')
# get_ipython().system('pip install numpy')
# get_ipython().system('pip install matplotlib')
# get_ipython().system('pip install -U scikit-image')
# get_ipython().system('pip install boto3')
# get_ipython().system('pip install watermark')
# get_ipython().system('pip install nb_black')


# get_ipython().run_line_magic('matplotlib', 'inline')
# get_ipython().run_line_magic('load_ext', 'watermark')
# get_ipython().run_line_magic('load_ext', 'nb_black')

import rasterio
from rasterio.plot import show
import numpy
import matplotlib.pyplot as plt

import skimage.exposure

# access package for AWS access
import boto3

import sys
import os
import subprocess
import datetime
import platform
import datetime

def normalize(array):
    '''
    normalize: normalize a numpy array so all value are between 0 and 1
    '''
    array_min, array_max = array.min(), array.max()
    return (array - array_min) / (array_max - array_min)


def make_color_image(b1: int, b2: int, b3: int, fullURL: str):
    '''
    make_false_color_image: combine nominated Landsat-8 bands into false color image
    
    Parameters:
    b1, b2, b3 integers - values between 1 - 6 (inclusive), being a Landsat-8 band number
    
    fullURL string - template for URL to Landsat-8 data
    
    Band Number     Description                 Wavelength Resolution
    Band 1          Coastal / Aerosol           0.433 to 0.453 µm 30 meter
    Band 2          Visible blue                0.450 to 0.515 µm 30 meter
    Band 3          Visible green               0.525 to 0.600 µm 30 meter
    Band 4          Visible red                 0.630 to 0.680 µm 30 meter
    Band 5          Near-infrared               0.845 to 0.885 µm 0 meter
    Band 6          Short wavelength infrared   1.56 to 1.66 µm 30 meter
    
    Environment:
    assumes rasterio imported as rio
    assumes boto package  available for AWS file storage access
    '''

    if not (
        b1 > 0
        and b2 > 0
        and b3 > 0
        and b1 < 7
        and b2 < 7
        and b3 < 7
    ):
        raise ValueError(
            f'One or more invalid Landsat-8 band number {b1}, {b2}, {b3} supplied'
        )
    # endif

    # create URLs for each band
    b1_path = fullURL[:-6] + f'B{b1}.TIF'
    b2_path = fullURL[:-6] + f'B{b2}.TIF'
    b3_path = fullURL[:-6] + f'B{b3}.TIF'
    print(b1_path)

    # open URL with rasterio
    b1 = rasterio.open(b1_path)
    b2 = rasterio.open(b2_path)
    b3 = rasterio.open(b3_path)

    # read into numpy array
    b1_np = b1.read(1)
    b2_np = b2.read(1)
    b3_np = b3.read(1)

    # normalize data to 0<->1
    b1_norm = normalize(b1_np)
    b2_norm = normalize(b2_np)
    b3_norm = normalize(b3_np)

    # create three color image
    rgb = numpy.dstack((b1_norm, b2_norm, b3_norm))

    return rgb


def make_color_image_eqh(
    b1: int, b2: int, b3: int, fullURL: str
):
    '''
    make_false_color_image: combine nominated Landsat-8 bands into false color image
    
    Parameters:
    b1, b2, b3 integers - values between 1 - 6 (inclusive), being a Landsat-8 band number
    
    fullURL string - template for URL to Landsat-8 data
    
    Band Number     Description                 Wavelength Resolution
    Band 1          Coastal / Aerosol           0.433 to 0.453 µm 30 meter
    Band 2          Visible blue                0.450 to 0.515 µm 30 meter
    Band 3          Visible green               0.525 to 0.600 µm 30 meter
    Band 4          Visible red                 0.630 to 0.680 µm 30 meter
    Band 5          Near-infrared               0.845 to 0.885 µm 0 meter
    Band 6          Short wavelength infrared   1.56 to 1.66 µm 30 meter
    
    Environment:
    assumes rasterio imported as rio
    assumes boto package  available for AWS file storage access
    '''

    if not (
        b1 > 0
        and b2 > 0
        and b3 > 0
        and b1 < 7
        and b2 < 7
        and b3 < 7
    ):
        raise ValueError(
            f'One or more invalid Landsat-8 band number {b1}, {b2}, {b3} supplied'
        )

    # create URLs for each band
    b1_path = fullURL[:-6] + f'B{b1}.TIF'
    b2_path = fullURL[:-6] + f'B{b2}.TIF'
    b3_path = fullURL[:-6] + f'B{b3}.TIF'

    # open URL with rasterio
    b1 = rasterio.open(b1_path)
    b2 = rasterio.open(b2_path)
    b3 = rasterio.open(b3_path)

    # read into numpy array
    b1_np = b1.read(1)
    b2_np = b2.read(1)
    b3_np = b3.read(1)

    eq_b1 = skimage.exposure.equalize_hist(b1_np)
    eq_b2 = skimage.exposure.equalize_hist(b2_np)
    eq_b3 = skimage.exposure.equalize_hist(b3_np)

    # normalize data to 0<->1
    b1_norm = normalize(eq_b1)
    b2_norm = normalize(eq_b2)
    b3_norm = normalize(eq_b3)

    # create three color image
    rgb = numpy.dstack((b1_norm, b2_norm, b3_norm))

    return rgb

# ===========================================================================================================================================

# main code here
with rasterio.Env():
    fullURL = 'https://s3-us-west-2.amazonaws.com/landsat-pds/L8/073/231/LC80732312016158LGN00/LC80732312016158LGN00_B4.TIF'
    # fullURL = sys.argv[1]
    print(fullURL)

    # src_image = rasterio.open(fullURL)


    # # convert image to numpy
    # src_image_array = src_image.read(1)
    # src_image_array = src_image_array.astype('f4')
    # # replace zero items (ie array pixels out of image frame) with nan
    # src_image_array[src_image_array == 0] = numpy.nan

    # # clean up big data objects
    # src_image_array = 0
    # src_image = 0

    # read true color image
    rgb = make_color_image(4, 3, 2, fullURL)

    with rasterio.open('example.tif', 'w', **rgb) as dst:
            dst.write(1)

    # #read true color image equalized
    # rgb = make_color_image_eqh(4, 3, 2, fullURL)

    print(rgb)
    sys.stdout.flush()



