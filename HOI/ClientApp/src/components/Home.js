import React, { Component } from 'react';
import { UploadPC } from './UploadPC';
import { UploadBuffer } from './UploadBuffer';
import { UploadUrl } from './UploadUrl';

export class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            imageValue:"",
            imageUrl:""
        }
        this.PasteImage = this.PasteImage.bind(this);
    } 

    static displayName = Home.name;
    PasteImage (event){
        console.log(event);
            var items = (event.clipboardData || event.originalEvent.clipboardData).items;
            console.log(JSON.stringify(items));
            var blob = null;
            for (var i = 0; i < items.length; i++) {
                if (items[i].type.indexOf("image") === 0) {
                    blob = items[i].getAsFile();
                    console.log(blob);
                }
            }
            if (blob !== null) {
                var reader = new FileReader();
                reader.onload = function (event) {
                    var image = document.getElementById("originalImage");
                    image.setAttribute("src", event.target.result);
                };
                reader.readAsDataURL(blob);
        }
    }
  
  handleUpload = (imageValue) => {
      console.log(imageValue);
    this.setState({imageValue: imageValue});
} 
handleUploadUrl=(imageUrl)=>{
    console.log(imageUrl);
    this.setState({imageUrl: imageUrl});
}

  render () {
      return (
       <div className="ImageSearching" onPaste={this.PasteImage}>
          <div className="container">
              <div className="row">

                  <div className="col-sm">   
                      <UploadPC onUpload={this.handleUpload} />
                  </div>
                  <div className="col-sm">            
                      <UploadBuffer/>
                      </div>
                      <div className="col-sm">   
                          <UploadUrl onUpload={this.handleUploadUrl} />
                      </div>
                  </div>
                  <div className="row" >
                          
                  </div>
              </div>
          </div> 
          

    );
  }
}
