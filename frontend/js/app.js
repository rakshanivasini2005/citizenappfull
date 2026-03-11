

// // UI elements
// const btnTriggerSos = document.getElementById("btn-trigger-sos");
// const btnDispatch = document.getElementById("btn-dispatch");
// const btnCancel = document.getElementById("btn-cancel");
// const btnDone = document.getElementById("btn-done");

// const layerSos = document.getElementById("layer-sos");
// const layerForm = document.getElementById("layer-form");
// const layerDetails = document.getElementById("layer-details");

// const typeButtons = document.querySelectorAll(".type-btn");
// const inputDesc = document.getElementById("incident-desc");

// const valType = document.getElementById("val-type");
// const valTime = document.getElementById("val-time");
// const valLat = document.getElementById("val-lat");
// const valLng = document.getElementById("val-lng");

// const statusTitle = document.getElementById("status-title");
// const offlineWarning = document.getElementById("offline-warning");

// // NEW PHOTO ELEMENTS
// const photoInput = document.getElementById("incident-photo");
// const photoPreviewContainer = document.getElementById("photo-preview-container");
// const photoPreview = document.getElementById("photo-preview");
// const btnRemovePhoto = document.getElementById("btn-remove-photo");

// let selectedType = null;
// let capturedImageBase64 = null; // Store the photo

// // NEW PHOTO CONVERSION LOGIC
// if(photoInput) {
//     photoInput.addEventListener("change", (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = (event) => {
//                 capturedImageBase64 = event.target.result; 
//                 if(photoPreview) photoPreview.src = capturedImageBase64;
//                 if(photoPreviewContainer) photoPreviewContainer.style.display = "block";
//             };
//             reader.readAsDataURL(file); 
//         }
//     });
// }

// if(btnRemovePhoto) {
//     btnRemovePhoto.onclick = () => {
//         capturedImageBase64 = null;
//         if(photoInput) photoInput.value = ""; 
//         if(photoPreviewContainer) photoPreviewContainer.style.display = "none";
//     };
// }


// // view switcher
// function switchView(layer){
// document.querySelectorAll(".view-layer")
// .forEach(l => l.classList.remove("active"));
// layer.classList.add("active");
// }


// // SOS button
// btnTriggerSos.onclick = () => {
// switchView(layerForm);
// };


// // emergency selection
// typeButtons.forEach(btn => {

// btn.onclick = () => {

// typeButtons.forEach(b => b.classList.remove("selected"));
// btn.classList.add("selected");

// selectedType = btn.dataset.type;

// };

// });


// // cancel
// btnCancel.onclick = () => {
// switchView(layerSos);
// // clear photo on cancel
// capturedImageBase64 = null;
// if(photoInput) photoInput.value = "";
// if(photoPreviewContainer) photoPreviewContainer.style.display = "none";
// };


// // ===============================
// // GET LOCATION (GPS + IP fallback)
// // ===============================

// async function getLocation(){

// return new Promise((resolve)=>{

// navigator.geolocation.getCurrentPosition(

// (pos)=>{

// resolve({
// latitude: pos.coords.latitude,
// longitude: pos.coords.longitude
// });

// },

// async ()=>{

// // fallback to IP location
// try{

// const res = await fetch("https://ipapi.co/json/");
// const data = await res.json();

// resolve({
// latitude: data.latitude,
// longitude: data.longitude
// });

// }catch(err){

// console.error("IP location failed",err);
// resolve(null);

// }

// },

// {enableHighAccuracy:true,timeout:10000}

// );

// });

// }


// // dispatch
// btnDispatch.onclick = async () => {

// if(!selectedType) return;

// switchView(layerDetails);

// statusTitle.textContent = "Acquiring Location...";

// const location = await getLocation();

// if(!location){

// statusTitle.textContent = "Unable to determine location";
// return;

// }

// const lat = location.latitude;
// const lon = location.longitude;

// const emergencyData = {

