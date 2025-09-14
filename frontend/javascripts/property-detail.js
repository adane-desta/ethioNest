// Base API URL
const API_BASE_URL = 'http://192.168.1.4:5200/api';

const propertyId = localStorage.getItem("activeProperty");
let propertyDetail = null;
let isSavedProperty = false;

// Initialize the page
document.addEventListener('DOMContentLoaded', async () => {
    const loader = Swal.fire({
        title: 'Loading property details...',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
    });

    try {
        // Check if user is logged in before checking favorites
        const user = JSON.parse(localStorage.getItem("activeUser"));
        if (user) {
            const res = await fetch(`${API_BASE_URL}/checkfavorites?prop_id=${propertyId}&user_id=${user.id}`);
            if (res.ok) {
                const saveCheckResult = await res.json();
                isSavedProperty = saveCheckResult.success;
            }
        }
        
        // Update save button state
        updateSaveButtonState(isSavedProperty);
        
        // Load property details
        const response = await fetch(`${API_BASE_URL}/getPropertyDetail?propId=${propertyId}`);
        if (!response.ok) throw new Error('Failed to load property details');
        
        propertyDetail = await response.json();

        // Property Details
        document.getElementById('mainImage').src = propertyDetail[2][0].image_path;
        document.getElementById('property_title').textContent = propertyDetail[0].title;
        document.getElementById('property_price').textContent = `${parseFloat(propertyDetail[0].price).toLocaleString('en-US')} ETB`;
        document.getElementById('bedroom').textContent = propertyDetail[0].bedrooms;
        document.getElementById('bathroom').textContent = propertyDetail[0].bathrooms;
        document.getElementById('area').textContent = propertyDetail[0].area;
        document.getElementById('type').textContent = propertyDetail[0].type;
        document.getElementById('description').textContent = propertyDetail[0].description;
        document.getElementById('property_address').textContent = 'Hawassa ' + propertyDetail[0].address + ', Sidama Region';

        // Owner detail
        document.getElementById('ownerName').textContent = propertyDetail[1].name;
        document.getElementById('owner_phone').innerHTML += propertyDetail[1].phone;
        document.getElementById('owner_email').innerHTML += propertyDetail[1].email;
        document.getElementById('ownerImage').src = '/images/' + propertyDetail[1].profile_picture;

        // Render thumbnails
        const thumbnailContainer = document.getElementById('thumbnailContainer');
        thumbnailContainer.innerHTML = ''; 
        propertyDetail[2].forEach(image => {
            thumbnailContainer.innerHTML += `
            <img src=${image.image_path}
            alt=${propertyDetail[0].title} 
            class="thumbnail"
            onclick="changeMainImage(this)">`;
        });

    } catch (error) {
        await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message || 'Failed to load property details'
        });
        document.getElementById('propertyContainer').innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <p>${error.message || 'Failed to load property details'}</p>
                <button class="btn-primary" onclick="window.history.back()">Go Back</button>
            </div>
        `;
    } finally {
        loader.close();
    }
});

// Function to update save button state
function updateSaveButtonState(isSaved) {
    const saveBtn = document.getElementById('saveProperty');
    if (!saveBtn) return;
    
    const icon = saveBtn.querySelector('i') || document.createElement('i');
    
    if (isSaved) {
        icon.className = 'fas fa-heart';
        saveBtn.innerHTML = '<i class="fas fa-heart"></i> Saved';
        saveBtn.classList.add('saved');
    } else {
        icon.className = 'far fa-heart';
        saveBtn.innerHTML = '<i class="far fa-heart"></i> Save';
        saveBtn.classList.remove('saved');
    }
}

// Change main image when thumbnail is clicked
function changeMainImage(thumbnail) {
    const mainImage = document.getElementById('mainImage');
    mainImage.src = thumbnail.src;
    mainImage.alt = thumbnail.alt;
}

// Save property functionality
const saveBtn = document.getElementById('saveProperty');
if (saveBtn) {
    saveBtn.addEventListener('click', async function() {
        const user = JSON.parse(localStorage.getItem("activeUser"));
        if (!user) {
            const result = await Swal.fire({
                title: 'Login Required',
                text: 'You need to login to save properties',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Login',
                cancelButtonText: 'Cancel'
            });
            
            if (result.isConfirmed) {
                window.location.href = '../html-files/login.html';
            }
            return;
        }

        const button = this;
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        button.disabled = true;

        try {
            let response;
            
            if (isSavedProperty) {
                // Unsave the property
                response = await fetch(`${API_BASE_URL}/unsavefromfavorite?prop_id=${propertyId}&user_id=${user.id}`);
                if (response.ok) {
                    isSavedProperty = false;
                    updateSaveButtonState(false);
                    await Swal.fire({
                        icon: 'success',
                        title: 'Removed!',
                        text: 'Property removed from favorites',
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 2000
                    });
                } else {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to unsave property');
                }
            } else {
                // Save the property
                response = await fetch(`${API_BASE_URL}/addtofavorite`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        prop_id: propertyId,
                        user_id: user.id,
                        tenant_name: `${user.firstname} ${user.lastname}`,
                        owner_id: propertyDetail[1].id,
                        title: propertyDetail[0].title
                    })
                });
                
                if (response.ok) {
                    isSavedProperty = true;
                    updateSaveButtonState(true);
                    await Swal.fire({
                        icon: 'success',
                        title: 'Saved!',
                        text: 'Property added to favorites',
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 2000
                    });
                } else {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to save property');
                }
            }
        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message
            });
        } finally {
            button.innerHTML = originalHTML;
            button.disabled = false;
        }
    });
}

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async(e) => {
        e.preventDefault();
        
        const user = JSON.parse(localStorage.getItem("activeUser"));
        if (!user) {
            await Swal.fire({
                title: 'Login Required',
                text: 'You need to login to contact the owner',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Login',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '../html-files/login.html';
                }
            });
            return;
        }

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalHTML = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;

        try {
            const inquiry = {
                tenantId: user.id,
                ownerId: propertyDetail[1].id,
                propertyId: propertyDetail[0].id,
                message: `${document.getElementById('contactMessage').value}\n\nEmail: ${document.getElementById('contactEmail').value}\nPhone: ${document.getElementById('contactPhone').value}\nName: ${document.getElementById('contactName').value}`
            };

            const response = await fetch(`${API_BASE_URL}/inquiries`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inquiry)
            });

            if (response.ok) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Sent!',
                    text: 'Your message has been sent to the property owner',
                    showConfirmButton: false,
                    timer: 2000
                });
                contactForm.reset();
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to send message');
            }
        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message
            });
        } finally {
            submitButton.innerHTML = originalHTML;
            submitButton.disabled = false;
        }
    });
}

// Initialize image gallery lightbox
document.addEventListener('DOMContentLoaded', function() {
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.addEventListener('click', function() {
            console.log('Open image gallery');
        });
    }
});