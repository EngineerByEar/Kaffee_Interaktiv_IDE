const btn_plantation = document.getElementById("Button_Kaffeebohne");
const btn_harvest = document.getElementById("Button_Zeit_Ernte");
const btn_bean_price = document.getElementById("Button_Preisentwicklung ");
const btn_preprocessing_quality = document.getElementById("Button_Zeit_Qualität");
const btn_preprocessing_time = document.getElementById("Button_Zeit_Aufbreitung");
const btn_roast = document.getElementById("Button_Kaffeeröstung");
const btn_roast_time = document.getElementById("Button_Zeit_Röstung");
const btn_market = document.getElementById("Button_Marktanteile ");
const background = document.getElementById("infographic");

//load buttons and popups from index.html
const btns = [btn_plantation, btn_harvest, btn_bean_price, btn_preprocessing_quality, btn_preprocessing_time, btn_roast, btn_roast_time, btn_market]
const popups = document.querySelectorAll(".Popup");

window.addEventListener("load", ()=>{
    //create close buttons for popups and append them
    for(const popup of popups){
        const popup_close_btn = document.createElement("button");
        popup_close_btn.className = "close_btn";
        popup_close_btn.id = `${popup.id}_close_btn`;
        popup_close_btn.innerHTML = "&#10005;";
        //event listener to close the popup on click
        popup_close_btn.addEventListener("click", ()=>{
            popup_close_btn.parentElement.style.display = "none";
            background.classList.remove("blurred");
        })

        popup.appendChild(popup_close_btn);
    }
    //wiggle animation
    for (const btn of btns){
        console.log(`wiggle on ${btn.id}`)
        btn.classList.add("wiggle");
    }
})

//open popup function
function open_popup(popup_name){
    const popup = document.getElementById(popup_name);
    popup.style.display = "flex";
    //blur background
    background.classList.add("blurred");
}

//open correct popup on button click
btn_plantation.addEventListener("click", function(){
    console.log("plantation");
    open_popup("plantation");
})

btn_harvest.addEventListener("click", function(){
    console.log("harvest");
    open_popup("harvest");
})

btn_bean_price.addEventListener("click", function(){
    console.log("bean_price");
    open_popup("bean_price");
})

btn_preprocessing_quality.addEventListener("click", function(){
    console.log("preprocessing_quality");
    open_popup("preprocessing_quality");
})

btn_preprocessing_time.addEventListener("click", function(){
    console.log("preprocessing_time");
    open_popup("preprocessing_time");
})

btn_roast.addEventListener("click", function(){
    console.log("roast");
    open_popup("roast");
})

btn_roast_time.addEventListener("click", function(){
    console.log("roast_time");
    open_popup("roast_time");
})

btn_market.addEventListener("click", function(){
    console.log("market");
    open_popup("market");
})

