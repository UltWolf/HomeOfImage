import React, { Component } from 'react';

export class UploadUrl extends Component {
    constructor(props){
         super(props);
         this.state = {
             url:"",
         };
         this.OnChangeUrl = this.OnChangeUrl.bind(this);         
         this.UrlHandler =  this.UrlHandler.bind(this);
    }
    static displayName = UploadUrl.name;
    UrlHandler(event){ 
        this.props.onUpload(this.state.url);
    }
    OnChangeUrl(event){ 
        this.setState({
            url: event.target.value
          });
    }
    render() {
        return (
            <form method="post" asp-controller="Api" asp-action="Post">
                <div className="form-group">
                    <div className="col-md-10">
                        <p>Upload one or more files using this form:</p>
                        <input type="text" id="inputForUrl" name="url"
                         value = {this.state.url} 
                         onChange = {this.OnChangeUrl} />
                        <input type="button"  onClick={this.UrlHandler} />
                    </div>
                </div>
            </form>

        );
    }
}