from satstac import Catalog, Collection, Item
from pymongo import MongoClient
import urllib.request, json
import time
from random import randint

def populateDatabase():
    i=1
    for item in col.items():
        try:
            verifyDate = item.properties['datetime']
            verifyDate = verifyDate[0:4]
            print('ano do catalogo: '+ verifyDate)
            if int(verifyDate) <= 2020:
                continue
            print(item.properties)

            row = item.properties['eo:row']
            column = item.properties['eo:column']
            print(row + '/' + column)
            data = item.properties['datetime']
            data = data[0:10]
            id = str(item)
            url = f'https://landsat-stac.s3.amazonaws.com/landsat-8-l1/{column}/{row}/{data}/{id}.json'
            time.sleep(randint(8,9))

            test = Collection.open(url)
            test.save('mycat/catalog' + str(i) +'.json')
            with open('mycat/catalog' + str(i) +'.json') as json_file:
                test2 = json.load(json_file)
            test2['_id'] = test2['id']
            del test2['id']
            with open('mycat/catalog' + str(i) +'.json', 'w') as outfile:
                json.dump(test2, outfile)
            
            with open('mycat/catalog'+  str(i)  + '.json') as f:
                file_data = json.load(f)
            collection_currency.insert(file_data)
            print(url)
            i = i + 1
        except:
            continue

        client.close()



client = MongoClient('mongodb+srv://polaris-user-cluster:polaris1234@polariscluster.d9pbe.mongodb.net/test', 27017)

db = client['metadata']
collection_currency = db['landsat2']


columnsBrazil = [   '219', '220','221', 
                    '222', '223', '224','218', 
                    '217', '216', '215', '214' 
                                                ]

rowsBrazil = [
              '076', '075', '074', '077', '073',           
              '078','079','080',                           
              '072', '071', '070', '069', '068', '067',                                             
              '066', '065', '064', '063', '062',                 
                                                        ]

for colBrazil in columnsBrazil:
    for rowBrazil in rowsBrazil:
        try:
            cat = Catalog.open(f'https://landsat-stac.s3.amazonaws.com/landsat-8-l1/{colBrazil}/{rowBrazil}/catalog.json')
            print(cat)

            col = Collection.open(f'https://landsat-stac.s3.amazonaws.com/landsat-8-l1/{colBrazil}/{rowBrazil}/catalog.json')
            print(col, col.items())

            populateDatabase()

        except:
            continue