import React, { Component } from 'react';

export class UploadPC extends Component { 
    constructor(props){
        super(props);
    this.state = {
      imagePreviewUrl:null,
      file:null
    };
    }
      
    static displayName = UploadPC.name;
   ChangeImage  (props){
    props.preventDefault(); 
    let reader = new FileReader();
    let file = props.target.files[0]; 
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
      this.props.onUpload(this.state.imagePreviewUrl);
    }

    reader.readAsDataURL(file)
    }
    Upload(event){
        event.preventDefault();
        
          return false;
     }
    render() {
       
        return ( 
            
                <form method="post" encType="multipart/form-data" asp-controller="UploadFiles" asp-action="Index" onSubmit= {this.Upload.bind(this)}>
                    <div className="form-group">
                        <div className="col-md-10">
                            <p>Upload one or more files using this form:</p>
                            <input type="file" name="files" multiple onChange={this.ChangeImage.bind(this)} />
                            </div>
                        </div> 
                        <div className="form-group">
                            <div className="col-md-10">
                                <input type="submit" value="Upload" />
                            </div>
                        </div> 
                    </form> 
                    
        );
    }
   }