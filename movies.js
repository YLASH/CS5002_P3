//set the Firefox [about:config ] option security.fileuri.strict_origin_policy to false to test this via a locally stored HTML file




fetch("movies-small.json")
    .then(response => response.json())
    .then(data => { 
             console.log(data);
             GotAllgenre(data);
             GotAllYear(data);
             selectoption(data);  
             showAllYears(data);
             SelectbyYear(data);
             FilterGenre(data);
             SearchbyTitle(data);
             SearchbyCast(data);
             Reset(data)
         }).catch(error => console.log(error));



function createtalbleEle(element){
    var movielist = document.getElementById("movies_data")
    
    var m = document.createElement("tr")
    movielist.append(m)
    //<td> year 
    var year = document.createElement("td")
    year.textContent = element.year;
    m.append(year)
    //<td>title
    var title = document.createElement("td")
    title.textContent = element.title ;
    m.append(title)
    //<td>genres 
    var genr = document.createElement("td")
    genr.textContent = element.genres;
    m.append(genr)
    //<td>cast
    var cast = document.createElement("td")
    cast.textContent = element.cast ;
    m.append(cast)
 }



 function GotAllgenre(data) {
    let Allgenres=[] 
    //To get all of gerners exist in data (from data) 
    data["movies"].forEach(i =>{
        gen = i.genres
        gen.forEach(element=>{
            //To keep all the different genres (No reapting)
            if(!Allgenres.includes(element)){
                Allgenres == Allgenres.push(element) 
            }
        })
    })
    return(Allgenres)

    // //sort 
    // Allgenres == Allgenres.sort(function (a,b) {return a.localeCompare(b)}); 
    // //create genre option 
    // var selGenre = document.getElementById("selectGenre")
    // //ALL
    // var option= document.createElement("option")
    //     option.textContent = option.value = "All";
    //     selGenre.add(option)
    // //option    
    // Allgenres.forEach(element=>{
    //     var option= document.createElement("option")
    //     option.textContent = option.value = element ;
    //     selGenre.add(option)
    // }); 
 }


function GotAllYear(data) {
    let Allyears=[] 
    //To get all of gerners exist in data (from data) 
    data["movies"].forEach(i =>{
        years = i.year
        //To keep all the different genres (No reapting)
            if(!Allyears.includes(years)){
                Allyears == Allyears.push(years) 
            }
    })
    return(Allyears)
}

function selectoption(data){
    Allyears = GotAllYear(data)
    Allgenres = GotAllgenre(data)

    //create Start year options
    var selStaYear = document.getElementById("selectYearStart")
    //Allyears.forEach(element=>{ addoption(element,selStaYear)});
    
    const max = Math.max(...Allyears)
    const min = Math.min(...Allyears)
    //Getting the maximum element of an array
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
    for (var i = min ; i <= max ; i++){
        addoption(i,selStaYear)
     }

    //create End year options 
    var selEndYear = document.getElementById("selectYearEnd")
    Allyears.forEach(element=>{ addoption(element,selEndYear)});
    

    //create genre options
    var selGenre = document.getElementById("selectGenre")
    //ALL
    addoption("All",selGenre)
    //empty    
    addoption("No classified",selGenre)

    //options
    //sort data
    Allgenres == Allgenres.sort(function (a,b) {return a.localeCompare(b)});    
    Allgenres.forEach(element=>{ addoption(element,selGenre)});
    // Allgenres.forEach(element=>{
    //     var option= document.createElement("option")
    //     option.textContent = option.value = element ;
    //     selGenre.add(option)
    // });
    
    //create option element
    function addoption(element,id){
        var option= document.createElement("option")
        option.textContent = option.value = element ;
        id.append(option)
    }
}

// Yearoptions("selectYearStart")
// Yearoptions("selectYearEnd")
// function Yearoptions(id){
//  var Selection = document.getElementById(id) ;
//  for (var i = 1900 ; i <= 2020 ; i+= 5){
//     var option= document.createElement("option")
//     option.textContent = option.value = i ;
//     Selection.add(option)
//  }
// } 

//
function showAllYears(data) {
    document.getElementById("selectYearStart").value = "START";
    document.getElementById("selectYearEnd").value = "END";
    //var button = document.getElementById("selectAllYears")
     data["movies"].forEach(element => createtalbleEle(element))
    // button.onclick = function(){
    //     data["movies"].forEach(element => createtalbleEle(element));
    // }
}


