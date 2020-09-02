import logging
from elasticsearch import Elasticsearch ,helpers
import os, uuid
import json
import time

def create_index(es_object, index_name='vid_detect'):
    created = False
    # index settings
    settings = {
        "settings": {
            "index.max_result_window":100000,
            "number_of_shards": 1,
            "number_of_replicas": 0
        },
        "mappings": {

                "properties": {
                    "date":{"type":"date","format" : "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd H:m:s||yyyy-MM-dd H:m:ss||yyyy-MM-dd H:mm:ss||yyyy-MM-dd"},
                    "time":{ "type": "text"},
                    "frame_id": {"type":"integer"},
                    "camera_id":{"type":"integer"},
                    "path":{"type":"text"},
                    "objects" : { "type":"nested",
                                 "properties": {
                                                "class":    { "type": "text" ,"fields" : {
                "keyword" : {
                  "type" : "keyword",
                  "ignore_above" : 256
                }
              } },
                                                "confidence": { "type": "float"  },
                                                 "coordinates":{ "type": "nested" ,
                                                                 "properties": { "x" :{"type":"float"},
                                                                                 "y" :{"type":"float"},
                                                                                 "w" :{"type":"float"},
                                                                                 "h" :{"type":"float"}
                                                                 }  }
            
                                                }
                    
                }    
        }
    }}
    try:
        print(es_object.indices.exists(index_name))
        if not es_object.indices.exists(index_name):
            # Ignore 400 means to ignore "Index Already Exist" error.
            es_object.indices.create(index=index_name, body=settings)
            print('Created Index')
        created = True
    except Exception as ex:
        print(str(ex))
    finally:
        return created

        
def connect_elasticsearch():
    _es = None
    print("Connectig...")
    _es = Elasticsearch([{'host': '34.87.101.217', 'port': 9200}])
    if _es.ping():
        print('Connected to Elasticsearch .')
    else:
        print('Awww it could not connect!')
    return _es

def get_data_from_file(path):
    
    file = open(path, encoding="utf8", errors='ignore')
    #import pdb
    #pdb.set_trace()
    data = eval(file.read().splitlines(False)[0])
  
    #content = file.read().splitlines(False)
    #merge =""
    #for i in content:
       #merge+=i
    #data = [json.loads(merge)]
    #file.close()
    #print(data)
    return data
    
def bulk_json_data(json_path, _index, doc_type):
    dirs = os.listdir(json_path)
    for files in dirs:
       json_list = get_data_from_file(path=os.path.join(json_path,files))
       for doc in json_list:
          # use a `yield` generator so that the data
          # isn't loaded into memory
          if '{"index"' not in doc:
               yield {
                  "_index": _index,
                
                  "_id": uuid.uuid4(),
                  "_source": doc}
            
if __name__ == '__main__':
  logging.basicConfig(level=logging.ERROR)
  es=connect_elasticsearch()
  create_index(es, index_name='vid_detect')
  start =time.time()
  path_to_json_output = "video_results"
  response= helpers.bulk(es, bulk_json_data(path_to_json_output, "vid_detect", "people"))
  end =time.time()
  print("succeccfully send...")
  print("time taken to send files .....",end-start)
  print(response)
