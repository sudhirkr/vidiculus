import canvid from '/home/raghaw/image/node_modules/canvid/canvid.js'
import React, { Component } from 'react';

class CanvidApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = { clips: {} }
    //this.loop=this.loop.bind(this)
    //console.log('clipsData', props)
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ clips: nextProps.clipsData })
    //console.log('clipsData', nextProps.clipsData)
  }
  componentDidMount() {
    let clipIDs = [];
    // Object.keys(this.state.clips).forEach(function (prop) {
    //   // `prop` is the property name
    //   // `data[prop]` is the property value
    //  console.log('try', prop)
    //   clipIDs.push(prop)
    // });
    var firstClipId;
// for(var key in this.props.clipsData) {
//     if(this.props.clipsData.hasOwnProperty(key)) {
//         firstClipId= this.props.clipsData[key];
//         break;
//     }
// }
console.log('clipID',Object.keys(this.props.clipsData)[0])
    let canvidControl = canvid({
      selector: '.canvid-container',
      videos: (canvidControl)=>this.getVideosData(canvidControl),
      width: 500,
      height: 400,
      loaded: (canvidControl) => this.getInitialClip(canvidControl)
    });
    console.log('canvid',canvidControl)
    console.log('function',this.getVideosData(canvidControl))
  }
 onEndFunc = (canvidControl,clipToPlay) =>() => canvidControl.play(clipToPlay)

 getVideosData = (canvidControl) => {
   let data = {}
   let clipIds = Object.keys(this.props.clipsData)
   for(let i=0; i< clipIds.length;i++){
    //  copy data 
    data[clipIds[i]] = this.props.clipsData[clipIds[i]]
    // overwrite onEnd function
     if(clipIds[i+1])
        data[clipIds[i]].onEnd = this.onEndFunc(canvidControl,clipIds[i+1])
    else
        data[clipIds[i]].onEnd =  this.onEndFunc(canvidControl,clipIds[0])
   }
  return data
 }
  
  getInitialClip = (canvidControl) =>
    () => canvidControl.play(Object.keys(this.props.clipsData)[0]) 

  render() {
    //console.log("hello", this.props.video)
    return <div className="canvid-container"></div>
  }
}
// React.render(<CanvidApp/>, document.getElementById('canvid-app'));
export default CanvidApp;