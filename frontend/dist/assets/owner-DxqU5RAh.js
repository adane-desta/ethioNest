import"./modulepreload-polyfill-B5Qt9EMX.js";import"./main-n1Spxp1A.js";/* empty css                        */const d=document.getElementById("content-area"),s="http://localhost:5200/api";let f="";function m(t="Loading..."){return Swal.fire({title:t,allowOutsideClick:!1,didOpen:()=>Swal.showLoading()})}function c(t,e="Processing"){return t.innerHTML=`<span class="button-loader"></span>${e}`,t.disabled=!0,t}function l(t,e){return t.innerHTML=e,t.disabled=!1,t}async function p(){const t=m("Loading properties...");try{const e=await fetch(`${s}/getProperty/owner?owner_id=${JSON.parse(localStorage.getItem("activeUser")).id}`);if(e.ok)f=await e.json(),d.innerHTML=`
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
            ${f.map(r=>`
              <tr>
                <td><img class="main_img2" src="${r.image_path?r.image_path:"/images/property_7_1747834862129_0.png"}" alt="property image"/></td>
                <td>${r.title}</td>
                <td>${r.price}</td>
                <td>${r.status}</td>
                <td>
                  <button class="edit-btn property" property-data='${JSON.stringify(r).replace(/"/g,"&quot;")}'>Edit</button>
                  <button class="delete-btn property" property-data='${JSON.stringify(r).replace(/"/g,"&quot;")}'>Delete</button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;else{const r=await e.json();throw new Error(r.message||"Failed to load properties")}}catch(e){Swal.fire({icon:"error",title:"Error",text:e.message})}finally{t.close()}document.querySelectorAll(".edit-btn.property").forEach(e=>{e.addEventListener("click",function(){const r=JSON.parse(this.getAttribute("property-data").replace(/&quot;/g,'"'));B(r)})}),document.querySelectorAll(".delete-btn.property").forEach(e=>{e.addEventListener("click",function(){const r=JSON.parse(this.getAttribute("property-data").replace(/&quot;/g,'"'));S(r,this)})})}document.addEventListener("DOMContentLoaded",function(){const t=document.querySelectorAll(".sidebar .side_bar ul li a");h(),t.forEach(e=>{e.addEventListener("click",r=>{switch(r.preventDefault(),e.getAttribute("data-page")){case"dashboard":h();break;case"add-property":v();break;case"manage-properties":p();break;case"inquiries":g();break;case"profile-settings":w();break;case"subscription":loadSubscription();break;case"logout":window.location.href="./index.html";break}})})});async function h(){document.getElementById("owner_name").textContent=JSON.parse(localStorage.getItem("activeUser")).firstname,document.getElementById("profile_pic").src=`/images/${JSON.parse(localStorage.getItem("activeUser")).profile_picture}`;const t=m("Loading dashboard...");try{const e=await fetch(`${s}/owner_dashboard?id=${JSON.parse(localStorage.getItem("activeUser")).id}`);if(!e.ok)throw new Error("Failed to load dashboard data");const r=await e.json();d.innerHTML=`
      <h1>Dashboard Overview</h1>
      <div class="stats">
        <div class="stat-card"><h3>${r.total}</h3><p>Total Properties</p></div>
        <div class="stat-card"><h3>${r.sold}</h3><p>Sold</p></div>
        <div class="stat-card"><h3>${r.pending}</h3><p>Pending</p></div>
        <div class="stat-card"><h3>${r.inquiries}</h3><p>Inquiries</p></div>
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
    `}catch(e){Swal.fire({icon:"error",title:"Error",text:e.message})}finally{t.close()}}function v(){d.innerHTML=`
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
  `;const t=document.getElementById("add-property-form");t.addEventListener("submit",async e=>{e.preventDefault();const r=t.querySelector('button[type="submit"]'),i=r.innerHTML;c(r,"Submitting...");const o=new FormData,a=document.getElementById("property-images");o.append("title",document.getElementById("property-title").value),o.append("owner_id",JSON.parse(localStorage.getItem("activeUser")).id),o.append("type",document.getElementById("property-type").value),o.append("for",document.getElementById("property-status").value),o.append("description",document.getElementById("property-description").value),o.append("address",document.getElementById("property-address").value),o.append("kebele",document.getElementById("property-kebele").value),o.append("sp_location",document.getElementById("property-spLocation").value),o.append("price",document.getElementById("property-price").value),o.append("negotiable",document.getElementById("property-negotiable").value),o.append("bedrooms",document.getElementById("property-bedrooms").value),o.append("bathrooms",document.getElementById("property-bathrooms").value),o.append("area",document.getElementById("property-area").value),o.append("year",document.getElementById("property-year").value);for(let n=0;n<a.files.length;n++)o.append("property-images",a.files[n]);try{const n=await fetch(`${s}/newproperty`,{method:"POST",body:o});if(n.ok)await Swal.fire({icon:"success",title:"Success!",text:"New property uploaded successfully",toast:!0,position:"center",showConfirmButton:!1,timer:3e3}),p();else{const u=await n.json();throw new Error(u.error||"Error uploading property")}}catch(n){Swal.fire({icon:"error",title:"Error",text:n.message})}finally{l(r,i)}})}async function g(){const t=m("Loading inquiries...");try{const e=await fetch(`${s}/getinquiries/${JSON.parse(localStorage.getItem("activeUser")).id}`);if(!e.ok)throw new Error("Failed to load inquiries");const r=await e.json();d.innerHTML=`
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
    `;const i=document.getElementById("all-inquiries-body");r.forEach(o=>{i.innerHTML+=`
        <tr>
          <td><img class="main_img2" src="${o.image_path?o.image_path:"/images/property_7_1747834862129_0.png"}" alt="property image"/></td>
          <td>${o.title}</td>
          <td>${o.message}</td>
          <td>${o.name}</td>
          <td>${o.phone}</td>
          <td>${o.email}</td>
          <td>
            <button class="edit-btn inquiry reply" data-inquiry="${o.id}">Reply</button>
            <button class="delete-btn inquiry reject" data-inquiry="${o.id}">Reject</button>
            <div id="replyForm_${o.id}" class="oreply-form">
              <textarea class="reply-textarea" placeholder="Type your reply here..." id="reply_textArea_${o.id}"></textarea>
              <div class="reply-buttons">
                <button class="cancel-reply inquiry" data-inquiry="${o.id}">Cancel</button>
                <button class="send-reply inquiry" data-inquiry='{"tenantId":${o.tenant_id},"inquiryId":${o.id}}'>Send</button>
              </div>
            </div>
          </td>
        </tr>
      `})}catch(e){Swal.fire({icon:"error",title:"Error",text:e.message})}finally{t.close()}document.querySelectorAll(".edit-btn.inquiry.reply").forEach(e=>{e.addEventListener("click",function(){const r=this.getAttribute("data-inquiry");I(r)})}),document.querySelectorAll(".delete-btn.inquiry.reject").forEach(e=>{e.addEventListener("click",function(){const r=this.getAttribute("data-inquiry");L(r,this)})}),document.querySelectorAll(".send-reply.inquiry").forEach(e=>{e.addEventListener("click",function(){const r=JSON.parse(this.getAttribute("data-inquiry").replace(/'/g,'"'));q(r.tenantId,r.inquiryId,this)})}),document.querySelectorAll(".cancel-reply.inquiry").forEach(e=>{e.addEventListener("click",function(){const r=this.getAttribute("data-inquiry");$(r)})})}async function w(){const t=JSON.parse(localStorage.getItem("activeUser"));d.innerHTML=`
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
      <button type="button" class="submit-btn editProfile">Save Changes</button>
    </form>
  `,document.querySelectorAll(".submit-btn.editProfile").forEach(e=>{e.addEventListener("click",function(){E(this)})})}async function E(t){const e=JSON.parse(localStorage.getItem("activeUser")),r=t.innerHTML;if(c(t,"Saving..."),document.getElementById("fname").value===e.firstname&&document.getElementById("lname").value===e.lastname&&document.getElementById("uemail").value===e.email&&document.getElementById("uphone").value===e.phone&&document.getElementById("aboutu").value===e.bio){await Swal.fire({icon:"info",title:"No changes made",toast:!0,position:"center",showConfirmButton:!1,timer:2e3}),l(t,r);return}try{if((await Swal.fire({title:"Save changes?",text:"Are you sure you want to update your profile?",icon:"question",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, save changes!"})).isConfirmed){const o=await fetch(`${s}/editprofile`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:e.id,firstname:document.getElementById("fname").value,lastname:document.getElementById("lname").value,email:document.getElementById("uemail").value,phone:document.getElementById("uphone").value,bio:document.getElementById("aboutu").value})});if(o.ok){const a=await o.json();localStorage.setItem("activeUser",JSON.stringify(a)),await Swal.fire({icon:"success",title:"Saved!",text:"Your profile has been updated",toast:!0,position:"center",showConfirmButton:!1,timer:2e3})}else{const a=await o.json();throw new Error(a.message||"Failed to update profile")}}}catch(i){Swal.fire({icon:"error",title:"Error",text:i.message})}finally{l(t,r)}}async function S(t,e){if((await Swal.fire({title:"Delete Property?",text:"Are you sure you want to delete this property? This action cannot be undone.",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"})).isConfirmed){const i=e.innerHTML;c(e,"Deleting...");try{if((await fetch(`${s}/deleteProperty?property_Id=${t.id}`,{method:"DELETE"})).ok)await Swal.fire({icon:"success",title:"Deleted!",text:"Property has been deleted",toast:!0,position:"center",showConfirmButton:!1,timer:2e3}),p();else throw new Error("Failed to delete property")}catch(o){Swal.fire({icon:"error",title:"Error",text:o.message})}finally{l(e,i)}}}function B(t){d.innerHTML=`
    <h1>Edit Property</h1>
    <div class="form-card">
      <form id="edit-property-form" class="property-form">
        <label>Title</label>
        <input type="text" id="edit-title" value="${t.title}" class="form-input" required><br>
        <label>Description</label>
        <textarea id="edit-propertyDescription" class="form-input">${t.description}</textarea>
        <label>Price</label>
        <input type="text" id="edit-price" value="${t.price}" class="form-input" required><br>
        <label>Status</label>
        <select id="edit-status" class="form-input" required>
          <option value="available" ${t.status.toLowerCase()==="available"?"selected":""}>Available</option>
          <option value="pending" ${t.status.toLowerCase()==="pending"?"selected":""}>Pending</option>
          <option value="sold" ${t.status.toLowerCase()==="sold"?"selected":""}>Sold</option>
          <option value="rejected" ${t.status.toLowerCase()==="rejected"?"selected":""}>Rejected</option>
          <option value="rented" ${t.status.toLowerCase()==="rented"?"selected":""}>Rented</option>
        </select><br>
        <button type="submit" class="submit-btn">Save Changes</button>
      </form>
    </div>
  `;const e=document.getElementById("edit-property-form");e.addEventListener("submit",async r=>{r.preventDefault();const i=e.querySelector('button[type="submit"]'),o=i.innerHTML;c(i,"Saving...");const a=document.getElementById("edit-status").value.toLowerCase(),n=t.status.toLowerCase();if(document.getElementById("edit-title").value===t.title&&document.getElementById("edit-price").value===t.price&&document.getElementById("edit-propertyDescription").value===t.description&&a===n){await Swal.fire({icon:"info",title:"No changes made",toast:!0,position:"center",showConfirmButton:!1,timer:2e3}),l(i,o),p();return}try{if((await Swal.fire({title:"Save changes?",text:"Are you sure you want to update this property?",icon:"question",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, save changes!"})).isConfirmed){const y=await fetch(`${s}/editProperty`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:t.id,title:document.getElementById("edit-title").value,description:document.getElementById("edit-propertyDescription").value,price:document.getElementById("edit-price").value,status:document.getElementById("edit-status").value})});if(y.ok)await Swal.fire({icon:"success",title:"Saved!",text:"Property has been updated",toast:!0,position:"center",showConfirmButton:!1,timer:2e3}),p();else{const b=await y.json();throw new Error(b.message||"Failed to update property")}}}catch(u){Swal.fire({icon:"error",title:"Error",text:u.message})}finally{l(i,o)}})}function I(t){document.getElementById(`replyForm_${t}`).style.display="block"}async function q(t,e,r){const i=document.getElementById(`reply_textArea_${e}`).value;if(!i){await Swal.fire({icon:"warning",title:"Empty Reply",text:"Please type your reply before sending",toast:!0,position:"center",showConfirmButton:!1,timer:2e3});return}const o=r.innerHTML;c(r,"Sending...");try{const a=await fetch(`${s}/reply`,{method:"POST",body:JSON.stringify({sender_id:JSON.parse(localStorage.getItem("activeUser")).id,receiver_id:t,content:i}),headers:{"Content-Type":"application/json"}});if(a.ok)await Swal.fire({icon:"success",title:"Sent!",text:"Message sent successfully",toast:!0,position:"center",showConfirmButton:!1,timer:2e3}),document.getElementById(`reply_textArea_${e}`).value="",document.getElementById(`replyForm_${e}`).style.display="none";else{const n=await a.json();throw new Error(n.message||"Failed to send reply")}}catch(a){Swal.fire({icon:"error",title:"Error",text:a.message})}finally{l(r,o)}}function $(t){document.getElementById(`reply_textArea_${t}`).value="",document.getElementById(`replyForm_${t}`).style.display="none"}async function L(t,e){if((await Swal.fire({title:"Reject Inquiry?",text:"Are you sure you want to reject this inquiry?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, reject it!"})).isConfirmed){const i=e.innerHTML;c(e,"Rejecting...");try{if((await fetch(`${s}/deleteinqu/${t}`,{method:"DELETE"})).ok)await Swal.fire({icon:"success",title:"Rejected!",text:"Inquiry has been rejected",toast:!0,position:"center",showConfirmButton:!1,timer:2e3}),g();else throw new Error("Failed to reject inquiry")}catch(o){Swal.fire({icon:"error",title:"Error",text:o.message})}finally{l(e,i)}}}
