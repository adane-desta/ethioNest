import"./modulepreload-polyfill-B5Qt9EMX.js";const c=document.getElementById("requests-nav"),p=document.getElementById("feedbacks-nav");document.getElementById("company-nav");const y=document.getElementById("properties-nav"),f=document.getElementById("users-nav"),m=document.getElementById("analytics-nav"),o=document.getElementById("contentArea");document.getElementById("modal");let n="";const s="https://ethinest.onrender.com/api";m.addEventListener("click",async()=>{u()});const u=async()=>{const r=await(await fetch(`${s}/platform_analytics`)).json();o.innerHTML=`
        <div class="scroll-container">
            <h1 class="dashboard-title">AdareRent Analytics</h1>
    
            <div class="property-info">
    
                <!-- USERS INFO -->
                <div class="analytics_card">
                    <div class="card-header">Registered Users</div>
                    <div class="card-content">
                        <div class="card-value">${r.users}</div>
                        <div class="card-subtitle">Buyers & Sellers</div>
                    </div>
                </div>
    
                <div class="analytics_card">
                    <div class="card-header">Available Properties</div>
                    <div class="card-content">
                        <div class="card-value">${r.avap}</div>
                        <div class="card-subtitle">Partnered Real Estate Companies</div>
                    </div>
                </div>
    
                <!-- PROPERTIES INFO -->
                <div class="analytics_card">
                    <div class="card-header">Listed Properties</div>
                    <div class="card-content">
                        <div class="card-value">${r.totalp}</div>
                        <div class="card-subtitle">Total Properties Listed</div>
                    </div>
                </div>
    
                <div class="analytics_card">
                    <div class="card-header">Properties Sold</div>
                    <div class="card-content">
                        <div class="card-value">${r.soldp}</div>
                        <div class="card-subtitle">Successful Transactions</div>
                    </div>
                </div>
    
                <!-- MARKET DATA -->
                <div class="analytics_card">
                    <div class="card-header">Top Listing Price</div>
                    <div class="card-content">
                        <div class="card-value-small">${parseFloat(r.maxprice).toLocaleString("en-US")} ETB</div>
                        <img src="${r.top_images}" alt="Top Listing">
                    </div>
                </div>
    
                <div class="analytics_card">
                    <div class="card-header">Lowest Listing Price</div>
                    <div class="card-content">
                        <div class="card-value-small">${parseFloat(r.minprice).toLocaleString("en-US")} ETB</div>
                        <img src="${r.list_images}" alt="Lowest Listing">
                    </div>
                </div>
    
                <!-- PLATFORM ENGAGEMENT -->
                <div class="analytics_card">
                    <div class="card-header">Platform Views</div>
                    <div class="card-content">
                        <div class="card-value">60K</div>
                        <div class="card-subtitle">Monthly Site Visits</div>
                    </div>
                </div>
    
                <div class="analytics_card">
                    <div class="card-header">Inquiries Received</div>
                    <div class="card-content">
                        <div class="card-value">${r.inquires}</div>
                        <div class="card-subtitle">Buyer Messages Sent</div>
                    </div>
                </div>
    
            </div>
        </div>
    `};f.addEventListener("click",()=>{n="users",v()});const v=async()=>{try{const t=await fetch(`${s}/getusers`);if(!t.ok)throw new Error("Failed to fetch users");const r=await t.json();o.innerHTML=`
            <div class="section-title">Manage Users</div>
            <div class="card">
                <table>
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>email</th>
                            <th>phone</th>
                            <th>role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody> 
                        ${r.map(e=>`
                            <tr>
                                <td>${e.firstname} ${e.lastname}</td>
                                <td>${e.email}</td>
                                <td>${e.phone}</td>
                                <td>${e.role}</td>
                                <td> 
                                    <button class="action-btn reject user" data-propertyId="${e.id}">Delete</button>
                                </td>
                            </tr>`).join("")}
                    </tbody>
                </table>
            </div>
        `}catch(t){console.error("Error fetching users:",t),o.innerHTML=`<div class="error">Error loading users: ${t.message}</div>`}document.querySelectorAll(".action-btn.reject.user").forEach(t=>{t.addEventListener("click",()=>{const r=t.getAttribute("data-propertyId");b(r)})})};async function b(t){if((await Swal.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"})).isConfirmed)try{if((await fetch(`${s}/deleteUser?userId=${t}`,{method:"DELETE"})).ok)Swal.fire({icon:"success",title:"Deleted!",text:"User has been deleted.",toast:!0,position:"center",showConfirmButton:!1,timer:3e3}),v();else throw new Error("Failed to delete user")}catch{Swal.fire({icon:"error",title:"Error",text:"Failed to delete user"})}}y.addEventListener("click",()=>{n="properties",d("all","All")});const d=async(t,r)=>{try{const e=await fetch(`${s}/getproperties/${t}`);if(!e.ok)throw new Error("Failed to fetch properties");const i=await e.json();o.innerHTML=`
            <div class="section-title">Manage Properties</div>
            <div class="card">
                <table>
                    <thead>      
                        <div class="user-selector">
                            <select id="user-selector">
                                <option value="" disabled selected>${r}</option>
                                <option value="all">All</option>
                                <option value="available">Available</option>
                                <option value="pending">Pending</option>
                                <option value="rejected">Rejected</option>
                                <option value="sold">Sold</option>
                                <option value="rented">Rented</option>
                            </select>
                        </div>
                    </thead>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${i.map(a=>`
                            <tr>
                                <td>${a.title}</td>
                                <td>${a.type}</td>
                                <td>${a.price}</td>
                                <td>${a.address}</td>
                                <td>${a.status}</td>
                                <td>
                                    <button class="action-btn accept property" data-propertyId="${a.id}">See More</button>
                                    <button class="action-btn reject property" data-propertyId="${a.id}">Delete</button>
                                </td>
                            </tr>`).join("")}
                    </tbody>
                </table>
            </div>
        `,document.getElementById("user-selector").addEventListener("change",a=>{const l=a.target.value;d(l,l)})}catch(e){console.error("Error fetching properties:",e),o.innerHTML=`<div class="error">Error loading properties: ${e.message}</div>`}document.querySelectorAll(".action-btn.accept.property").forEach(e=>{e.addEventListener("click",function(){const i=this.getAttribute("data-propertyId");h(i)})}),document.querySelectorAll(".action-btn.reject.property").forEach(e=>{e.addEventListener("click",function(){const i=this.getAttribute("data-propertyId");w(i)})})};async function w(t){if((await Swal.fire({title:"Are you sure?",text:"This property will be permanently deleted!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"})).isConfirmed)try{if((await fetch(`${s}/deleteProperty?property_Id=${t}`,{method:"DELETE"})).ok)Swal.fire({icon:"success",title:"Deleted!",text:"Property has been deleted.",toast:!0,position:"center",showConfirmButton:!1,timer:3e3}),d("all","All");else throw new Error("Failed to delete property")}catch{Swal.fire({icon:"error",title:"Error",text:"Failed to delete property"})}}p.addEventListener("click",async()=>{try{const t=await fetch(`${s}/getfeedbacks`);if(!t.ok)throw new Error("Failed to fetch feedbacks");const r=await t.json();o.innerHTML=`
            <div class="section-title">Feedbacks and Complaints</div>
            <div class="card">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Subject</th>
                            <th>Feedback/Complaint</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${r.map(e=>`
                            <tr>
                                <td>${e.name}</td>
                                <td>${e.email}</td>
                                <td>${e.subject}</td>
                                <td>${e.message}</td>
                                <td>${new Date(e.date).toLocaleDateString()}</td>
                                <td>
                                    <button class="action-btn accept feedback" data-propertyId"${e.id}">Done</button>
                                </td>
                            </tr>`).join("")}
                    </tbody>
                </table>
            </div>
        `,n="feedbacks"}catch(t){console.error("Error fetching feedbacks:",t),o.innerHTML=`<div class="error">Error loading feedbacks: ${t.message}</div>`}document.querySelectorAll(".action-btn.accept.feedback").forEach(t=>{t.addEventListener("click",function(){const r=this.getAttribute("data-propertyId");g(r)})})});c.addEventListener("click",async()=>{try{const t=await fetch(`${s}/getproperties/pending`);if(!t.ok)throw new Error("Failed to fetch property requests");const r=await t.json();o.innerHTML=`
            <div class="section-title">Requests to List new Properties</div>
            <div class="card">
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Location</th>
                            <th>Payment</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${r.map(e=>`
                            <tr>
                                <td>${e.title}</td>
                                <td>${e.type}</td>
                                <td>${e.price}</td>
                                <td>${e.address}</td>
                                <td>${e.payment}</td>
                                <td>
                                    <button class="action-btn accept request" requestData="{'requestId':${e.id},'requestTitle':'${e.title}','requestOwnerId':${e.owner_id}}">Approve</button>
                                    <button class="action-btn reject request" data-requestId="${e.id}">Reject</button>
                                    <button class="action-btn reject details" style="background-color: transparent; color:blue;" data-requestId="${e.id}">Details</button>
                                </td>
                            </tr>`).join("")}
                    </tbody>
                </table>
            </div>
        `,n="requests"}catch(t){console.error("Error fetching property requests:",t),o.innerHTML=`<div class="error">Error loading property requests: ${t.message}</div>`}document.querySelectorAll(".action-btn.accept.request").forEach(t=>{t.addEventListener("click",function(){const r=JSON.parse(this.getAttribute("requestData").replace(/'/g,'"'));E(r.requestId,r.requestTitle,r.requestOwnerId)})}),document.querySelectorAll(".action-btn.reject.request").forEach(t=>{t.addEventListener("click",function(){const r=this.getAttribute("data-requestId");$(r)})}),document.querySelectorAll(".action-btn.reject.details").forEach(t=>{t.addEventListener("click",function(){const r=this.getAttribute("data-requestId");h(r)})})});async function E(t,r,e){if((await Swal.fire({title:"Approve Property?",text:"This will make the property visible to all users",icon:"question",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, approve it!"})).isConfirmed)try{if((await fetch(`${s}/approveProperty/${t}?status=available&title=${r}&owner_id=${e}`,{method:"PUT"})).ok)Swal.fire({icon:"success",title:"Approved!",text:"Property is now available",toast:!0,position:"center",showConfirmButton:!1,timer:3e3}),c.click();else throw new Error("Failed to approve property")}catch{Swal.fire({icon:"error",title:"Error",text:"Failed to approve property"})}}async function $(t){if((await Swal.fire({title:"Reject Property?",text:"This will mark the property as rejected",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, reject it!"})).isConfirmed)try{if((await fetch(`${s}/approveProperty/${t}?status=rejected`,{method:"PUT"})).ok)Swal.fire({icon:"success",title:"Rejected!",text:"Property has been rejected",toast:!0,position:"center",showConfirmButton:!1,timer:3e3}),c.click();else throw new Error("Failed to reject property")}catch{Swal.fire({icon:"error",title:"Error",text:"Failed to reject property"})}}function h(t){localStorage.setItem("activeProperty",t),window.location.href="./property-detail.html"}document.addEventListener("DOMContentLoaded",()=>{u()});async function g(t){(await fetch(`${s}/deleteFeedback?id=${t}`)).ok?(Swal.fire({icon:"success",title:"Resolved!",text:"Feedback marked as resolved",toast:!0,position:"center",showConfirmButton:!1,timer:3e3}),p.click()):Swal.fire({icon:"error",title:"Error",text:"Unable to resolve feedback"})}
