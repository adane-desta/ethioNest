
const contentArea = document.getElementById("content-area");
const API_BASE_URL = 'http://localhost:5200/api';
let allProperties = "";

// Utility functions for loading states
function showLoading(title = 'Loading...') {
  return Swal.fire({
    title: title,
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading()
  });
}

function showButtonLoading(button, text = 'Processing') {
  button.innerHTML = `<span class="button-loader"></span>${text}`;
  button.disabled = true;
  return button;
}

function resetButton(button, originalHTML) {
  button.innerHTML = originalHTML;
  button.disabled = false;
  return button;
}

async function loadManageProperties() {
  const loader = showLoading('Loading properties...');
  
  try {
    const response = await fetch(`${API_BASE_URL}/getProperty/owner?owner_id=${JSON.parse(localStorage.getItem("activeUser")).id}`);
    
    if(response.ok) {
      allProperties = await response.json();
      contentArea.innerHTML = `
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
            ${allProperties.map(property => `
              <tr>
                <td><img class="main_img2" src="${property.image_path ? property.image_path : '/images/property_7_1747834862129_0.png'}" alt="property image"/></td>
                <td>${property.title}</td>
                <td>${property.price}</td>
                <td>${property.status}</td>
                <td>
                  <button class="edit-btn property" property-data='${JSON.stringify(property).replace(/"/g, "&quot;")}'>Edit</button>
                  <button class="delete-btn property" property-data='${JSON.stringify(property).replace(/"/g, "&quot;")}'>Delete</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to load properties');
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message
    });
  } finally {
    loader.close();
  }

  document.querySelectorAll('.edit-btn.property').forEach(button => {
    button.addEventListener('click' , function() {
      const property = JSON.parse(this.getAttribute('property-data').replace(/&quot;/g, '"'));
      editProperty(property);
    })
  })

  document.querySelectorAll('.delete-btn.property').forEach(button => {
    button.addEventListener('click' , function() {
      const property = JSON.parse(this.getAttribute('property-data').replace(/&quot;/g, '"'));
      deleteProperty(property, this);
    })
  })
}

document.addEventListener("DOMContentLoaded", function() {
  const links = document.querySelectorAll(".sidebar .side_bar ul li a");

  // Load initial page
  loadDashboard();

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = link.getAttribute("data-page");

      switch (page) {
        case "dashboard":
          loadDashboard();
          break;
        case "add-property":
          loadAddProperty();
          break;
        case "manage-properties":
          loadManageProperties();
          break;
        case "inquiries":
          loadInquiries();
          break;
        case "profile-settings":
          loadProfileSettings();
          break;
        case "subscription":
          loadSubscription();
          break;
        case "logout":
          window.location.href = "./index.html";
          break;
      }
    });
  });
});
async function loadDashboard() {
  document.getElementById('owner_name').textContent = JSON.parse(localStorage.getItem('activeUser')).firstname
  document.getElementById('profile_pic').src = `/images/${JSON.parse(localStorage .getItem('activeUser')).profile_picture}`
  const loader = showLoading('Loading dashboard...');
  
  try {
    const response = await fetch(`${API_BASE_URL}/owner_dashboard?id=${JSON.parse(localStorage.getItem("activeUser")).id}`);
    
    if (!response.ok) throw new Error('Failed to load dashboard data');
    
    const owner_dashboard = await response.json();
    contentArea.innerHTML = `
      <h1>Dashboard Overview</h1>
      <div class="stats">
        <div class="stat-card"><h3>${owner_dashboard.total}</h3><p>Total Properties</p></div>
        <div class="stat-card"><h3>${owner_dashboard.sold}</h3><p>Sold</p></div>
        <div class="stat-card"><h3>${owner_dashboard.pending}</h3><p>Pending</p></div>
        <div class="stat-card"><h3>${owner_dashboard.inquiries}</h3><p>Inquiries</p></div>
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
    `;
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message
    });
  } finally {
    loader.close();
  }
}

