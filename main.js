const cont = document.querySelector(".container");
const get = function(name){

    const showResult = async function(){
    
        //https://restcountries.eu/rest/v2/all
    
        //https://restcountries.eu/rest/v2/name/bangladesh
    
        const response = await fetch(`https://restcountries.eu/rest/v2/name/${name}`);
        const Data = await response.json();

        if(!response.ok){  //if ok property is false.
            alert("Check spelling or Internet connection!");
        }
        else{
            const details = {
                flag : Data[0].flag,
                name : Data[0].name,
                capital : Data[0].capital,
                lang : Data[0].languages[0].name,
                population : Data[0].population,
                region : Data[0].region,
                area : Data[0].area
            };
        
            const card = `
            <div class="card">
            <div class="img-box">
                <img src="${details.flag}" alt="Flag image">
            </div>
        
            <ul class="details-box">
                <li class="list">
                    <svg class="icon">
                        <use xlink:href="img/sprite.svg#icon-pen"></use>
                    </svg>
                    Name : ${details.name}.
                </li>
                <li class="list">
                    <svg class="icon">
                        <use xlink:href="img/sprite.svg#icon-library"></use>
                    </svg>
                    Capital : ${details.capital}.
                </li>
                <li class="list">
                    <svg class="icon">
                        <use xlink:href="img/sprite.svg#icon-volume-high"></use>
                    </svg>
                    Language : ${details.lang}.
                </li>
                <li class="list">
                    <svg class="icon">
                        <use xlink:href="img/sprite.svg#icon-target"></use>
                    </svg>
                    Region : ${details.region}.
                </li>
                <li class="list">
                    <svg class="icon">
                        <use xlink:href="img/sprite.svg#icon-man-woman"></use>
                    </svg>
                    Population : ${details.population}.
                </li>
                <li class="list">
                    <svg class="icon">
                        <use xlink:href="img/sprite.svg#icon-bullhorn"></use>
                    </svg>
                    Area : ${details.area} Sqkm.
                </li>
            </ul>
            `;
        
            cont.insertAdjacentHTML("beforeend", card);
        }

    };

    showResult();
};

let inp = document.querySelector(".input-box");
const form = document.querySelector(".btn");

const callForSrc = function(){
    if(inp.value !== ""){
        get(inp.value);
        inp.value = "";
    }
};

form.addEventListener("click",callForSrc);
window.addEventListener("keypress",(e)=>{
    if(e.keyCode === 13){
        callForSrc();
    }
});

const whereAmI = function(lat,lng){
    fetch(`
    https://geocode.xyz/${lat},${lng}?geoit=json
    `).then(res => res.json())
    .then(data => {
        const aboutPlace = {
            country : data.country,
            city : data.city,
            street : data.poi.addr_street
        };

        const addText = `
        Country : ${aboutPlace.country}.
        City : ${aboutPlace.city}.
        Street : ${aboutPlace.street}.
        `;
        let para = document.querySelector(".para");
        para.insertAdjacentText("afterbegin",addText);
        document.querySelector(".location").style.backgroundColor = "#fff";
    })
    .catch(err=> alert("After click please wait for a while...try again!"));

};

let pos = document.querySelector(".btn-2");

pos.addEventListener("click",()=>{
    //getting lattitude & longitude value of your location.
    navigator.geolocation.getCurrentPosition(function(position){
        const {latitude:lat,longitude:lng} = position.coords;
        //console.log(lat,lng);
        document.querySelector(".para").innerHTML = "";
        whereAmI(lat,lng);

    },function(){
        alert("Location no found!");
    });
});