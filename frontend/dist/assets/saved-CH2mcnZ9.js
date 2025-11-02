import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css                        */import"./main-CbwL9yMN.js";const n="http://localhost:5200/api",s=document.getElementById("propertyGrid"),i=document.createElement("div");i.className="no-results";i.innerHTML=`
    <i class="fas fa-heart"></i>
    <p>You haven't saved any properties yet</p>
    <button class="btn-primary" onclick="window.location.href='./properties.html'">
        Browse Properties
    </button>
`;document.addEventListener("DOMContentLoaded",async()=>{const t=Swal.fire({title:"Loading your saved properties...",allowOutsideClick:!1,didOpen:()=>Swal.showLoading()});try{const e=JSON.parse(localStorage.getItem("activeUser"));if(!e)throw new Error("Please login to view saved properties");const a=await fetch(`${n}/getsavedproperties?tenant=${e.id}`);if(!a.ok){const r=await a.json();throw new Error(r.message||"Failed to load saved properties")}const o=await a.json();o.length===0?(s.innerHTML="",s.appendChild(i)):l(o)}catch(e){await Swal.fire({icon:"error",title:"Error",text:e.message||"Failed to load saved properties"}),e.message.includes("login")?s.innerHTML=`
                <div class="no-results">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>${e.message}</p>
                    <button class="btn-primary" onclick="window.location.href='./login.html'">
                        Login Now
                    </button>
                </div>
            `:s.innerHTML=`
                <div class="no-results">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>${e.message}</p>
                    <button class="btn-primary" onclick="window.location.reload()">
                        Try Again
                    </button>
                </div>
            `}finally{t.close()}});function l(t){s.innerHTML=t.map((e,a)=>`
        <div class="property-card">
            <div class="property-img">
                <img src="${e.image_path||"/images/default-property.jpg"}" alt="${e.title||"Property"}">
                <span class="property-badge">${e.status||"Available"}</span>
                <button class="unsave-btn" onclick="unsaveProperty(${e.id}, this)">
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
                    <button onClick="showDetail(${e.id})" class="btn-outline btn-primary">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    `).join("")}