function loadAddProperty() {
  contentArea.innerHTML = `
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
  `;

  const form = document.getElementById("add-property-form");
  form.addEventListener("submit", async(e) => {
    e.preventDefault();
    
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonHTML = submitButton.innerHTML;
    showButtonLoading(submitButton, 'Submitting...');
    
    const formData = new FormData();
    const imageInput = document.getElementById("property-images");
    
    formData.append("title", document.getElementById("property-title").value);
    formData.append("owner_id", JSON.parse(localStorage.getItem("activeUser")).id);
    formData.append("type", document.getElementById("property-type").value);
    formData.append("for", document.getElementById("property-status").value);
    formData.append("description", document.getElementById("property-description").value);
    formData.append("address", document.getElementById("property-address").value);
    formData.append("kebele", document.getElementById("property-kebele").value);
    formData.append("sp_location", document.getElementById("property-spLocation").value);
    formData.append("price", document.getElementById("property-price").value);
    formData.append("negotiable", document.getElementById("property-negotiable").value);
    formData.append("bedrooms", document.getElementById("property-bedrooms").value);
    formData.append("bathrooms", document.getElementById("property-bathrooms").value);
    formData.append("area", document.getElementById("property-area").value);
    formData.append("year", document.getElementById("property-year").value);
    
    for (let i = 0; i < imageInput.files.length; i++) {
      formData.append("property-images", imageInput.files[i]);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/newproperty`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        await Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'New property uploaded successfully',
          toast: true,
          position: 'center',
          showConfirmButton: false,
          timer: 3000
        });
        loadManageProperties();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error uploading property');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message
      });
    } finally {
      resetButton(submitButton, originalButtonHTML);
    }
  });
}

async function loadInquiries() {
  const loader = showLoading('Loading inquiries...');
  
  try {
    const response = await fetch(`${API_BASE_URL}/getinquiries/${JSON.parse(localStorage.getItem("activeUser")).id}`);
    
    if (!response.ok) throw new Error('Failed to load inquiries');
    
    const inquiries = await response.json();
    contentArea.innerHTML = `
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
    `;

    const tbody = document.getElementById("all-inquiries-body");
    inquiries.forEach(inquiry => {
      tbody.innerHTML += `
        <tr>
          <td><img class="main_img2" src="${inquiry.image_path ? inquiry.image_path : '/images/property_7_1747834862129_0.png'}" alt="property image"/></td>
          <td>${inquiry.title}</td>
          <td>${inquiry.message}</td>
          <td>${inquiry.name}</td>
          <td>${inquiry.phone}</td>
          <td>${inquiry.email}</td>
          <td>
            <button class="edit-btn inquiry reply" data-inquiry="${inquiry.id}">Reply</button>
            <button class="delete-btn inquiry reject" data-inquiry="${inquiry.id}">Reject</button>
            <div id="replyForm_${inquiry.id}" class="oreply-form">
              <textarea class="reply-textarea" placeholder="Type your reply here..." id="reply_textArea_${inquiry.id}"></textarea>
              <div class="reply-buttons">
                <button class="cancel-reply inquiry" data-inquiry="${inquiry.id}">Cancel</button>
                <button class="send-reply inquiry" data-inquiry='{"tenantId":${inquiry.tenant_id},"inquiryId":${inquiry.id}}'>Send</button>
              </div>
            </div>
          </td>
        </tr>
      `;
    });
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message
    });
  } finally {
    loader.close();
  }

  document.querySelectorAll('.edit-btn.inquiry.reply').forEach(button => {
    button.addEventListener('click' , function() {
      const inquiry_id = this.getAttribute('data-inquiry');
      reply(inquiry_id);
    })
  })

  document.querySelectorAll('.delete-btn.inquiry.reject').forEach(button => {
    button.addEventListener('click' , function() {
      const inquiryId = this.getAttribute('data-inquiry');
      deleteInqu(inquiryId, this);
    })
  })

  document.querySelectorAll('.send-reply.inquiry').forEach(button => {
    button.addEventListener('click' , function() {
      const replyData = JSON.parse(this.getAttribute("data-inquiry").replace(/'/g, '"'))
      sendReply(replyData.tenantId , replyData.inquiryId , this)
    })
  })

  document.querySelectorAll('.cancel-reply.inquiry').forEach(button => {
    button.addEventListener('click' , function() {
      const inquiryId = this.getAttribute("data-inquiry")
      cancelReply(inquiryId)
    })
  })
}

async function loadProfileSettings() {
  const user = JSON.parse(localStorage.getItem("activeUser"));
  contentArea.innerHTML = `
    <h1>Profile Settings</h1>
    <form class="property-form">
      <label>first name</label>
      <input id="fname" type="text" placeholder="firstname" required class="form-input" value="${user.firstname}"><br>
      <label>last name</label>
      <input id="lname" type="text" placeholder="lastname" required class="form-input" value="${user.lastname}"><br>
      <label>email</label>
      <input id="uemail" type="email" placeholder="Email Address" required class="form-input" value="${user.email}"><br>
      <label>phone</label>
      <input id="uphone" type="text" placeholder="Phone Number" required class="form-input" value="${user.phone}"><br>
      <label>about you</label>
      <textarea id="aboutu" placeholder="bio" class="form-input">${user.bio}</textarea><br>
      <button type="button" class="submit-btn editProfile">Save Changes</button>
    </form>
  `;

  document.querySelectorAll('.submit-btn.editProfile').forEach(button => {
    button.addEventListener('click' , function() {
      editProfile(this)
    })
  })
}

async function editProfile(button) {
  const user = JSON.parse(localStorage.getItem("activeUser"));
  const originalButtonHTML = button.innerHTML;
  showButtonLoading(button, 'Saving...');

  if (
    document.getElementById("fname").value === user.firstname &&
    document.getElementById("lname").value === user.lastname &&
    document.getElementById('uemail').value === user.email && 
    document.getElementById('uphone').value === user.phone && 
    document.getElementById('aboutu').value === user.bio
  ) {
    await Swal.fire({
      icon: 'info',
      title: 'No changes made',
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 2000
    });
    resetButton(button, originalButtonHTML);
    return;
  }

  try {
    const result = await Swal.fire({
      title: 'Save changes?',
      text: "Are you sure you want to update your profile?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, save changes!'
    });

    if (result.isConfirmed) {
      const response = await fetch(`${API_BASE_URL}/editprofile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: user.id,
          firstname: document.getElementById("fname").value,
          lastname: document.getElementById('lname').value,
          email: document.getElementById('uemail').value,
          phone: document.getElementById("uphone").value,
          bio: document.getElementById("aboutu").value
        })
      });

      if (response.ok) {
        const updatedUser = await response.json();
        localStorage.setItem("activeUser", JSON.stringify(updatedUser));
        
        await Swal.fire({
          icon: 'success',
          title: 'Saved!',
          text: 'Your profile has been updated',
          toast: true,
          position: 'center',
          showConfirmButton: false,
          timer: 2000
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message
    });
  } finally {
    resetButton(button, originalButtonHTML);
  }
}

