import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css                        */import"./main-n1Spxp1A.js";const l="https://ethinest.onrender.com/api",a=document.getElementById("propertyGrid"),i=document.createElement("div");i.className="no-results";i.innerHTML=`
    <i class="fas fa-heart"></i>
    <p>You haven't saved any properties yet</p>
    <button class="btn-primary" onclick="window.location.href='./properties.html'">
        Browse Properties
    </button>
`;document.addEventListener("DOMContentLoaded",async()=>{const r=Swal.fire({title:"Loading your saved properties...",allowOutsideClick:!1,didOpen:()=>Swal.showLoading()});try{const e=JSON.parse(localStorage.getItem("activeUser"));if(!e)throw new Error("Please login to view saved properties");const t=await fetch(`${l}/getsavedproperties?tenant=${e.id}`);if(!t.ok){const s=await t.json();throw new Error(s.message||"Failed to load saved properties")}const o=await t.json();o.length===0?(a.innerHTML="",a.appendChild(i)):d(o)}catch(e){await Swal.fire({icon:"error",title:"Error",text:e.message||"Failed to load saved properties"}),e.message.includes("login")?a.innerHTML=`
                <div class="no-results">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>${e.message}</p>
                    <button class="btn-primary" onclick="window.location.href='./login.html'">
                        Login Now
                    </button>
                </div>
            `:a.innerHTML=`
                <div class="no-results">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>${e.message}</p>
                    <button class="btn-primary" onclick="window.location.reload()">
                        Try Again
                    </button>
                </div>
            `}finally{r.close()}});function d(r){a.innerHTML=r.map((e,t)=>`
        <div class="property-card">
            <div class="property-img">
                <img src="${e.image_path||"/images/default-property.jpg"}" alt="${e.title||"Property"}">
                <span class="property-badge">${e.status||"Available"}</span>
                <button class="unsave-btn property" data-property="${e.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="property-details">
                <h3 class="property-title">${e.title||"No Title"}</h3>
                <div class="property-price">
                    ${parseFloat(e.price||0).toLocaleString("en-US")} ETB
                    ${e.negotiable==="yes"?'<span class="negotiable">(Negotiable)</span>':""}
                </div>
                <div class="property-address">${e.address||"Address not available"}</div>
                <div class="property-features">
                    <span class="feature"><i class="fas fa-bed"></i> ${e.bedrooms||0} Beds</span>
                    <span class="feature"><i class="fas fa-bath"></i> ${e.bathrooms||0} Baths</span>
                    <span class="feature"><i class="fas fa-ruler-combined"></i> ${e.area||0} sqft</span>
                </div>
                <div class="property-footer">
                    <button data-property="${e.id}" class="btn-outline btn-primary">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    `).join(""),document.querySelectorAll(".unsave-btn.property").forEach(e=>{e.addEventListener("click",function(){const t=this.getAttribute("data-property");p(t,this)})}),document.querySelectorAll(".btn-outline.btn-primary").forEach(e=>{e.addEventListener("click",function(){const t=this.getAttribute("data-property");u(t)})})}async function p(r,e){if(!(await Swal.fire({title:"Remove Property?",text:"Are you sure you want to remove this property from your saved list?",icon:"question",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, remove it!"})).isConfirmed)return;const o=e.innerHTML;e.innerHTML='<i class="fas fa-spinner fa-spin"></i>',e.disabled=!0;try{const s=JSON.parse(localStorage.getItem("activeUser"));if(!s)throw new Error("Please login to manage saved properties");const n=await fetch(`${l}/unsavefromfavorite?prop_id=${r}&user_id=${s.id}`);if(n.ok)await Swal.fire({icon:"success",title:"Removed!",text:"Property has been removed from your saved list",toast:!0,position:"center",showConfirmButton:!1,timer:2e3}),e.closest(".property-card").remove(),document.querySelectorAll(".property-card").length===0&&(a.innerHTML="",a.appendChild(i));else{const c=await n.json();throw new Error(c.message||"Failed to remove property")}}catch(s){await Swal.fire({icon:"error",title:"Error",text:s.message})}finally{e.innerHTML=o,e.disabled=!1}}function u(r){localStorage.setItem("activeProperty",r),window.location.href="./property-detail.html"}
