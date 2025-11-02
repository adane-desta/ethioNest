import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css                        */import"./main-CbwL9yMN.js";const c="http://localhost:5200/api";let r=null,i={query:"",price:"Any",type:"Any"};const g=document.getElementById("query"),m=document.getElementById("price"),y=document.getElementById("type"),d=document.getElementById("searchBtn"),n=document.getElementById("propertyGrid");document.addEventListener("DOMContentLoaded",async()=>{const t=Swal.fire({title:"Loading properties...",allowOutsideClick:!1,didOpen:()=>Swal.showLoading()});try{const e=await fetch(`${c}/getProperties/available`);if(e.ok)r=await e.json(),p(r);else{const a=await e.json();throw new Error(a.message||"Failed to load properties")}}catch(e){await Swal.fire({icon:"error",title:"Error",text:e.message}),n.innerHTML='<p class="error-message">Failed to load properties. Please try again later.</p>'}finally{t.close()}d.addEventListener("click",v),g.addEventListener("input",e=>{i.query=e.target.value}),m.addEventListener("change",e=>{i.price=e.target.value}),y.addEventListener("change",e=>{i.type=e.target.value})});async function v(){const t=d,e=t.innerHTML;try{if(t.innerHTML='<span class="button-loader"></span> Searching...',t.disabled=!0,!r){const s=await fetch(`${c}/getProperties/available`);if(s.ok)r=await s.json();else throw new Error("Failed to refresh properties")}const a=w(r,i);p(a),n.scrollIntoView({behavior:"smooth",block:"start"}),a.length===0?await Swal.fire({icon:"info",title:"No results",text:"Try different search criteria",toast:!0,position:"top-end",showConfirmButton:!1,timer:3e3}):await Swal.fire({icon:"success",title:`${a.length} properties found`,toast:!0,position:"top-end",showConfirmButton:!1,timer:2e3})}catch(a){await Swal.fire({icon:"error",title:"Search failed",text:a.message})}finally{t.innerHTML=e,t.disabled=!1}}function w(t,e){return t?t.filter(a=>{var o,l;const s=parseFloat(a.price),u=((o=a.specific_place)==null?void 0:o.toLowerCase().includes(e.query.toLowerCase()))||((l=a.title)==null?void 0:l.toLowerCase().includes(e.query.toLowerCase())),f=e.price==="Any"||e.price==="Under 1M ETB"&&s<1e6||e.price==="1M ETB - 3M ETB"&&s>=1e6&&s<=3e6||e.price==="3M ETB - 6M ETB"&&s>3e6&&s<=6e6||e.price==="6M ETB - 9M ETB"&&s>6e6&&s<=9e6||e.price==="Over 10M ETB"&&s>1e7,h=e.type==="Any"||e.type.toLowerCase()===a.type.toLowerCase();return u&&f&&h}):[]}function p(t){if(!(t!=null&&t.length)){n.innerHTML=`
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>No properties found matching your criteria</p>
                <button class="btn-primary" onclick="resetFilters()">Reset Filters</button>
            </div>
        `;return}n.innerHTML=t.map(e=>`
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
                    <button class="btn-outline btn-primary" onClick="showDetail(${e.id})">View Details</button>
                    <button class="favorite-btn" aria-label="Add to favorites" onclick="toggleFavorite(${e.id}, this)">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join("")}