// latitude: lat,
// longitude: lon,
// timestamp: new Date().toISOString(),
// emergencyType: selectedType,
// description: inputDesc.value,
// image: capturedImageBase64 // ADDED THE PHOTO TO YOUR PAYLOAD HERE

// };


// // update UI
// valType.textContent = selectedType;
// valTime.textContent = new Date().toLocaleTimeString();
// valLat.textContent = lat.toFixed(6);
// valLng.textContent = lon.toFixed(6);


// // send to backend
// fetch("http://localhost:5001/emergency", {

// method:"POST",
// headers:{
// "Content-Type":"application/json"
// },
// body:JSON.stringify(emergencyData)

// })
// .then(res => {

// if(!res.ok) throw new Error("Server error");

// statusTitle.textContent = "Alert Sent Successfully";
// offlineWarning.style.display = "none";

// })
// .catch(() => {

// let stored = JSON.parse(
// localStorage.getItem("offlineEmergencies") || "[]"
// );

// stored.push(emergencyData);

// localStorage.setItem(
// "offlineEmergencies",
// JSON.stringify(stored)
// );

// offlineWarning.style.display = "block";

// statusTitle.textContent = "Network offline. Alert saved locally.";

// });

// };


// // reset
// btnDone.onclick = ()=>{
// switchView(layerSos);
// // clear photo on done
// capturedImageBase64 = null;
// if(photoInput) photoInput.value = "";
// if(photoPreviewContainer) photoPreviewContainer.style.display = "none";
// inputDesc.value = "";
// };


// // resend stored emergencies
// window.addEventListener("online", sendStoredEmergencies);

// sendStoredEmergencies();

// setInterval(()=>{

// if(navigator.onLine){
// sendStoredEmergencies();
// }

// },5000);


// function sendStoredEmergencies(){

// let stored = JSON.parse(
// localStorage.getItem("offlineEmergencies") || "[]"
// );

// if(stored.length === 0) return;

// stored.forEach(emergency => {

// fetch("http://localhost:5001/emergency",{
// method:"POST",
// headers:{
// "Content-Type":"application/json"
// },
// body:JSON.stringify(emergency)
// });

// });

// localStorage.removeItem("offlineEmergencies");

// }

// UI elements
const btnTriggerSos = document.getElementById("btn-trigger-sos");
const btnDispatch = document.getElementById("btn-dispatch");
const btnCancel = document.getElementById("btn-cancel");
const btnDone = document.getElementById("btn-done");
const btnSkip = document.getElementById("btn-skip"); // NEW

const layerSos = document.getElementById("layer-sos");
const layerForm = document.getElementById("layer-form");
const layerDetails = document.getElementById("layer-details");

const typeButtons = document.querySelectorAll(".type-btn");
const inputDesc = document.getElementById("incident-desc");
const formPrompt = document.getElementById("form-prompt"); // NEW

const valType = document.getElementById("val-type");
const valTime = document.getElementById("val-time");
const valLat = document.getElementById("val-lat");
const valLng = document.getElementById("val-lng");

const statusTitle = document.getElementById("status-title");
const offlineWarning = document.getElementById("offline-warning");

// PHOTO ELEMENTS
const photoInput = document.getElementById("incident-photo");
const photoPreviewContainer = document.getElementById("photo-preview-container");
const photoPreview = document.getElementById("photo-preview");
const btnRemovePhoto = document.getElementById("btn-remove-photo");

let selectedType = null;
let capturedImageBase64 = null; 

// --- NEW APP STATE VARIABLES ---
let currentAlertId = null;
let currentLat = null;
let currentLon = null;

// PHOTO CONVERSION LOGIC
// if(photoInput) {
//     photoInput.addEventListener("change", (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = (event) => {
//                 capturedImageBase64 = event.target.result; 
//                 if(photoPreview) photoPreview.src = capturedImageBase64;
//                 if(photoPreviewContainer) photoPreviewContainer.style.display = "block";
//             };
//             reader.readAsDataURL(file); 
//         }
//     });
// }

