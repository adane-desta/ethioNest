
// Get elements
const requestsnav = document.getElementById('requests-nav');
const feedbacksnav = document.getElementById('feedbacks-nav');
const companynav = document.getElementById('company-nav');
const propertiesnav = document.getElementById('properties-nav');
const usersnav = document.getElementById('users-nav');
const analyticsnav = document.getElementById('analytics-nav');
const contentArea = document.getElementById('contentArea');
const modal = document.getElementById('modal');
let activeSection = '';

// Base API URL
const API_BASE_URL = 'http://localhost:5200/api';

// Show Analytics page at start
analyticsnav.addEventListener('click', async() => {
    showAnalytics()
});

const showAnalytics = async() => {
    const response = await fetch(`${API_BASE_URL}/platform_analytics`)
    const analytics = await response.json()
    contentArea.innerHTML = `
        <div class="scroll-container">
            <h1 class="dashboard-title">AdareRent Analytics</h1>
    
            <div class="property-info">
    
                <!-- USERS INFO -->
                <div class="analytics_card">
                    <div class="card-header">Registered Users</div>
                    <div class="card-content">
                        <div class="card-value">${analytics.users}</div>
                        <div class="card-subtitle">Buyers & Sellers</div>
                    </div>
                </div>
    
                <div class="analytics_card">
                    <div class="card-header">Available Properties</div>
                    <div class="card-content">
                        <div class="card-value">${analytics.avap}</div>
                        <div class="card-subtitle">Partnered Real Estate Companies</div>
                    </div>
                </div>
    
                <!-- PROPERTIES INFO -->
                <div class="analytics_card">
                    <div class="card-header">Listed Properties</div>
                    <div class="card-content">
                        <div class="card-value">${analytics.totalp}</div>
                        <div class="card-subtitle">Total Properties Listed</div>
                    </div>
                </div>
    
                <div class="analytics_card">
                    <div class="card-header">Properties Sold</div>
                    <div class="card-content">
                        <div class="card-value">${analytics.soldp}</div>
                        <div class="card-subtitle">Successful Transactions</div>
                    </div>
                </div>
    
                <!-- MARKET DATA -->
                <div class="analytics_card">
                    <div class="card-header">Top Listing Price</div>
                    <div class="card-content">
                        <div class="card-value-small">${parseFloat(analytics.maxprice).toLocaleString('en-US')} ETB</div>
                        <img src="${analytics.top_images}" alt="Top Listing">
                    </div>
                </div>
    
                <div class="analytics_card">
                    <div class="card-header">Lowest Listing Price</div>
                    <div class="card-content">
                        <div class="card-value-small">${parseFloat(analytics.minprice).toLocaleString('en-US')} ETB</div>
                        <img src="${analytics.list_images}" alt="Lowest Listing">
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
                        <div class="card-value">${analytics.inquires}</div>
                        <div class="card-subtitle">Buyer Messages Sent</div>
                    </div>
                </div>
    
            </div>
        </div>
    `;
};

// Show users section
usersnav.addEventListener('click', () => {
    activeSection = 'users';
    getusers();
});

const getusers = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/getusers`);
        if (!response.ok) throw new Error('Failed to fetch users');
        
        const users = await response.json();
        
        contentArea.innerHTML = `
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
                        ${users.map(user => `
                            <tr>
                                <td>${user.firstname} ${user.lastname}</td>
                                <td>${user.email}</td>
                                <td>${user.phone}</td>
                                <td>${user.role}</td>
                                <td> 
                                    <button class="action-btn reject" onclick="deleteUser(${user.id})">Delete</button>
                                </td>
                            </tr>`
                        ).join('')}
                    </tbody>
                </table>
            </div>
        `;
    } catch (error) {
        console.error('Error fetching users:', error);
        contentArea.innerHTML = `<div class="error">Error loading users: ${error.message}</div>`;
    }
};

async function deleteUser(userId) {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });
    
    if (result.isConfirmed) {
      try {
        const response = await fetch(`${API_BASE_URL}/deleteUser?userId=${userId}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'User has been deleted.',
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 3000
          });
          getusers();
        } else {
          throw new Error('Failed to delete user');
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to delete user',
        });
      }
    }
  }

// Show properties section
propertiesnav.addEventListener('click', () => {
    activeSection = 'properties';
    getproperties('all', 'All');
});

const getproperties = async (status, selectedStatus) => {
    try {
        const response = await fetch(`${API_BASE_URL}/getproperties/${status}`);
        if (!response.ok) throw new Error('Failed to fetch properties');
        
        const properties = await response.json();

        contentArea.innerHTML = `
            <div class="section-title">Manage Properties</div>
            <div class="card">
                <table>
                    <thead>      
                        <div class="user-selector">
                            <select id="user-selector">
                                <option value="" disabled selected>${selectedStatus}</option>
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
                        ${properties.map(property => `
                            <tr>
                                <td>${property.title}</td>
                                <td>${property.type}</td>
                                <td>${property.price}</td>
                                <td>${property.address}</td>
                                <td>${property.status}</td>
                                <td>
                                    <button class="action-btn accept" onClick="showDetail(${property.id})">See More</button>
                                    <button class="action-btn reject" onclick="deleteProperties(${property.id})">Delete</button>
                                </td>
                            </tr>`
                        ).join('')}
                    </tbody>
                </table>
            </div>
        `;

        document.getElementById('user-selector').addEventListener('change', (event) => {
            const newStatus = event.target.value;
            getproperties(newStatus, newStatus);
        });
    } catch (error) {
        console.error('Error fetching properties:', error);
        contentArea.innerHTML = `<div class="error">Error loading properties: ${error.message}</div>`;
    }
};