//
function SelectbyYear(data){
    SelectedSY=document.getElementById("selectYearStart")
    SelectedEY=document.getElementById("selectYearEnd")
    SelectedSY.addEventListener(("change") ,()=>{
        clean();
        SelSY = SelectedSY.value
        console.log(SelSY)
        data["movies"].forEach(i =>{
            years= i.year
            if(years >= SelSY){
                createtalbleEle(i)
            }
        })
    })

   //
   SelectedEY.addEventListener(("change") ,()=>{
    SelSY = SelectedSY.value
    SelEY = SelectedEY.value
    if(SelSY > SelEY){
        alert("Start Year is Greater then End Year")
    }   
    clean();
       SelEY = SelectedEY.value
       data["movies"].forEach(i =>{
           years= i.year
           if(years <= SelEY && years >= SelSY){
               //console.log(SelEY , "-",SelSY , i)
               createtalbleEle(i)
           }
       })
   })
}



function FilterGenre(data){
    SelectedG=document.getElementById("selectGenre")
    SelectedG.addEventListener(("change") ,()=>{
        selecti = SelectedG.value
        console.log(selecti)
        clean();
        if(selecti == "All"){
            showAllYears(data)
        } else if (selecti == "No classified"){
            data["movies"].forEach(i =>{
                gens= i.genres
                //Check empty array
                //https://www.freecodecamp.org/news/check-if-javascript-array-is-empty-or-not-with-length/
                if(!gens.length){
                    createtalbleEle(i)
                }
            })
        } else {
        data["movies"].forEach(i =>{
            gens= i.genres
            gens.filter((item) =>{
                if(item.includes(selecti)){
                    createtalbleEle(i)
                }
            })
        })}
     })
}



function SearchbyTitle(data){
    searchTitle= document.getElementById("searchT")
    searchTitle.addEventListener(("click") ,()=>{
        selectit = document.getElementById("inputTt").value.toLowerCase()
        //console.log(selectit)
        clean();
        data["movies"].forEach(i =>{
            Titles= i.title.toLowerCase()
            if(Titles.includes(selectit)){
                createtalbleEle(i)
                //console.log(i)
            }
        })
    })
}

function SearchbyCast(data){
    // selectC = document.getElementById("inputCt").value
    //  searchCast= document.getElementById("searchC")
    //  castind= []
    //  searchCast.addEventListener(("click") ,()=>{
    //      selectC = document.getElementById("inputCt").value.toLowerCase()
    //      console.log(selectC)
    //      clean() ;
    //      data["movies"].forEach((i,index) =>{
    //         Casts= i.cast
    //         //console.log("n" + Casts)
    //          Casts.filter((item) => {
    //             if (item.toLowerCase().includes(selectC)){
    //                 createtalbleEle(i)                         
    //             }
    //           })   
             
    //      })
    //  })
    
    const searchCast= document.getElementById("searchC")
    searchCast.addEventListener(("click") ,()=>{   
        clean() ;     
        let show_data = filteCast(data)
          show_data.forEach(i=>{
              //console.log(data["movies"][i])
              createtalbleEle(data["movies"][i])
        })
      })
     
    function filteCast(data){
        show_data = [];
        const sCast = document.getElementById("inputCt")
        data["movies"].forEach((i,index) =>{
            Casts= i.cast
            Casts.filter((element)=>{
                if( element.toLowerCase().includes(sCast.value.toLowerCase())){
               // console.log(index)
               if(!show_data.includes(index)){
                    show_data == show_data.push(index)
                }
                }     
             })         
        })
        return(show_data)
    }
}


// refer : https://stackoverflow.com/questions/7271490/delete-all-rows-in-an-html-table
function clean(){
    var node = document.getElementById("movies_data");
        while(node.hasChildNodes()){
            node.removeChild(node.lastChild)
        }
}

function Reset(data){
    BtuReset = document.getElementById("Resetselect")
    BtuReset.onclick = () =>{
        clean();
        showAllYears(data)
    }
}



//HTMLElement: change event <select>
//https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event



//selectYearEnd > = selectYearStart
// function getSelectionValue(id) {
//     var selection = document.getElementById(id);
//     var i = selection.selectedIndex;
//     return selection.children[i].value;
// }















//extension elements.
//you could extend the data in some way, for example adding a link to the Wikipedia or IMBD page for the film.
//<a>
