import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css                        *//* empty css              */import"./main-CbwL9yMN.js";const u="http://localhost:5200/api",p=[{rating:"★★★★★",testimony:'"Found my dream apartment in just 2 days! The process was so easy compared to traditional methods."',userImg:"/images/Screenshot 2025-06-23 224442.png",userName:"Kaleb M., Tenant"},{rating:"★★★★★",testimony:`"As a property owner, I've rented my units 3x faster using SidamaRent. Highly recommended!"`,userImg:"/images/Screenshot 2025-06-23 224827.png",userName:"Selam W., Property Owner"},{rating:"★★★★☆",testimony:'"The customer service team helped me resolve an issue within hours. Great platform!"',userImg:"/images/Screenshot 2025-06-23 224429.png",userName:"Daniel T., Buyer"}],f=[{image:"/images/images (1).jpeg",locName:"Pissa",proAvailable:"42 properties available"},{image:"/images/images (1).jpeg",locName:"Atote",proAvailable:"18 properties available"},{image:"/images/images.jpeg",locName:"Alito",proAvailable:"25 properties available"},{image:"/images/Lake_Hawassa_.jpg",locName:"Fikir Hayk",proAvailable:"12 properties available"}],l=document.querySelector(".mobile-menu-btn"),c=document.querySelector(".nav-links");l&&c&&l.addEventListener("click",()=>{c.classList.toggle("active"),l.innerHTML=c.classList.contains("active")?'<i class="fas fa-times"></i>':'<i class="fas fa-bars"></i>'});const m=document.querySelectorAll(".search-tabs button");m.length>0&&m.forEach(s=>{s.addEventListener("click",()=>{m.forEach(t=>t.classList.remove("active")),s.classList.add("active")})});const d=document.querySelectorAll(".save-btn");d.length>0&&d.forEach(s=>{s.addEventListener("click",async function(){if(!localStorage.getItem("activeUser")){(await Swal.fire({title:"Login Required",text:"You need to login to save properties",icon:"warning",showCancelButton:!0,confirmButtonText:"Login",cancelButtonText:"Cancel"})).isConfirmed&&(window.location.href="./login.html");return}const i=this.querySelector("i");i.classList.contains("far")?(i.classList.replace("far","fas"),await Swal.fire({icon:"success",title:"Saved!",text:"Property added to your favorites",toast:!0,position:"top-end",showConfirmButton:!1,timer:1500})):(i.classList.replace("fas","far"),await Swal.fire({icon:"info",title:"Removed!",text:"Property removed from favorites",toast:!0,position:"top-end",showConfirmButton:!1,timer:1500}))})});document.addEventListener("DOMContentLoaded",async()=>{const s=Swal.fire({title:"Loading featured properties...",allowOutsideClick:!1,didOpen:()=>Swal.showLoading()});try{const t=document.getElementById("propertyGrid"),i=document.getElementById("testimonialCards"),a=document.getElementById("locationCards"),o=await fetch(`${u}/recentproperties`);if(!o.ok)throw new Error("Failed to load properties");const n=await o.json();t&&(t.innerHTML=n.map(e=>`
                <div class="property-card">
                    <div class="badge">${e.rentorsell==="sell"?"For Sale":"For Rent"}</div>
                    <img src="${e.image_path||"/images/default-property.jpg"}" alt="${e.title||"Property"}">
                    <div class="property-details">
                        <h3>${e.title||"No Title"}</h3>
                        <p><i class="fas fa-map-marker-alt"></i> ${e.specific_place||e.address||"Location not specified"}</p>
                        <div class="features">
                            <span><i class="fas fa-bed"></i> ${e.bedrooms||0}</span>
                            <span><i class="fas fa-bath"></i> ${e.bathrooms||0}</span>
                            <span><i class="fas fa-vector-square"></i> ${e.area||0} sqft</span>
                        </div>
                        <div class="price">${parseFloat(e.price||0).toLocaleString("en-US")} ETB</div>
                    </div>
                </div>
            `).join("")),i&&(i.innerHTML=p.map(e=>`
                <div class="testimonial">
                    <div class="rating">${e.rating}</div>
                    <p>${e.testimony}</p>
                    <div class="user">
                        <img src="${e.userImg}" alt="${e.userName}">
                        <span>${e.userName}</span>
                    </div>
                </div>
            `).join("")),a&&(a.innerHTML=f.map(e=>`
                <div class="location">
                    <img src="${e.image}" alt="${e.locName}">
                    <h3>${e.locName}</h3>
                    <p>${e.proAvailable}</p>
                </div>
            `).join(""))}catch(t){console.error("Error loading content:",t),await Swal.fire({icon:"error",title:"Error",text:"Failed to load some content. Please try refreshing the page."})}finally{s.close()}});const r=document.getElementById("feedbackForm");r&&r.addEventListener("submit",async s=>{s.preventDefault();const t=r.querySelector('button[type="submit"]'),i=t.innerHTML;t.innerHTML='<span class="button-loader"></span> Sending...',t.disabled=!0;try{const a={name:document.getElementById("name").value.trim(),email:document.getElementById("email").value.trim(),subject:document.getElementById("subject").value.trim(),message:document.getElementById("message").value.trim()};if(!a.name||!a.email||!a.message)throw new Error("Please fill in all required fields");if(!/^\S+@\S+\.\S+$/.test(a.email))throw new Error("Please enter a valid email address");const o=await fetch(`${u}/addFeedback`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});if(!o.ok){const n=await o.json();throw new Error(n.message||"Failed to send feedback")}await Swal.fire({icon:"success",title:"Thank You!",text:"Your feedback has been submitted successfully",showConfirmButton:!1,timer:2e3}),r.reset()}catch(a){await Swal.fire({icon:"error",title:"Submission Failed",text:a.message})}finally{t.innerHTML=i,t.disabled=!1}});
