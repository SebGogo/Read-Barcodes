//fetch using a Request and a Headers objects
document.addEventListener('DOMContentLoaded', init);

function init() {
    document.getElementById('btnSubmit').addEventListener('click', upload);
}
async function upload(ev) {
    ev.preventDefault();    //stop the form submitting

    //create any headers we want
    let myHeaders = new Headers();
    myHeaders.append("Acs-Api-Key", "YOUR_API_KEY_HERE");
    myHeaders.append("Content-Type", "image/png");

    //bundle the files and data we want to send to the server
    let myFile = document.getElementById('barcode_img').files[0];

    var reader = new FileReader();
    reader.readAsArrayBuffer(myFile)
    reader.onload = async function (e) {
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: reader.result,
        };
        let response = await fetch("https://api.accusoft.com/bx/api/v1/barcodeReader", requestOptions)
        document.getElementById('output').textContent = await response.text();
        console.log(await response.text());
    };
}