async function deleteProperty(property, button) {
  const result = await Swal.fire({
    title: 'Delete Property?',
    text: "Are you sure you want to delete this property? This action cannot be undone.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  });

  if (result.isConfirmed) {
    const originalButtonHTML = button.innerHTML;
    showButtonLoading(button, 'Deleting...');

    try {
      const response = await fetch(`${API_BASE_URL}/deleteProperty?property_Id=${property.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Property has been deleted',
          toast: true,
          position: 'center',
          showConfirmButton: false,
          timer: 2000
        });
        loadManageProperties();
      } else {
        throw new Error('Failed to delete property');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message
      });
    } finally {
      resetButton(button, originalButtonHTML);
    }
  }
}

function editProperty(property) {
  contentArea.innerHTML = `
    <h1>Edit Property</h1>
    <div class="form-card">
      <form id="edit-property-form" class="property-form">
        <label>Title</label>
        <input type="text" id="edit-title" value="${property.title}" class="form-input" required><br>
        <label>Description</label>
        <textarea id="edit-propertyDescription" class="form-input">${property.description}</textarea>
        <label>Price</label>
        <input type="text" id="edit-price" value="${property.price}" class="form-input" required><br>
        <label>Status</label>
        <select id="edit-status" class="form-input" required>
          <option value="available" ${property.status.toLowerCase() === "available" ? "selected" : ""}>Available</option>
          <option value="pending" ${property.status.toLowerCase() === "pending" ? "selected" : ""}>Pending</option>
          <option value="sold" ${property.status.toLowerCase() === "sold" ? "selected" : ""}>Sold</option>
          <option value="rejected" ${property.status.toLowerCase() === "rejected" ? "selected" : ""}>Rejected</option>
          <option value="rented" ${property.status.toLowerCase() === "rented" ? "selected" : ""}>Rented</option>
        </select><br>
        <button type="submit" class="submit-btn">Save Changes</button>
      </form>
    </div>
  `;

  const form = document.getElementById("edit-property-form");
  form.addEventListener("submit", async(e) => {
    e.preventDefault();
    
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonHTML = submitButton.innerHTML;
    showButtonLoading(submitButton, 'Saving...');
    
    const currentStatus = document.getElementById("edit-status").value.toLowerCase();
    const originalStatus = property.status.toLowerCase();
    
    if (
      document.getElementById("edit-title").value === property.title &&
      document.getElementById("edit-price").value === property.price &&
      document.getElementById('edit-propertyDescription').value === property.description && 
      currentStatus === originalStatus
    ) {
      await Swal.fire({
        icon: 'info',
        title: 'No changes made',
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 2000
      });
      resetButton(submitButton, originalButtonHTML);
      loadManageProperties();
      return;
    }

    try {
      const result = await Swal.fire({
        title: 'Save changes?',
        text: "Are you sure you want to update this property?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, save changes!'
      });

      if (result.isConfirmed) {
        const response = await fetch(`${API_BASE_URL}/editProperty`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: property.id,
            title: document.getElementById("edit-title").value,
            description: document.getElementById('edit-propertyDescription').value,
            price: document.getElementById('edit-price').value,
            status: document.getElementById("edit-status").value
          })
        });

        if (response.ok) {
          await Swal.fire({
            icon: 'success',
            title: 'Saved!',
            text: 'Property has been updated',
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 2000
          });
          loadManageProperties();
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to update property');
        }
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message
      });
    } finally {
      resetButton(submitButton, originalButtonHTML);
    }
  });
}

function reply(inquiry_id) {
  document.getElementById(`replyForm_${inquiry_id}`).style.display = 'block';
}

async function sendReply(tenant_id, inquiry_id, button) {
  const replyText = document.getElementById(`reply_textArea_${inquiry_id}`).value;
  
  if (!replyText) {
    await Swal.fire({
      icon: 'warning',
      title: 'Empty Reply',
      text: 'Please type your reply before sending',
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 2000
    });
    return;
  }

  const originalButtonHTML = button.innerHTML;
  showButtonLoading(button, 'Sending...');

  try {
    const response = await fetch(`${API_BASE_URL}/reply`, {
      method: 'POST',
      body: JSON.stringify({
        sender_id: JSON.parse(localStorage.getItem("activeUser")).id,
        receiver_id: tenant_id,
        content: replyText
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      await Swal.fire({
        icon: 'success',
        title: 'Sent!',
        text: 'Message sent successfully',
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 2000
      });
      document.getElementById(`reply_textArea_${inquiry_id}`).value = '';
      document.getElementById(`replyForm_${inquiry_id}`).style.display = 'none';
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to send reply');
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message
    });
  } finally {
    resetButton(button, originalButtonHTML);
  }
}

function cancelReply(inquiry_id) {
  document.getElementById(`reply_textArea_${inquiry_id}`).value = '';
  document.getElementById(`replyForm_${inquiry_id}`).style.display = 'none';
}

async function deleteInqu(inqu_id, button) {
  const result = await Swal.fire({
    title: 'Reject Inquiry?',
    text: "Are you sure you want to reject this inquiry?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, reject it!'
  });

  if (result.isConfirmed) {
    const originalButtonHTML = button.innerHTML;
    showButtonLoading(button, 'Rejecting...');

    try {
      const response = await fetch(`${API_BASE_URL}/deleteinqu/${inqu_id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await Swal.fire({
          icon: 'success',
          title: 'Rejected!',
          text: 'Inquiry has been rejected',
          toast: true,
          position: 'center',
          showConfirmButton: false,
          timer: 2000
        });
        loadInquiries();
      } else {
        throw new Error('Failed to reject inquiry');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message
      });
    } finally {
      resetButton(button, originalButtonHTML);
    }
  }
}