async function deleteProperties(property_id) {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "This property will be permanently deleted!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });
    
    if (result.isConfirmed) {
      try {
        const response = await fetch(`${API_BASE_URL}/deleteProperty?property_Id=${property_id}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Property has been deleted.',
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 3000
          });
          getproperties('all', 'All');
        } else {
          throw new Error('Failed to delete property');
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to delete property',
        });
      }
    }
  }

// Show feedback section
feedbacksnav.addEventListener('click', async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/getfeedbacks`);
        if (!response.ok) throw new Error('Failed to fetch feedbacks');
        
        const feedbacks = await response.json();
        
        contentArea.innerHTML = `
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
                        ${feedbacks.map(feedback => `
                            <tr>
                                <td>${feedback.name}</td>
                                <td>${feedback.email}</td>
                                <td>${feedback.subject}</td>
                                <td>${feedback.message}</td>
                                <td>${new Date(feedback.date).toLocaleDateString()}</td>
                                <td>
                                    <button class="action-btn accept" onclick="markFeedbackAsResolved('${feedback.id}')">Done</button>
                                </td>
                            </tr>`
                        ).join('')}
                    </tbody>
                </table>
            </div>
        `;
        activeSection = 'feedbacks';
    } catch (error) {
        console.error('Error fetching feedbacks:', error);
        contentArea.innerHTML = `<div class="error">Error loading feedbacks: ${error.message}</div>`;
    }
});

// Show request section
requestsnav.addEventListener('click', async() => {
    try {
        const response = await fetch(`${API_BASE_URL}/getproperties/pending`);
        if (!response.ok) throw new Error('Failed to fetch property requests');
        
        const requests = await response.json();
        
        contentArea.innerHTML = `
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
                        ${requests.map(request => `
                            <tr>
                                <td>${request.title}</td>
                                <td>${request.type}</td>
                                <td>${request.price}</td>
                                <td>${request.address}</td>
                                <td>${request.payment}</td>
                                <td>
                                    <button class="action-btn accept" onclick="approveProperty('${request.id}', '${request.title}', '${request.owner_id}')">Approve</button>
                                    <button class="action-btn reject" onclick="rejectProperty('${request.id}')">Reject</button>
                                    <button class="action-btn reject" style="background-color: transparent; color:blue;" onClick="showDetail('${request.id}')">Details</button>
                                </td>
                            </tr>`
                        ).join('')}
                    </tbody>
                </table>
            </div>
        `;
        activeSection = 'requests';
    } catch (error) {
        console.error('Error fetching property requests:', error);
        contentArea.innerHTML = `<div class="error">Error loading property requests: ${error.message}</div>`;
    }
});

// Handle approving a property
async function approveProperty(property_id, property_title, owner_id) {
    const result = await Swal.fire({
      title: 'Approve Property?',
      text: "This will make the property visible to all users",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, approve it!'
    });
    
    if (result.isConfirmed) {
      try {
        const response = await fetch(`${API_BASE_URL}/approveProperty/${property_id}?status=available&title=${property_title}&owner_id=${owner_id}`, {
          method: 'PUT'
        });
        
        if (response.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Approved!',
            text: 'Property is now available',
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 3000
          });
          requestsnav.click();
        } else {
          throw new Error('Failed to approve property');
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to approve property',
        });
      }
    }
  }
  
  async function rejectProperty(property_id) {
    const result = await Swal.fire({
      title: 'Reject Property?',
      text: "This will mark the property as rejected",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, reject it!'
    });
    
    if (result.isConfirmed) {
      try {
        const response = await fetch(`${API_BASE_URL}/approveProperty/${property_id}?status=rejected`, {
          method: 'PUT'
        });
        
        if (response.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Rejected!',
            text: 'Property has been rejected',
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 3000
          });
          requestsnav.click();
        } else {
          throw new Error('Failed to reject property');
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to reject property',
        });
      }
    }
  }


function showDetail(propertyId) {
    localStorage.setItem("activeProperty", propertyId);
    window.location.href = './property-detail.html';
}

// Initialize the dashboard with analytics view on load
document.addEventListener('DOMContentLoaded', () => {
    showAnalytics();
});

async function markFeedbackAsResolved(id) {
    const response = await fetch(`${API_BASE_URL}/deleteFeedback?id=${id}`);
    
    if (response.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Resolved!',
        text: 'Feedback marked as resolved',
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 3000
      });
      feedbacksnav.click();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Unable to resolve feedback',
      });
    }
  }