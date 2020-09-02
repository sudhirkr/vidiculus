import React, { Component } from 'react';
import { TagCloud } from 'react-tagcloud';
//import CanvidApp from './components/CanvidComponent'
//import $ from 'jquery';
//import canvid from '/home/raghaw/image/node_modules/canvid/canvid.js'
import {
  ReactiveBase,
  ReactiveList,
  DataSearch,
  SingleList,
  CategorySearch,
  SingleRange,
  ResultCard,
  DateRange,
  MultiList,
  RangeSlider
} from '@appbaseio/reactivesearch';

import './App.css';

const data = [{ 'value': 'person', 'count': 76308 }, { 'value': 'bicycle', 'count': 90542 }, { 'value': 'car', 'count': 71400 }, { 'value': 'motorcycle', 'count': 66942 }, { 'value': 'airplane', 'count': 16103 }, { 'value': 'bus', 'count': 92061 }, { 'value': 'train', 'count': 68770 }, { 'value': 'truck', 'count': 78450 }, { 'value': 'boat', 'count': 94472 }, { 'value': 'traffic light', 'count': 5127 }, { 'value': 'fire hydrant', 'count': 57088 }, { 'value': 'stop sign', 'count': 94336 }, { 'value': 'parking meter', 'count': 2300 }, { 'value': 'bench', 'count': 86997 }, { 'value': 'bird', 'count': 53399 }, { 'value': 'cat', 'count': 59055 }, { 'value': 'dog', 'count': 54710 }, { 'value': 'horse', 'count': 49630 }, { 'value': 'sheep', 'count': 55634 }, { 'value': 'cow', 'count': 53106 }, { 'value': 'elephant', 'count': 86733 }, { 'value': 'bear', 'count': 94794 }, { 'value': 'zebra', 'count': 54134 }, { 'value': 'giraffe', 'count': 82299 }, { 'value': 'backpack', 'count': 42667 }, { 'value': 'umbrella', 'count': 92557 }, { 'value': 'handbag', 'count': 12837 }, { 'value': 'tie', 'count': 6830 }, { 'value': 'suitcase', 'count': 50862 }, { 'value': 'frisbee', 'count': 85686 }, { 'value': 'skis', 'count': 3711 }, { 'value': 'snowboard', 'count': 1284 }, { 'value': 'sports ball', 'count': 20358 }, { 'value': 'kite', 'count': 50355 }, { 'value': 'baseball bat', 'count': 5894 }, { 'value': 'baseball glove', 'count': 18068 }, { 'value': 'skateboard', 'count': 44016 }, { 'value': 'surfboard', 'count': 22119 }, { 'value': 'tennis racket', 'count': 34597 }, { 'value': 'bottle', 'count': 36272 }, { 'value': 'wine glass', 'count': 70969 }, { 'value': 'cup', 'count': 43259 }, { 'value': 'fork', 'count': 47448 }, { 'value': 'knife', 'count': 78366 }, { 'value': 'spoon', 'count': 94311 }, { 'value': 'bowl', 'count': 60046 }, { 'value': 'banana', 'count': 11350 }, { 'value': 'apple', 'count': 70513 }, { 'value': 'sandwich', 'count': 80878 }, { 'value': 'orange', 'count': 40857 }, { 'value': 'broccoli', 'count': 33948 }, { 'value': 'carrot', 'count': 60137 }, { 'value': 'hot dog', 'count': 40025 }, { 'value': 'pizza', 'count': 20598 }, { 'value': 'donut', 'count': 60343 }, { 'value': 'cake', 'count': 59497 }, { 'value': 'chair', 'count': 31953 }, { 'value': 'couch', 'count': 47161 }, { 'value': 'potted plant', 'count': 83121 }, { 'value': 'bed', 'count': 44721 }, { 'value': 'dining table', 'count': 19566 }, { 'value': 'toilet', 'count': 43784 }, { 'value': 'tv', 'count': 26300 }, { 'value': 'laptop', 'count': 94428 }, { 'value': 'mouse', 'count': 34135 }, { 'value': 'remote', 'count': 84010 }, { 'value': 'keyboard', 'count': 57236 }, { 'value': 'cell phone', 'count': 83453 }, { 'value': 'microwave', 'count': 45092 }, { 'value': 'oven', 'count': 66751 }, { 'value': 'toaster', 'count': 50109 }, { 'value': 'sink', 'count': 62604 }, { 'value': 'refrigerator', 'count': 95722 }, { 'value': 'book', 'count': 27449 }, { 'value': 'clock', 'count': 7273 }, { 'value': 'vase', 'count': 77328 }, { 'value': 'scissors', 'count': 97735 }, { 'value': 'teddy bear', 'count': 90921 }, { 'value': 'hair drier', 'count': 37313 }, { 'value': 'toothbrush', 'count': 5367 }]
// var canvidControl = canvid({
//   selector: '.canvid-container',
//   videos: {
//     clip1: {
//       src: './frames1/400.jpg',
//       frames: 2,
//       cols: 1,
//       fps: 2,
//       loops: 1,

