// Base API URL
const API_BASE_URL = 'http://localhost:5200/api';

let allProperties = null;

// Current filters
let filters = {
    query: '',
    price: 'Any',
    type: 'Any'
};

// DOM elements
const queryInput = document.getElementById('query');
const priceSelect = document.getElementById('price');
const typeSelect = document.getElementById('type');
const searchBtn = document.getElementById('searchBtn');
const propertyGrid = document.getElementById('propertyGrid');

// Initialize the page
document.addEventListener('DOMContentLoaded', async() => {
    const loader = Swal.fire({
        title: 'Loading properties...',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
    });

    try {
        const response = await fetch(`${API_BASE_URL}/getProperties/available`);
        
        if(response.ok) {
            allProperties = await response.json();
            renderProperties(allProperties);
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to load properties');
        }
    } catch (error) {
        await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message
        });
        propertyGrid.innerHTML = '<p class="error-message">Failed to load properties. Please try again later.</p>';
    } finally {
        loader.close();
    }
    
    // Event listeners
    searchBtn.addEventListener('click', handleSearch);
    
    // Input changes update the draft filters
    queryInput.addEventListener('input', (e) => {
        filters.query = e.target.value;
    });
    
    priceSelect.addEventListener('change', (e) => {
        filters.price = e.target.value;
    });
    
    typeSelect.addEventListener('change', (e) => {
        filters.type = e.target.value;
    });
});

// Handle search button click
async function handleSearch() {
    const button = searchBtn;
    const originalButtonHTML = button.innerHTML;
    
    try {
        // Show loading state on button
        button.innerHTML = `<span class="button-loader"></span> Searching...`;
        button.disabled = true;

        if (!allProperties) {
            const response = await fetch(`${API_BASE_URL}/getProperties/available`);
            if (response.ok) {
                allProperties = await response.json();
            } else {
                throw new Error('Failed to refresh properties');
            }
        }

        const filtered = filterProperties(allProperties, filters);
        renderProperties(filtered);

        // Scroll to results with smooth animation
        propertyGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Show results count in a toast
        if (filtered.length === 0) {
            await Swal.fire({
                icon: 'info',
                title: 'No results',
                text: 'Try different search criteria',
                toast: true,
                position: 'center',
                showConfirmButton: false,
                timer: 3000
            });
        } else {
            await Swal.fire({
                icon: 'success',
                title: `${filtered.length} properties found`,
                toast: true,
                position: 'center',
                showConfirmButton: false,
                timer: 2000
            });
        }
    } catch (error) {
        await Swal.fire({
            icon: 'error',
            title: 'Search failed',
            text: error.message
        });
    } finally {
        // Reset button state
        button.innerHTML = originalButtonHTML;
        button.disabled = false;
    }
} 


// Filter properties based on current filters
function filterProperties(allProperties, filters) {
    if (!allProperties) return [];
    
    return allProperties.filter((prop) => {
        const price = parseFloat(prop.price);
        
        const matchQuery =
            (prop.specific_place?.toLowerCase().includes(filters.query.toLowerCase())) ||
            (prop.title?.toLowerCase().includes(filters.query.toLowerCase()));

        const matchPrice =
            filters.price === 'Any' ||
            (filters.price === 'Under 1M ETB' && price < 1000000) ||
            (filters.price === '1M ETB - 3M ETB' && price >= 1000000 && price <= 3000000) ||
            (filters.price === '3M ETB - 6M ETB' && price > 3000000 && price <= 6000000) ||
            (filters.price === '6M ETB - 9M ETB' && price > 6000000 && price <= 9000000) ||
            (filters.price === 'Over 10M ETB' && price > 10000000);

        const matchType = 
            filters.type === 'Any' || 
            filters.type.toLowerCase() === prop.type.toLowerCase();

        return matchQuery && matchPrice && matchType;
    });
}

// Render properties to the DOM
function renderProperties(properties) {
    if (!properties?.length) {
        propertyGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>No properties found matching your criteria</p>
                <button class="btn-primary reset-filter">Reset Filters</button>
            </div>
        `;
        document.querySelectorAll('.btn-primary.reset-filter').forEach(button => {
            button.addEventListener('click' , function() {
                resetFilters();
            })
        })
        
        return;
    }

    propertyGrid.innerHTML = properties.map(property => `
        <div class="property-card">
            <div class="property-img">
                <img src="${property.image_path || '/images/default-property.jpg'}" alt="${property.title || 'Property'}">
                <span class="property-badge">${property.rentorsell === 'sell' ? 'For Sale' : 'For Rent'}</span>
            </div>
            <div class="property-details">
                <div class="property-price">
                    ${parseFloat(property.price).toLocaleString('en-US')} ETB
                    ${property.negotiable === 'yes' ? '<span class="negotiable">(Negotiable)</span>' : ''}
                </div>
                <div class="property-address">${property.specific_place || property.address || 'Address not available'}</div>
                <div class="property-features">
                    <span class="feature"><i class="fas fa-bed"></i> ${property.bedrooms} Beds</span>
                    <span class="feature"><i class="fas fa-bath"></i> ${property.bathrooms} Baths</span>
                    <span class="feature"><i class="fas fa-ruler-combined"></i> ${property.area} sqft</span>
                </div>
                <div class="property-footer">
                    <button class="btn-outline btn-primary" data-propertyId="${property.id}">View Details</button>
                    <button class="favorite-btn" aria-label="Add to favorites" data-propertyId="${property.id}">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    document.querySelectorAll(".favorite-btn").forEach(button => {

        button.addEventListener("click",  function() {
            const propertyId = this.getAttribute("data-propertyId");
            toggleFavorite(propertyId, this);
        })
    
    });

    document.querySelectorAll(".btn-outline.btn-primary").forEach(button => {
        button.addEventListener("click", function() {
            const propertyId = this.getAttribute("data-propertyId");
            showDetail(propertyId);
        })
    })
    
}

function resetFilters() {
    filters = {
        query: '',
        price: 'Any',
        type: 'Any'
    };
    queryInput.value = '';
    priceSelect.value = 'Any';
    typeSelect.value = 'Any';
    renderProperties(allProperties);
}

 function toggleFavorite(propertyId, button) {

    const icon = button.querySelector('i');
    const isFavorite = icon.classList.contains('fas');
    
        if (isFavorite) {
            icon.classList.replace('fas', 'far');

        } else {
            icon.classList.replace('far', 'fas');
        }

}

function showDetail(propertyId) {
    localStorage.setItem("activeProperty", propertyId);
    window.location.href = '/property-detail.html';
}