let canvas1 = document.getElementById("canvas1");
let ctx = canvas1.getContext("2d");
let sendbtn = document.getElementById('sendbtn');
let img_origin = document.getElementById('img')
let file_upload = document.getElementById('file')
let upload = document.getElementById('upload');
let img;
let label = ["David" , "Wayne"];
sendbtn.addEventListener("click",function(){
    //let imagedata = ctx.getImageData(0,0,canvas1.width,canvas1.height);
    loadmodel().then(model =>{
        const raw = tf.browser.fromPixels(canvas1,3);
        let resized = tf.image.resizeBilinear(raw, [model.inputs[0].shape[1],model.inputs[0].shape[2]]);
	    let tensor = resized.expandDims(0);
        let prediction = model.predict(tensor);
        let pIndex = tf.argMax(prediction, 1).dataSync();
        model.predict(tensor).print();
        //console.log(prediction);
        //model.summary()
    })
})
async function loadmodel(){
    let model = await tf.loadLayersModel('https://c107152349.github.io/detect/tfjsmodel/model.json');
    return model;  
}
upload.addEventListener('click',function(){
    loadmodel().then(model =>{
        //console.log(model.inputs[0].shape[1]);
        console.log(model.summary());
    })
})