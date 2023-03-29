const uploadBox = document.querySelector(".upload-box"),

previewImg = uploadBox.querySelector("img"),
fileInput = uploadBox.querySelector("input"),
widthInput = document.querySelector(".coloumn_width input"),
heightInput = document.querySelector(".coloumn_height input"),
ratioInput = document.querySelector(".coloumn_ratio input"),
qualityInput = document.querySelector(".coloumn_quality input"),
downloadBtn = document.querySelector(".download-btn");





let ogImageRatio;


const loadFile = (e) =>{

    console.log('file selected')

    previewImg.classList.add("active")
    uploadBox.classList.add("disable")

    const file = e.target.files[0]; //getting 1st user selected file
    if(!file) return;
    previewImg.src=URL.createObjectURL(file);

    

    previewImg.addEventListener("load" , ()=>{
        widthInput.value = previewImg.naturalWidth;
        heightInput.value = previewImg.naturalHeight;
        ogImageRatio = previewImg.naturalWidth/previewImg.naturalHeight;
        

    })
    
    
    console.log(file)
}

heightInput.addEventListener("keyup" , ()=>{

    console.log("key changes")
    const width = ratioInput.checked ? heightInput.value / ogImageRatio : widthInput.value;
    widthInput.value = width;

})

widthInput.addEventListener("keyup" , ()=>{

    console.log("key changes")
    const height = ratioInput.checked ? widthInput.value / ogImageRatio : heightInput.value;
    heightInput.value = height;

})

const resizeAndDraw = () =>{
        const canvas = document.createElement("canvas");
        const a = document.createElement("a");
        const ctx = canvas.getContext("2d");

        const imgQuality = qualityInput.checked ? 0.7 : 1.0;

        canvas.width = widthInput.value;
        canvas.height =  heightInput.value;

        ctx.drawImage(previewImg , 0 , 0 , canvas.width , canvas.height);

        a.href = canvas.toDataURL("image/jpeg",imgQuality);
        a.download = new Date().getTime();
        a.click()

}

downloadBtn.addEventListener("click", resizeAndDraw);

fileInput.addEventListener("change",loadFile);
uploadBox.addEventListener("click" , ()=>fileInput.click());