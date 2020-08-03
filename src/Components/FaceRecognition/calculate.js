
const data = (dim) =>{
    // console.log(dim);
    const clarifaiface = dim.bounding_box;
    const image = document.getElementById('inputimage');
    // console.log(image);
    const width = Number(image.width);
    const height = Number(image.height);
    return{
      leftCol: clarifaiface.left_col * width,
      topRow: clarifaiface.top_row * height,
      rightCol: width - (clarifaiface.right_col * width),
      bottomRow: height - (clarifaiface.bottom_row * height)
    }
}

export default data;