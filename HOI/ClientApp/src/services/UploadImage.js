 
class UploadImage  {
    constructor(props) {
        super(props);
        this.state = { file: '', imagePreviewUrl: '' };
    }

    _handleSubmit(e) {
        e.preventDefault(); 
        console.log('handle uploading-', this.state.file);
    }

    _handleImageChange(e) {
        e.preventDefault(); 
        let reader = new FileReader();
        let file = e.target.files[0]; 
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        } 
        reader.readAsDataURL(file)
    } 
}