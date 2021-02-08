
const get = function(name){

    const showResult = async function(){
        const cont = document.querySelector(".container");
    
        //https://restcountries.eu/rest/v2/all
    
        //https://restcountries.eu/rest/v2/name/bangladesh
    
        const response = await fetch(`https://restcountries.eu/rest/v2/name/${name}`);
        const Data = await response.json();
    
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
    };
    
    showResult();
};

const form = document.querySelector(".btn");
form.addEventListener("click",()=>{
    let inp = document.querySelector(".input-box").value;
    if(inp !== null){
        get(inp);
        inp.value = "";
    }
    
});