//     }
//   }
// })

class Main extends React.Component {
  render() {
    return (
      <div className="main-container">
        <ReactiveBase
          app="vid_detect"
          url="http://34.87.101.217:9200"
        >
          <div className="navbar">
            <div className="logo">
              The Imagesearch App
          </div>
            <DataSearch // text
              react="camera_id"
              componentId="authors"
              customQuery={(value, props) => ({
                "query": {
                  "bool": {
                    "must": [
                      {
                        "nested": {
                          "path": "objects",
                          "query": {
                            "bool": {
                              "must": [
                                {
                                  "match": {
                                    "objects.class": value
                                  }
                                }
                              ]
                            }
                          }
                        }
                      }
                    ]
                  }
                },
                "aggs": {
                  "camera": {
                    "terms": {
                      "field": "camera_id"
                    },
                    "aggs": {
                      "histo": {
                        "date_histogram": {
                          "field": "date",
                          "fixed_interval": "3m"
                        },
                        "aggs": {
                          "recent": {
                            "top_hits": { "size": 10000 }
                          }
                        }
                      }
                    }
                  }
                }
              })}
              dataField="objects.class"
              nestedField="objects"
              queryFormat="or"
              placeholder="Search by Class"
              autoSuggest={true}
              className="datasearch"
              innerClass={{
                "input": "searchbox",
                "list": "suggestionlist"
              }}>
            </DataSearch>
          </div>
          <div className={"display"}>
            <div className={"leftSidebar"}>

              <MultiList
                componentId="camera_id"
                dataField="camera_id"
                className="cameras"
                queryFormat="and"
                showCheckbox={true}
                showCount={true}
                placeholder="Search by Camera"
                showFilter={false}
                URLParams={false}
                react={{ "and": ["mainSearch"] }}
                innerClass={{
                  label: "list-item",
                  input: "list-input"
                }}
              />
              <DateRange
                componentId="DateSensor"
                title="search by date"
                autoSuggest={true}
                dataField="date"
                queryFormat="date"
              />
              <div>
                <TagCloud
                  minSize={12}
                  maxSize={35}
                  tags={data}
                  onClick={tag => alert(`'${tag.value}' was selected!`)}
                /></div>
            </div>
            <div className={"mainBar"}>

              <ReactiveList
                size={200}
                dataField="time"
                pagination={false}
                showResultStats={true}
                react={{
                  "and": ["camera_id", "mainSearch", "authors", "RangeSliderSensor", "DateSensor"]
                }}
                componentId="SearchResult">
                {({
                  loading,
                  error,
                  rawData,
                  data,
                }) => {
                  function h(item, max_time, min_time) {

                    //var start = key_string.toString().slice(11,16)
                    //var end = key_string.toString().slice(11,14)+"30"
                    // console.log("key",start,end)
                    if (item.path) {
                      return (<ResultCard key={item._id}>
                        <div>
                          <img src={item.path} alt=" " width="100%" height="100%" />

                        </div>
                        <ResultCard.Title
                          dangerouslySetInnerHTML={{
                            __html: item.date
                          }}
                        />
                        <ResultCard.Description>
                          <div>
                            <div><b>time : </b> {item.time}</div></div>
                        </ResultCard.Description>
                      </ResultCard>)

                    }
                    var item = item._source

                    return (<><ResultCard key={item._id}>
                      <div>
                        <img src={item.path} alt=" " width="100%" height="100%" />

                      </div>
                      <ResultCard.Title
                        dangerouslySetInnerHTML={{
                          __html: item.date
                        }}
                      />
                      <ResultCard.Description>
                        <div><b>camera_id :</b> {item.camera_id}
                          <div><b>from : </b>  {min_time}  <b>   to:  </b> {max_time} <b> mins.</b> </div></div>
                      </ResultCard.Description>
                    </ResultCard>
                    </>)
                  }
                  var ElementList = {}
                  function addElement(ElementList, element) {
                    let newList = Object.assign(ElementList, element)
                    return newList
                  }
                  if (rawData) {
                    if (rawData.aggregations) {

                      try {
                        console.log("raw", rawData.aggregations.camera.buckets);
                        let k = rawData.aggregations.camera.buckets;
                        let x;
                        let ret = k.map(x => {
                          //console.log(x.doc_count)
                          //let hits =x.histo.buckets[0].recent.hits.hits
                          let m = x.histo.buckets.map(y => {
                            if (y.doc_count > 0) {
                              let hits = y.recent.hits.hits

                              let min_time = hits[0]._source.time
                              let max_time = hits[hits.length - 1]._source.time
                              let kk = 0
                            
                              // let i;
                              // var k =hits[0]._id
                              // let videos={  k: {
                              //   src: "./"+hits[0]._source.path,
                              //   frames: 2,
                              //   cols: 1,
                              //   fps:2,
                              //   loops :1,
                              //   onEnd: "onEndfunc"
                              // }};
                              let clip1 = {}
                              let element = {}
                              let i;
                              for (i = 0; i < hits.length; i++) {
                                // clip1= {
                                //   src: "./"+hits[i]._source.path,
                                //   frames: 2,
                                //   cols: 1,
                                //   fps:2,
                                //   loops :1,
                                //   onEnd: "onEndfunc"
                                // }

                                // videos[hits[i]._id] = clip1
                                element = {}
                                element[hits[i]._id] = {
                                  src: "./" + hits[i]._source.path, frames: 2, cols: 1, loops: 1, onEnd: function () {
                                    console.log('element1 ended.');
                                  }
                                }
                                addElement(ElementList, element)
                              }
                              console.log("dict", ElementList)

                              //console.log("time",max_time)
                              //hits.map(data=>console.log(data._source)); 
                              return (<ReactiveList.ResultCardsWrapper>

                                {//hits.map(e=>h(e,x.key_as_string))
        
          h(hits[0],max_time,min_time)
            } 
                                {/* <CanvidApp clipsData={ElementList} /> */}
                              </ReactiveList.ResultCardsWrapper>)
                            }
                          })
                          return (m)

                        })

                        //console.log("k",k)
                        // for (x=0; x< k.length;x++){
                        //   console.log("x",x)
                        //   }
                        return (
                          <>{ret}</>

                        )
                      }
                      catch (err) {
                        console.log("err", err)
                        return (
                          <ReactiveList.ResultCardsWrapper>
                            {data.map(h)
                            }
                          </ReactiveList.ResultCardsWrapper>
                        )
                      }
                    };
                  }
                  if (loading) {
                    return <div>Fetching Results.</div>
                  }
                  if (error) {
                    return (
                      <div>
                        Something went wrong! Error details {JSON.stringify(error)}
                      </div>
                    )
                  }
                  return (

                    <ReactiveList.ResultCardsWrapper>

                      {data.map(h)
                      }
                    </ReactiveList.ResultCardsWrapper>
                  )
                }
                }
              </ReactiveList>
            </div>
          </div></ReactiveBase>

      </div>
    );
  }
}


export default Main;
