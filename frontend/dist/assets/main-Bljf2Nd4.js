import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css                        *//* empty css              */console.log("you are here");const c="https://ethinest.onrender.com/api",l=[{rating:"★★★★★",testimony:'"Found my dream apartment in just 2 days! The process was so easy compared to traditional methods."',userImg:"/images/Screenshot 2025-06-23 224442.png",userName:"Kaleb M., Tenant"},{rating:"★★★★★",testimony:`"As a property owner, I've rented my units 3x faster using SidamaRent. Highly recommended!"`,userImg:"/images/Screenshot 2025-06-23 224827.png",userName:"Selam W., Property Owner"},{rating:"★★★★☆",testimony:'"The customer service team helped me resolve an issue within hours. Great platform!"',userImg:"/images/Screenshot 2025-06-23 224429.png",userName:"Daniel T., Buyer"}],m=[{image:"/images/images.jpeg",locName:"Pissa",proAvailable:"42 properties available"},{image:"/images/images (1).jpeg",locName:"Atote",proAvailable:"18 properties available"},{image:"/images/images.jpeg",locName:"Alito",proAvailable:"25 properties available"},{image:"/images/Lake_Hawassa_.jpg",locName:"Fikir Hayk",proAvailable:"12 properties available"}],n=document.querySelector(".mobile-menu-btn"),i=document.querySelector(".nav-links");n.addEventListener("click",()=>{i.classList.toggle("active"),n.innerHTML=i.classList.contains("active")?'<i class="fas fa-times"></i>':'<i class="fas fa-bars"></i>'});const o=document.querySelectorAll(".search-tabs button");o.forEach(s=>{s.addEventListener("click",()=>{o.forEach(t=>t.classList.remove("active")),s.classList.add("active")})});const d=document.querySelectorAll(".save-btn");d.forEach(s=>{s.addEventListener("click",function(){this.innerHTML=this.innerHTML.includes("far")?'<i class="fas fa-heart"></i>':'<i class="far fa-heart"></i>'})});document.addEventListener("DOMContentLoaded",async()=>{const s=document.getElementById("propertyGrid"),t=document.getElementById("testimonialCards"),r=document.getElementById("locationCards");(await(await fetch(`${c}/recentproperties`)).json()).forEach(e=>{s.innerHTML+=`
        <div class="property-card">
        <div class="badge">${e.rentorsell}</div>
        <img src="${e.image_path}" alt="${e.title}">
        <div class="property-details">
            <h3>${e.title}</h3>
            <p><i class="fas fa-map-marker-alt"></i> ${e.specific_place}</p>
            <div class="features">
                <span><i class="fas fa-bed"></i> ${e.bedrooms}</span>
                <span><i class="fas fa-bath"></i>${e.bathrooms}</span>
                <span><i class="fas fa-vector-square"></i> ${e.area}</span>
            </div>
            <div class="price">${parseFloat(e.price).toLocaleString("en-US")} ETB</div>
            
        </div>
    </div>
        `}),l.forEach(e=>{t.innerHTML+=`

        <div class="testimonial">
        <div class="rating">${e.rating}</div>
        <p>${e.testimony}</p>
        <div class="user">
            <img src="${e.userImg}" alt="User">
            <span>${e.userName}</span>
        </div>
        </div>
        
        `}),m.forEach(e=>{r.innerHTML+=`

        <div class="location">
        <img src="${e.image}" alt="Hawassa">
        <h3>${e.locName}</h3>
        <p>42 ${e.proAvailable}</p>
        </div>
        
        `}),document.querySelectorAll(".show-login-popup").forEach(e=>{e.addEventListener("click",function(){u()})})});document.getElementById("feedbackForm").addEventListener("submit",async()=>{try{const s=await fetch(`${c}/addFeedback`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:document.getElementById("name").value,email:document.getElementById("email").value,subject:document.getElementById("subject").value,message:document.getElementById("message").value})});if(s.ok)alert("your message has been delvered successfully");else{const t=await s.json();alert(t.message)}}catch(s){alert(s)}});document.getElementById("accessContentBtn");const a=document.getElementById("loginPopup"),p=document.getElementById("closePopup"),g=document.getElementById("loginBtn"),v=document.getElementById("signupBtn"),u=()=>{a.classList.add("active")};p.addEventListener("click",()=>{a.classList.remove("active")});g.addEventListener("click",()=>{a.classList.remove("active"),window.location.href="./login.html"});v.addEventListener("click",()=>{a.classList.remove("active"),window.location.href="./signup.html"});a.addEventListener("click",s=>{s.target===a&&a.classList.remove("active")});
