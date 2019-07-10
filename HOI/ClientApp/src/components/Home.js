import React, { Component } from 'react';
import { UploadPC } from './UploadPC';
import { UploadBuffer } from './UploadBuffer';
import { UploadUrl } from './UploadUrl';

export class Home extends Component {
    static displayName = Home.name; 
    constructor(props) {
        super(props);
        this.state = {
            imageValue: "",
            imageUrl: "",
            data:""
        }
        this.PasteImage = this.PasteImage.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleUploadUrl = this.handleUploadUrl.bind(this);
    }

    
    
    PasteImage(event) {
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
        this.setState({ imageValue: imageValue });
    }
    handleUploadUrl = async (imageUrl)=>{
       let headers = new Headers(); 
       headers.set('Access-Control-Allow-Origin', '*'); 
       headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
       headers.set("Content-Type", "application/json");
       headers.set('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
        const response = await fetch("https://localhost:80/api/api", {
            method: "POST",
            mode: "cors",
            headers: headers,
            body: JSON.stringify(imageUrl)
        });
        const body = await response.json(); 
               this.setState({ data: body });  
    }
    CreateImage() {
        let img = []
        let imgSrc = this.state.data; 
        for (let i = 0; i < imgSrc.length; i++) {

            img.push(<img src={imgSrc[i]} width="200px" height="100px" />)
        }
        return img
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
                  {this.state && this.state.data &&
                      <div className="row" >
                          {this.CreateImage()}
                      </div>
                  }
                       
              </div>
          </div> 
          

    );
  }
}
