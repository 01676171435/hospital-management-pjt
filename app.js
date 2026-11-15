const loadServices=() =>{
    // fetch("https://testing-8az5.onrender.com/services/")
    fetch("http://127.0.0.1:8000/services/")
        .then( (res) => res.json())
        .then((data) =>displayService(data))
        .catch((err) =>console.log(err))

}


const displayService=(service)=>{
    service.forEach((ser) => {
        
        const parent=document.getElementById("service-container");
        const li=document.createElement("li");
        li.innerHTML=`
        
                     <div class="card shadow h-100">
                            <div class="ratio ratio-16x9">
                                <img src=${ser.image}
                                  
                                    class="card-img-top" 
                                    loading="lazy"
                                     alt="..."
                                />
                            </div>
                            
                            <div class="card-body  p-3 p-xl-5">
                                <h3 class="card-title h5">${ser.name}</h3>
                                <p class="card-text">
                                    ${ser.description.slice(0,140)}
                                </p>
                                <a href="#" class="btn btn-primary">Details</a>
                            </div>
                        
                        </div>
        
         `
         parent.appendChild(li);
    });
}



const loadDesignation=()=>{
     fetch("https://testing-8az5.onrender.com/doctor/designation/")
        .then((res)=>res.json())
        .then((data)=>{
            data.forEach((item)=>{
                    const parent=document.getElementById("drop-deg")
                    const li=document.createElement("li")
                    li.classList.add("dropdown-item")
                    li.innerText=item?.name
                    parent.appendChild(li);
            })
        });

}

const loadSpecialization=()=>{
     fetch("https://testing-8az5.onrender.com/doctor/specialization/")
        .then((res)=>res.json())
        .then((data)=>{
            data.forEach((item)=>{
                    const parent=document.getElementById("drop-spe")
                    const li=document.createElement("li")
                    li.classList.add("dropdown-item")
                    li.innerHTML=`
                     <li onclick="loadDoctors('${item?.name}')"> ${item?.name} </li>`
                    parent.appendChild(li);
            })
        });

}

const loadDoctors=(search)=>{
    document.getElementById("doctors").innerHTML="";
    document.getElementById("spinner").style.display="block"
    // fetch(`https://testing-8az5.onrender.com/doctor/list/?search=${search ? search :""}`)
    fetch(`http://127.0.0.1:8000/doctor/list/?search=${search ? search :""}`)
        .then((res)=>res.json())
        .then((data)=>{
            //(data.results.length>0)
            if(data.length>0){
                document.getElementById("spinner").style.display="none"
                document.getElementById("nodata").style.display="none"
                            //(data?.results);
                displayDoctors(data);
            }
            else{
                document.getElementById("doctors").innerHTML="";
                document.getElementById("spinner").style.display="none"
                document.getElementById("nodata").style.display="block"
            }
             
        });


}

const displayDoctors=(doctors)=>{
         
         document.getElementById("doctors").innerHTML="";
        
         doctors?.forEach((doctor)=>{
         const parent=document.getElementById("doctors");
         const div= document.createElement("div");
         div.classList.add("doc-card");
         div.innerHTML=`
                <img class="doc-img" src="${doctor?.image}" alt="" >
                       
                       <h4>${doctor?.full_name}</h4>
                       <h6></h6>
                       
                       <p>
                           Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                           Velit commodi sapiente qui numquam eligendi! Facilis praesentium maxime unde.

                       </p>
                       
                       <p>
                           ${doctor?.specialization?.map((item)=>{
                             return `<button>${item}</button>`
                           })}
                        
                       </p>
                       
                    <button> <a target="_blank" href="docDetails.html?doctorID=${doctor.id}">Details </a> </button>
          
         `;
            parent.appendChild(div);
      
        });
}


const handleSearch = () =>{
    const value=document.getElementById("search").value
    //console.log(value);
     loadDoctors(value);
};

const loadReview=()=>{
     fetch("https://testing-8az5.onrender.com/doctor/review/")
        .then((res)=>res.json())
        .then((data) => displayReview(data))
          

}

const displayReview=(review) =>{
        review?.forEach((review)=>{
         const parent=document.getElementById("review-container");
         const div= document.createElement("div");
         div.classList.add("review-card");
         div.innerHTML=`
                 
               <img src="./images/pic6.jpg" alt="">
                    <h4 class="title"> ${review.reviewer} </h4>
                        <p> 
                            ${review.body.slice(0, 100)}
                        </p>
                        
                <h6>${review.rating}</h6>
         
         `
          parent.appendChild(div);
        
        });

      
}

loadServices();
loadDesignation();
loadSpecialization();
loadDoctors();
loadReview();

