

 const url = 'http://localhost:3000/dogs';
 const grid_dog = document.getElementById("dogrid");
 const btnSearch = document.getElementById("btnSearch");
 const txtSearch = document.getElementById("txtSearch");
 const divAviso = document.getElementById("divAviso");
 const divPag = document.getElementById("divPag");
 const numPage= 24;
 var basededados;
 var current_page = 1;
 var npages;
 

 async function load(){
    const response = await fetch(url);
    const database = await response.json();
  
    npages = database.length/ numPage;
   
   
    pagination(parseInt(npages, 10));
   
    adicionar(database,0,24);

 }

load();
 

function adicionar(dogs,range1,range2){

   let count = 0;


   for (let i = range1; i < range2; i++) {
     criar(dogs[i],i);
   }


}

function pagination(num){
      
       npages=num;
       

       const next = document.createElement("a");
      
       next.addEventListener('click',function(e){

           nextpage();

       });
       next.href="#";
       next.innerHTML=`>`;
       const previous = document.createElement("a");
       previous.addEventListener('click',function(e){

           previouspage();

       });
       previous.href="#";
       previous.innerHTML=`<`;
       previous.addEventListener('click',function(e){

        previouspage();

       });
      
 
       divPag.appendChild(previous);
       for(let i=1;i<=npages;i++){

        const pages= document.createElement("a");
        pages.id=i;
        pages.href="#";
        pages.innerHTML=`${i}`;

        pages.addEventListener('click',function(e){

            changepage(i);
        });
        divPag.appendChild(pages);
       }
       divPag.appendChild(next);
     


}


function nextpage(){
     if(current_page< 8){

        current_page++;
        changepage(current_page);
     }

}
function previouspage(){
    
    if(current_page>1){

        current_page--;
        changepage(current_page);
        
    }

}
function changepage(page){

   
    
   
}

function criar(dog,i){
   
    const objdog = document.createElement("div");
   
    objdog.id="dog_"+i;

    objdog.classList.add("cao");

    
    objdog.dataset.id=dog.id;
    objdog.dataset.name=dog.name;
    let name = "https://www.youtube.com/results?search_query="+dog.name;
    objdog.classList.add("mb-2");
    objdog.innerHTML = `
        <img src='${dog.image.url} '/>
        <div>
          <p>${dog.name}</p>
          <a id="info_${dog.id}" href="${name}"class="btn"><span><i class="fa-solid fa-circle-info"></i></span></a>
         </div>
    `
    

       grid_dog.appendChild(objdog);
 
}

function eleminardog(id){

    const name = "dog_"+id;
    console.log(name);
    const dog = document.getElementById(name);
    console.log(dog);
    grid_dog.removeChild(dog);
}


function criarmodal (id){

    const cao = buscarcao(id);
    console.log(cao.name);

}

async function buscarcao(id){
    
    let url = "http://localhost:3000/dogs?id="+id;
    let cao = null
    const response = await fetch(url);
    cao = await response.json();
    return cao
     
}

function showinfo(){




}

function search(text){
    let aux = 0 ;
    grid_dog.querySelectorAll('.cao').forEach(elem =>{   
        

            if(elem.dataset.name == text){
                elem.classList.remove("hide");
                aux++
                
                console.log(elem);
            }else{
                
                elem.classList.add("hide");
            }


        
        if(aux==0){

            grid_dog.classList.add("hide");
            divAviso.classList.remove("hide");
            divPag.classList.add("hide");

        }else{

            divAviso.classList.add("hide");
            grid_dog.classList.remove("hide");
            divPag.classList.add("hide");

        }
    
    });

}

btnSearch.addEventListener('click',function(e){

   const text= txtSearch.value;

    search(text);
});
 