// if(btnRemovePhoto) {
//     btnRemovePhoto.onclick = () => {
//         capturedImageBase64 = null;
//         if(photoInput) photoInput.value = ""; 
//         if(photoPreviewContainer) photoPreviewContainer.style.display = "none";
//     };
// }

// --- UPGRADED PHOTO COMPRESSION LOGIC ---
if(photoInput) {
    photoInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                // Create an image object
                const img = new Image();
                img.onload = () => {
                    // Maximum dimensions
                    const MAX_WIDTH = 800;
                    const MAX_HEIGHT = 800;
                    let width = img.width;
                    let height = img.height;

                    // Calculate new dimensions keeping aspect ratio
                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    // Draw the image onto a hidden canvas
                    const canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    // Compress to JPEG at 70% quality (Instantly shrinks 10MB to ~100KB!)
                    capturedImageBase64 = canvas.toDataURL("image/jpeg", 0.7); 
                    
                    if(photoPreview) photoPreview.src = capturedImageBase64;
                    if(photoPreviewContainer) photoPreviewContainer.style.display = "block";
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file); 
        }
    });
}

if(btnRemovePhoto) {
    btnRemovePhoto.onclick = () => {
        capturedImageBase64 = null;
        if(photoInput) photoInput.value = ""; 
        if(photoPreviewContainer) photoPreviewContainer.style.display = "none";
    };
}
// ----------------------------------------
// view switcher
function switchView(layer){
    document.querySelectorAll(".view-layer").forEach(l => l.classList.remove("active"));
    layer.classList.add("active");
}

// ===============================
// 1. INSTANT ONE-ACTION SOS
// ===============================
btnTriggerSos.onclick = async () => {
    switchView(layerDetails);
    statusTitle.textContent = "Acquiring GPS & Dispatching SOS...";
    offlineWarning.style.display = "none";

    const location = await getLocation();

    if(!location){
        statusTitle.textContent = "Unable to determine location";
        setTimeout(() => switchView(layerSos), 3000);
        return;
    }

    // Save state so we can attach details later
    currentLat = location.latitude;
    currentLon = location.longitude;
    currentAlertId = 'SOS-' + Date.now(); // Unique ID 

    const initialAlert = {
        id: currentAlertId,
        latitude: currentLat,
        longitude: currentLon,
        timestamp: new Date().toISOString(),
        emergencyType: "General SOS", // Default until they specify
        description: "Automated instant SOS triggered. Awaiting further details.",
        image: null
    };

    // update UI
    valType.textContent = initialAlert.emergencyType;
    valTime.textContent = new Date().toLocaleTimeString();
    valLat.textContent = currentLat.toFixed(6);
    valLng.textContent = currentLon.toFixed(6);

    // Send instant alert
    //fetch("http://localhost:5001/emergency", {
    // fetch("http://172.20.10.4:5001/emergency", {
    // fetch("https://unstacked-malisa-unbellicose.ngrok-free.dev:5001/emergency", { 
    // fetch("https://colours-located-anderson-black.trycloudflare.com/emergency", {   
    fetch("https://letting-mai-closes-tom.trycloudflare.com/emergency", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(initialAlert)
    })
    .then(res => {
        if(!res.ok) throw new Error("Server error");
        statusTitle.textContent = "Emergency Sent!...";
    })
    .catch(() => {
        let stored = JSON.parse(localStorage.getItem("offlineEmergencies") || "[]");
        stored.push(initialAlert);
        localStorage.setItem("offlineEmergencies", JSON.stringify(stored));
        offlineWarning.style.display = "block";
        statusTitle.textContent = "Network offline. SOS saved locally.";
    });

    // Wait 2 seconds, then let them add details safely
    setTimeout(() => {
        switchView(layerForm);
        formPrompt.textContent = " Add details if you are safe.";
        btnDispatch.textContent = "Update Alert Details";
    }, 2000);
};


