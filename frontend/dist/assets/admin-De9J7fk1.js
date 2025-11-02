import"./modulepreload-polyfill-B5Qt9EMX.js";const v=document.getElementById("requests-nav"),h=document.getElementById("feedbacks-nav");document.getElementById("company-nav");const p=document.getElementById("properties-nav"),u=document.getElementById("users-nav"),b=document.getElementById("analytics-nav"),i=document.getElementById("contentArea");document.getElementById("modal");let c="";const d="http://localhost:5200/api";b.addEventListener("click",async()=>{n()});const n=async()=>{const a=await(await fetch(`${d}/platform_analytics`)).json();i.innerHTML=`
        <div class="scroll-container">
            <h1 class="dashboard-title">AdareRent Analytics</h1>
    
            <div class="property-info">
    
                <!-- USERS INFO -->
                <div class="analytics_card">
                    <div class="card-header">Registered Users</div>
                    <div class="card-content">
                        <div class="card-value">${a.users}</div>
                        <div class="card-subtitle">Buyers & Sellers</div>
                    </div>
                </div>
    
                <div class="analytics_card">
                    <div class="card-header">Available Properties</div>
                    <div class="card-content">
                        <div class="card-value">${a.avap}</div>
                        <div class="card-subtitle">Partnered Real Estate Companies</div>
                    </div>
                </div>
    
                <!-- PROPERTIES INFO -->
                <div class="analytics_card">
                    <div class="card-header">Listed Properties</div>
                    <div class="card-content">
                        <div class="card-value">${a.totalp}</div>
                        <div class="card-subtitle">Total Properties Listed</div>
                    </div>
                </div>
    
                <div class="analytics_card">
                    <div class="card-header">Properties Sold</div>
                    <div class="card-content">
                        <div class="card-value">${a.soldp}</div>
                        <div class="card-subtitle">Successful Transactions</div>
                    </div>
                </div>
    
                <!-- MARKET DATA -->
                <div class="analytics_card">
                    <div class="card-header">Top Listing Price</div>
                    <div class="card-content">
                        <div class="card-value-small">${parseFloat(a.maxprice).toLocaleString("en-US")} ETB</div>
                        <img src="${a.top_images}" alt="Top Listing">
                    </div>
                </div>
    
                <div class="analytics_card">
                    <div class="card-header">Lowest Listing Price</div>
                    <div class="card-content">
                        <div class="card-value-small">${parseFloat(a.minprice).toLocaleString("en-US")} ETB</div>
                        <img src="${a.list_images}" alt="Lowest Listing">
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
                        <div class="card-value">${a.inquires}</div>
                        <div class="card-subtitle">Buyer Messages Sent</div>
                    </div>
                </div>
    
            </div>
        </div>
    `};u.addEventListener("click",()=>{c="users",m()});const m=async()=>{try{const e=await fetch(`${d}/getusers`);if(!e.ok)throw new Error("Failed to fetch users");const a=await e.json();i.innerHTML=`
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
                        ${a.map(t=>`
                            <tr>
                                <td>${t.firstname} ${t.lastname}</td>
                                <td>${t.email}</td>
                                <td>${t.phone}</td>
                                <td>${t.role}</td>
                                <td> 
                                    <button class="action-btn reject" onclick="deleteUser(${t.id})">Delete</button>
                                </td>
                            </tr>`).join("")}
                    </tbody>
                </table>
            </div>
        `}catch(e){console.error("Error fetching users:",e),i.innerHTML=`<div class="error">Error loading users: ${e.message}</div>`}};p.addEventListener("click",()=>{c="properties",o("all","All")});const o=async(e,a)=>{try{const t=await fetch(`${d}/getproperties/${e}`);if(!t.ok)throw new Error("Failed to fetch properties");const l=await t.json();i.innerHTML=`
            <div class="section-title">Manage Properties</div>
            <div class="card">
                <table>
                    <thead>      
                        <div class="user-selector">
                            <select id="user-selector">
                                <option value="" disabled selected>${a}</option>
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
                        ${l.map(s=>`
                            <tr>
                                <td>${s.title}</td>
                                <td>${s.type}</td>
                                <td>${s.price}</td>
                                <td>${s.address}</td>
                                <td>${s.status}</td>
                                <td>
                                    <button class="action-btn accept" onClick="showDetail(${s.id})">See More</button>
                                    <button class="action-btn reject" onclick="deleteProperties(${s.id})">Delete</button>
                                </td>
                            </tr>`).join("")}
                    </tbody>
                </table>
            </div>
        `,document.getElementById("user-selector").addEventListener("change",s=>{const r=s.target.value;o(r,r)})}catch(t){console.error("Error fetching properties:",t),i.innerHTML=`<div class="error">Error loading properties: ${t.message}</div>`}};h.addEventListener("click",async()=>{try{const e=await fetch(`${d}/getfeedbacks`);if(!e.ok)throw new Error("Failed to fetch feedbacks");const a=await e.json();i.innerHTML=`
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
                        ${a.map(t=>`
                            <tr>
                                <td>${t.name}</td>
                                <td>${t.email}</td>
                                <td>${t.subject}</td>
                                <td>${t.message}</td>
                                <td>${new Date(t.date).toLocaleDateString()}</td>
                                <td>
                                    <button class="action-btn accept" onclick="markFeedbackAsResolved('${t.id}')">Done</button>
                                </td>
                            </tr>`).join("")}
                    </tbody>
                </table>
            </div>
        `,c="feedbacks"}catch(e){console.error("Error fetching feedbacks:",e),i.innerHTML=`<div class="error">Error loading feedbacks: ${e.message}</div>`}});v.addEventListener("click",async()=>{try{const e=await fetch(`${d}/getproperties/pending`);if(!e.ok)throw new Error("Failed to fetch property requests");const a=await e.json();i.innerHTML=`
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
                        ${a.map(t=>`
                            <tr>
                                <td>${t.title}</td>
                                <td>${t.type}</td>
                                <td>${t.price}</td>
                                <td>${t.address}</td>
                                <td>${t.payment}</td>
                                <td>
                                    <button class="action-btn accept" onclick="approveProperty('${t.id}', '${t.title}', '${t.owner_id}')">Approve</button>
                                    <button class="action-btn reject" onclick="rejectProperty('${t.id}')">Reject</button>
                                    <button class="action-btn reject" style="background-color: transparent; color:blue;" onClick="showDetail('${t.id}')">Details</button>
                                </td>
                            </tr>`).join("")}
                    </tbody>
                </table>
            </div>
        `,c="requests"}catch(e){console.error("Error fetching property requests:",e),i.innerHTML=`<div class="error">Error loading property requests: ${e.message}</div>`}});document.addEventListener("DOMContentLoaded",()=>{n()});
