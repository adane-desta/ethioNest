// Base API URL
const API_BASE_URL = 'https://ethinest.onrender.com/api';

// DOM elements
const propertyGrid = document.getElementById('propertyGrid');
const noResultsDiv = document.createElement('div');
noResultsDiv.className = 'no-results';
noResultsDiv.innerHTML = `
    <i class="fas fa-heart"></i>
    <p>You haven't saved any properties yet</p>
    <button class="btn-primary" onclick="window.location.href='./properties.html'">
        Browse Properties
    </button>
`;

// Initialize the page
document.addEventListener('DOMContentLoaded', async() => {
    const loader = Swal.fire({
        title: 'Loading your saved properties...',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
    });

    try {
        const user = JSON.parse(localStorage.getItem("activeUser"));
        if (!user) {
            throw new Error('Please login to view saved properties');
        }

        const response = await fetch(`${API_BASE_URL}/getsavedproperties?tenant=${user.id}`);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to load saved properties');
        }

        const properties = await response.json();
        
        if (properties.length === 0) {
            propertyGrid.innerHTML = '';
            propertyGrid.appendChild(noResultsDiv);
        } else {
            renderProperties(properties);
        }

    } catch (error) {
        await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message || 'Failed to load saved properties'
        });
        
        if (error.message.includes('login')) {
            propertyGrid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>${error.message}</p>
                    <button class="btn-primary" onclick="window.location.href='./login.html'">
                        Login Now
                    </button>
                </div>
            `;
        } else {
            propertyGrid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>${error.message}</p>
                    <button class="btn-primary" onclick="window.location.reload()">
                        Try Again
                    </button>
                </div>
            `;
        }
    } finally {
        loader.close();
    }
});

// Render properties to the DOM
function renderProperties(properties) {
    propertyGrid.innerHTML = properties.map((property, index) => `
        <div class="property-card">
            <div class="property-img">
                <img src="${property.image_path || '/images/default-property.jpg'}" alt="${property.title || 'Property'}">
                <span class="property-badge">${property.status || 'Available'}</span>
                <button class="unsave-btn property" data-property="${property.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="property-details">
                <h3 class="property-title">${property.title || 'No Title'}</h3>
                <div class="property-price">
                    ${parseFloat(property.price || 0).toLocaleString('en-US')} ETB
                    ${property.negotiable === 'yes' ? '<span class="negotiable">(Negotiable)</span>' : ''}
                </div>
                <div class="property-address">${property.address || 'Address not available'}</div>
                <div class="property-features">
                    <span class="feature"><i class="fas fa-bed"></i> ${property.bedrooms || 0} Beds</span>
                    <span class="feature"><i class="fas fa-bath"></i> ${property.bathrooms || 0} Baths</span>
                    <span class="feature"><i class="fas fa-ruler-combined"></i> ${property.area || 0} sqft</span>
                </div>
                <div class="property-footer">
                    <button data-property="${property.id}" class="btn-outline btn-primary">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.unsave-btn.property').forEach(button => {
        button.addEventListener('click' , function() {
            const propertyID = this.getAttribute("data-property");
            unsaveProperty(propertyID , this);
        })
    })

    document.querySelectorAll('.btn-outline.btn-primary').forEach(button => {
        button.addEventListener('click' , function() {
            const propertyId = this.getAttribute("data-property");
            showDetail(propertyId);
        })
    })
}

async function unsaveProperty(propertyId, button) {
    const result = await Swal.fire({
        title: 'Remove Property?',
        text: "Are you sure you want to remove this property from your saved list?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, remove it!'
    });

    if (!result.isConfirmed) return;

    const originalHTML = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    button.disabled = true;

    try {
        const user = JSON.parse(localStorage.getItem("activeUser"));
        if (!user) throw new Error('Please login to manage saved properties');

        const response = await fetch(`${API_BASE_URL}/unsavefromfavorite?prop_id=${propertyId}&user_id=${user.id}`);

        if (response.ok) {
            await Swal.fire({
                icon: 'success',
                title: 'Removed!',
                text: 'Property has been removed from your saved list',
                toast: true,
                position: 'center',
                showConfirmButton: false,
                timer: 2000
            });
            
            // Remove the property card from UI
            button.closest('.property-card').remove();
            
            // Check if no properties left
            if (document.querySelectorAll('.property-card').length === 0) {
                propertyGrid.innerHTML = '';
                propertyGrid.appendChild(noResultsDiv);
            }
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to remove property');
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
}

function showDetail(propertyId) {
    localStorage.setItem("activeProperty", propertyId);
    window.location.href = './property-detail.html';
}