// emergency selection
typeButtons.forEach(btn => {
    btn.onclick = () => {
        typeButtons.forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        selectedType = btn.dataset.type;
    };
});

// ===============================
// 2. DISPATCH (UPDATE WITH DETAILS)
// ===============================
btnDispatch.onclick = async () => {
    switchView(layerDetails);
    statusTitle.textContent = "Sending Additional Details...";
    offlineWarning.style.display = "none";

    const updatedAlert = {
        id: currentAlertId, // Sending same ID updates the dashboard!
        latitude: currentLat,
        longitude: currentLon,
        timestamp: new Date().toISOString(),
        emergencyType: selectedType || "General SOS",
        description: inputDesc.value || "No additional description provided.",
        image: capturedImageBase64 
    };

    valType.textContent = updatedAlert.emergencyType;

    // fetch("http://localhost:5001/emergency", {
    // fetch("http://172.20.10.4:5001/emergency", {
    // fetch("https://colours-located-anderson-black.trycloudflare.com/emergency", {
        fetch("https://letting-mai-closes-tom.trycloudflare.com/emergency", {

        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(updatedAlert)
    })
    .then(res => {
        if(!res.ok) throw new Error("Server error");
        statusTitle.textContent = "Details Sent Successfully!";
    })
    .catch(() => {
        let stored = JSON.parse(localStorage.getItem("offlineEmergencies") || "[]");
        stored.push(updatedAlert);
        localStorage.setItem("offlineEmergencies", JSON.stringify(stored));
        offlineWarning.style.display = "block";
        statusTitle.textContent = "Network offline. Details saved locally.";
    });
};


// ===============================
// GET LOCATION (GPS + IP fallback)
// ===============================
async function getLocation(){
    return new Promise((resolve)=>{
        navigator.geolocation.getCurrentPosition(
            (pos)=>{
                resolve({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
            },
            async ()=>{
                try{
                    const res = await fetch("https://ipapi.co/json/");
                    const data = await res.json();
                    resolve({ latitude: data.latitude, longitude: data.longitude });
                }catch(err){
                    console.error("IP location failed",err);
                    resolve(null);
                }
            },
            {enableHighAccuracy:true,timeout:10000}
        );
    });
}

// ===============================
// RESETS & NAVIGATION
// ===============================
if(btnSkip) {
    btnSkip.onclick = () => {
        switchView(layerDetails);
        statusTitle.textContent = "Help is on the way. Stay safe.";
    };
}

function resetForm() {
    capturedImageBase64 = null;
    if(photoInput) photoInput.value = "";
    if(photoPreviewContainer) photoPreviewContainer.style.display = "none";
    inputDesc.value = "";
    selectedType = null;
    typeButtons.forEach(b => b.classList.remove("selected"));
    formPrompt.textContent = "Select Emergency Type";
    btnDispatch.textContent = "Dispatch Alert";
}

btnCancel.onclick = () => {
    switchView(layerSos);
    resetForm();
};

btnDone.onclick = ()=>{
    switchView(layerSos);
    resetForm();
};


// resend stored emergencies
window.addEventListener("online", sendStoredEmergencies);
sendStoredEmergencies();

setInterval(()=>{
    if(navigator.onLine){
        sendStoredEmergencies();
    }
},5000);

function sendStoredEmergencies(){
    let stored = JSON.parse(localStorage.getItem("offlineEmergencies") || "[]");
    if(stored.length === 0) return;

    stored.forEach(emergency => {

        // fetch("http://localhost:5001/emergency",{
        //fetch("http://172.20.10.4:5001/emergency", {
        // fetch("https://unstacked-malisa-unbellicose.ngrok-free.dev:5001/emergency", {
            // fetch("https://colours-located-anderson-black.trycloudflare.com/emergency", {
                fetch("https://letting-mai-closes-tom.trycloudflare.com/emergency", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(emergency)
        });
    });

    localStorage.removeItem("offlineEmergencies");
}