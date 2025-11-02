import"./modulepreload-polyfill-B5Qt9EMX.js";import"./main-CbwL9yMN.js";/* empty css                        */const i=document.getElementById("content-area"),l="http://localhost:5200/api";let p="";function s(t="Loading..."){return Swal.fire({title:t,allowOutsideClick:!1,didOpen:()=>Swal.showLoading()})}function h(t,r="Processing"){return t.innerHTML=`<span class="button-loader"></span>${r}`,t.disabled=!0,t}function y(t,r){return t.innerHTML=r,t.disabled=!1,t}async function u(){const t=s("Loading properties...");try{const r=await fetch(`${l}/getProperty/owner?owner_id=${JSON.parse(localStorage.getItem("activeUser")).id}`);if(r.ok)p=await r.json(),i.innerHTML=`
        <h1>Manage Properties</h1>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${p.map(o=>`
              <tr>
                <td><img class="main_img2" src="${o.image_path?o.image_path:"/images/property_7_1747834862129_0.png"}" alt="property image"/></td>
                <td>${o.title}</td>
                <td>${o.price}</td>
                <td>${o.status}</td>
                <td>
                  <button class="edit-btn" onclick='editProperty(${JSON.stringify(o).replace(/"/g,"&quot;")})'>Edit</button>
                  <button class="delete-btn" onclick='deleteProperty(${JSON.stringify(o).replace(/"/g,"&quot;")}, this)'>Delete</button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;else{const o=await r.json();throw new Error(o.message||"Failed to load properties")}}catch(r){Swal.fire({icon:"error",title:"Error",text:r.message})}finally{t.close()}}document.addEventListener("DOMContentLoaded",function(){const t=document.querySelectorAll(".sidebar .side_bar ul li a");c(),t.forEach(r=>{r.addEventListener("click",o=>{switch(o.preventDefault(),r.getAttribute("data-page")){case"dashboard":c();break;case"add-property":b();break;case"manage-properties":u();break;case"inquiries":g();break;case"profile-settings":f();break;case"subscription":loadSubscription();break;case"logout":window.location.href="./index.html";break}})})});async function c(){document.getElementById("owner_name").textContent=JSON.parse(localStorage.getItem("activeUser")).firstname,document.getElementById("profile_pic").src=`/images/${JSON.parse(localStorage.getItem("activeUser")).profile_picture}`;const t=s("Loading dashboard...");try{const r=await fetch(`${l}/owner_dashboard?id=${JSON.parse(localStorage.getItem("activeUser")).id}`);if(!r.ok)throw new Error("Failed to load dashboard data");const o=await r.json();i.innerHTML=`
      <h1>Dashboard Overview</h1>
      <div class="stats">
        <div class="stat-card"><h3>${o.total}</h3><p>Total Properties</p></div>
        <div class="stat-card"><h3>${o.sold}</h3><p>Sold</p></div>
        <div class="stat-card"><h3>${o.pending}</h3><p>Pending</p></div>
        <div class="stat-card"><h3>${o.inquiries}</h3><p>Inquiries</p></div>
      </div>
      <div class="recent-inquiries">
        <h2>Recent Inquiries</h2>
        <table>
          <thead>
            <tr>
              <th>Buyer</th>
              <th>Property</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody id="inquiry-table-body"></tbody>
        </table>
      </div>
    `}catch(r){Swal.fire({icon:"error",title:"Error",text:r.message})}finally{t.close()}}function b(){i.innerHTML=`
    <h1>Add New Property</h1>
    <div class="form-card">
      <form id="add-property-form" class="property-form grid-form">
        <h3>Basic Information</h3>
        <div class="form-grid">
          <input type="text" id="property-title" placeholder="Property Title" required class="form-input">
          <select id="property-type" required class="form-input">
            <option value="">Select Property Type</option>
            <option>Apartment</option>
            <option>Villa</option>
            <option>House</option>
            <option>condo</option>
            <option>Land</option>
            <option>Commercial</option>
          </select>
          <select id="property-status" required class="form-input">
            <option value="">For :</option>
            <option value="sell">For Sale</option>
            <option value="rent">For Rent</option>
          </select>
        </div>
        <textarea id="property-description" placeholder="Property Description" required class="form-input full-width"></textarea>

        <h3>Location</h3>
        <div class="form-grid">
          <input type="text" id="property-address" placeholder="Address" required class="form-input">
          <input type="text" id="property-kebele" placeholder="Kebele" required class="form-input">
          <input type="text" id="property-spLocation" placeholder="specific location" required class="form-input">
        </div>

        <h3>Pricing</h3>
        <div class="form-grid">
          <input type="number" id="property-price" placeholder="Price (ETB)" required class="form-input">
          <select id="property-negotiable" required class="form-input">
            <option value="">Negotiable?</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        <h3>Details</h3>
        <div class="form-grid">
          <input type="number" id="property-bedrooms" placeholder="Bedrooms" required class="form-input">
          <input type="number" id="property-bathrooms" placeholder="Bathrooms" required class="form-input">
          <input type="number" id="property-area" placeholder="Area (sqm)" required class="form-input">
          <input type="number" id="property-year" placeholder="Year Built" required class="form-input">
        </div>

        <h3>Media</h3>
        <input type="file" id="property-images" multiple class="form-input full-width" accept="image/*">

        <div class="form-action">
          <button type="submit" class="submit-btn">Submit Property</button>
        </div>
      </form>
    </div>
  `;const t=document.getElementById("add-property-form");t.addEventListener("submit",async r=>{r.preventDefault();const o=t.querySelector('button[type="submit"]'),n=o.innerHTML;h(o,"Submitting...");const e=new FormData,d=document.getElementById("property-images");e.append("title",document.getElementById("property-title").value),e.append("owner_id",JSON.parse(localStorage.getItem("activeUser")).id),e.append("type",document.getElementById("property-type").value),e.append("for",document.getElementById("property-status").value),e.append("description",document.getElementById("property-description").value),e.append("address",document.getElementById("property-address").value),e.append("kebele",document.getElementById("property-kebele").value),e.append("sp_location",document.getElementById("property-spLocation").value),e.append("price",document.getElementById("property-price").value),e.append("negotiable",document.getElementById("property-negotiable").value),e.append("bedrooms",document.getElementById("property-bedrooms").value),e.append("bathrooms",document.getElementById("property-bathrooms").value),e.append("area",document.getElementById("property-area").value),e.append("year",document.getElementById("property-year").value);for(let a=0;a<d.files.length;a++)e.append("property-images",d.files[a]);try{const a=await fetch(`${l}/newproperty`,{method:"POST",body:e});if(a.ok)await Swal.fire({icon:"success",title:"Success!",text:"New property uploaded successfully",toast:!0,position:"top-end",showConfirmButton:!1,timer:3e3}),u();else{const m=await a.json();throw new Error(m.error||"Error uploading property")}}catch(a){Swal.fire({icon:"error",title:"Error",text:a.message})}finally{y(o,n)}})}async function g(){const t=s("Loading inquiries...");try{const r=await fetch(`${l}/getinquiries/${JSON.parse(localStorage.getItem("activeUser")).id}`);if(!r.ok)throw new Error("Failed to load inquiries");const o=await r.json();i.innerHTML=`
      <h1>Inquiries</h1>
      <table>
        <thead>
          <tr>
            <th>Property Image</th>
            <th>Property Title</th>
            <th>Message</th>
            <th>Tenant Name</th>
            <th>phone</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody id="all-inquiries-body"></tbody>
      </table>
    `;const n=document.getElementById("all-inquiries-body");o.forEach(e=>{n.innerHTML+=`
        <tr>
          <td><img class="main_img2" src="${e.image_path?e.image_path:"/images/property_7_1747834862129_0.png"}" alt="property image"/></td>
          <td>${e.title}</td>
          <td>${e.message}</td>
          <td>${e.name}</td>
          <td>${e.phone}</td>
          <td>${e.email}</td>
          <td>
            <button class="edit-btn" onClick="reply(${e.id})">Reply</button>
            <button class="delete-btn" onClick="deleteInqu(${e.id}, this)">Reject</button>
            <div id="replyForm_${e.id}" class="oreply-form">
              <textarea class="reply-textarea" placeholder="Type your reply here..." id="reply_textArea_${e.id}"></textarea>
              <div class="reply-buttons">
                <button class="cancel-reply" id="cancel_reply" onClick="cancelReply(${e.id})">Cancel</button>
                <button class="send-reply" id="send_reply" onClick="sendReply(${e.tenant_id}, ${e.id}, this)">Send</button>
              </div>
            </div>
          </td>
        </tr>
      `})}catch(r){Swal.fire({icon:"error",title:"Error",text:r.message})}finally{t.close()}}async function f(){const t=JSON.parse(localStorage.getItem("activeUser"));i.innerHTML=`
    <h1>Profile Settings</h1>
    <form class="property-form">
      <label>first name</label>
      <input id="fname" type="text" placeholder="firstname" required class="form-input" value="${t.firstname}"><br>
      <label>last name</label>
      <input id="lname" type="text" placeholder="lastname" required class="form-input" value="${t.lastname}"><br>
      <label>email</label>
      <input id="uemail" type="email" placeholder="Email Address" required class="form-input" value="${t.email}"><br>
      <label>phone</label>
      <input id="uphone" type="text" placeholder="Phone Number" required class="form-input" value="${t.phone}"><br>
      <label>about you</label>
      <textarea id="aboutu" placeholder="bio" class="form-input">${t.bio}</textarea><br>
      <button type="button" onclick="editProfile(this)" class="submit-btn">Save Changes</button>
    </form>
  `}
