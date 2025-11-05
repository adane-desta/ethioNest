import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css                        */import"./main-n1Spxp1A.js";const d="http://localhost:5200/api";let i=null,s={query:"",price:"Any",type:"Any"};const p=document.getElementById("query"),u=document.getElementById("price"),f=document.getElementById("type"),y=document.getElementById("searchBtn"),n=document.getElementById("propertyGrid");document.addEventListener("DOMContentLoaded",async()=>{const a=Swal.fire({title:"Loading properties...",allowOutsideClick:!1,didOpen:()=>Swal.showLoading()});try{const e=await fetch(`${d}/getProperties/available`);if(e.ok)i=await e.json(),o(i);else{const t=await e.json();throw new Error(t.message||"Failed to load properties")}}catch(e){await Swal.fire({icon:"error",title:"Error",text:e.message}),n.innerHTML='<p class="error-message">Failed to load properties. Please try again later.</p>'}finally{a.close()}y.addEventListener("click",g),p.addEventListener("input",e=>{s.query=e.target.value}),u.addEventListener("change",e=>{s.price=e.target.value}),f.addEventListener("change",e=>{s.type=e.target.value})});async function g(){const a=y,e=a.innerHTML;try{if(a.innerHTML='<span class="button-loader"></span> Searching...',a.disabled=!0,!i){const r=await fetch(`${d}/getProperties/available`);if(r.ok)i=await r.json();else throw new Error("Failed to refresh properties")}const t=b(i,s);o(t),n.scrollIntoView({behavior:"smooth",block:"start"}),t.length===0?await Swal.fire({icon:"info",title:"No results",text:"Try different search criteria",toast:!0,position:"center",showConfirmButton:!1,timer:3e3}):await Swal.fire({icon:"success",title:`${t.length} properties found`,toast:!0,position:"center",showConfirmButton:!1,timer:2e3})}catch(t){await Swal.fire({icon:"error",title:"Search failed",text:t.message})}finally{a.innerHTML=e,a.disabled=!1}}function b(a,e){return a?a.filter(t=>{var c,l;const r=parseFloat(t.price),h=((c=t.specific_place)==null?void 0:c.toLowerCase().includes(e.query.toLowerCase()))||((l=t.title)==null?void 0:l.toLowerCase().includes(e.query.toLowerCase())),m=e.price==="Any"||e.price==="Under 1M ETB"&&r<1e6||e.price==="1M ETB - 3M ETB"&&r>=1e6&&r<=3e6||e.price==="3M ETB - 6M ETB"&&r>3e6&&r<=6e6||e.price==="6M ETB - 9M ETB"&&r>6e6&&r<=9e6||e.price==="Over 10M ETB"&&r>1e7,v=e.type==="Any"||e.type.toLowerCase()===t.type.toLowerCase();return h&&m&&v}):[]}function o(a){if(!(a!=null&&a.length)){n.innerHTML=`
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>No properties found matching your criteria</p>
                <button class="btn-primary reset-filter">Reset Filters</button>
            </div>
        `,document.querySelectorAll(".btn-primary.reset-filter").forEach(e=>{e.addEventListener("click",function(){w()})});return}n.innerHTML=a.map(e=>`
        <div class="property-card">
            <div class="property-img">
                <img src="${e.image_path||"/images/default-property.jpg"}" alt="${e.title||"Property"}">
                <span class="property-badge">${e.rentorsell==="sell"?"For Sale":"For Rent"}</span>
            </div>
            <div class="property-details">
                <div class="property-price">
                    ${parseFloat(e.price).toLocaleString("en-US")} ETB
                    ${e.negotiable==="yes"?'<span class="negotiable">(Negotiable)</span>':""}
                </div>
                <div class="property-address">${e.specific_place||e.address||"Address not available"}</div>
                <div class="property-features">
                    <span class="feature"><i class="fas fa-bed"></i> ${e.bedrooms} Beds</span>
                    <span class="feature"><i class="fas fa-bath"></i> ${e.bathrooms} Baths</span>
                    <span class="feature"><i class="fas fa-ruler-combined"></i> ${e.area} sqft</span>
                </div>
                <div class="property-footer">
                    <button class="btn-outline btn-primary" data-propertyId="${e.id}">View Details</button>
                    <button class="favorite-btn" aria-label="Add to favorites" data-propertyId="${e.id}">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join(""),document.querySelectorAll(".favorite-btn").forEach(e=>{e.addEventListener("click",function(){const t=this.getAttribute("data-propertyId");E(t,this)})}),document.querySelectorAll(".btn-outline.btn-primary").forEach(e=>{e.addEventListener("click",function(){const t=this.getAttribute("data-propertyId");L(t)})})}function w(){s={query:"",price:"Any",type:"Any"},p.value="",u.value="Any",f.value="Any",o(i)}function E(a,e){const t=e.querySelector("i");t.classList.contains("fas")?t.classList.replace("fas","far"):t.classList.replace("far","fas")}function L(a){localStorage.setItem("activeProperty",a),window.location.href="/property-detail.html"}
