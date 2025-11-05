// Base API URL
const API_BASE_URL = 'http://localhost:5200/api';

// Testimonials data
const testimonials = [
    {
        rating: "★★★★★",
        testimony: "\"Found my dream apartment in just 2 days! The process was so easy compared to traditional methods.\"",
        userImg: "/images/Screenshot 2025-06-23 224442.png",
        userName: "Kaleb M., Tenant"
    },
    {
        rating: "★★★★★",
        testimony: "\"As a property owner, I've rented my units 3x faster using SidamaRent. Highly recommended!\"",
        userImg: "/images/Screenshot 2025-06-23 224827.png",
        userName: "Selam W., Property Owner"
    },
    {
        rating: "★★★★☆",
        testimony: "\"The customer service team helped me resolve an issue within hours. Great platform!\"",
        userImg: "/images/Screenshot 2025-06-23 224429.png",
        userName: "Daniel T., Buyer"
    }
];

// Popular locations data
const popularLocations = [
    {
        image: "/images/images (1).jpeg",
        locName: "Pissa",
        proAvailable: "42 properties available"
    },
    {
        image: "/images/images (1).jpeg",
        locName: "Atote",
        proAvailable: "18 properties available"
    },
    {
        image: "/images/images.jpeg",
        locName: "Alito",
        proAvailable: "25 properties available"
    },
    {
        image: "/images/Lake_Hawassa_.jpg",
        locName: "Fikir Hayk",
        proAvailable: "12 properties available"
    }
];

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}

// Search tabs functionality
const searchTabs = document.querySelectorAll('.search-tabs button');
if (searchTabs.length > 0) {
    searchTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            searchTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });
}

// Save property button
const saveButtons = document.querySelectorAll('.save-btn');
if (saveButtons.length > 0) {
    saveButtons.forEach(btn => {
        btn.addEventListener('click', async function() {
            const isLoggedIn = localStorage.getItem("activeUser");
            if (!isLoggedIn) {
                const result = await Swal.fire({
                    title: 'Login Required',
                    text: 'You need to login to save properties',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Login',
                    cancelButtonText: 'Cancel'
                });
                
                if (result.isConfirmed) {
                    window.location.href = './login.html';
                }
                return;
            }

            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.replace('far', 'fas');
                await Swal.fire({
                    icon: 'success',
                    title: 'Saved!',
                    text: 'Property added to your favorites',
                    toast: true,
                    position: 'center',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                icon.classList.replace('fas', 'far');
                await Swal.fire({
                    icon: 'info',
                    title: 'Removed!',
                    text: 'Property removed from favorites',
                    toast: true,
                    position: 'center',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    });
}

// Initialize page content
document.addEventListener('DOMContentLoaded', async() => {
    const loader = Swal.fire({
        title: 'Loading featured properties...',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
    });

    try {
        // Load featured properties
        const propertiesArea = document.getElementById('propertyGrid');
        const testimonialCards = document.getElementById('testimonialCards');
        const locationCards = document.getElementById('locationCards');

        // Fetch recent properties
        const response = await fetch(`${API_BASE_URL}/recentproperties`);
        if (!response.ok) throw new Error('Failed to load properties');
        
        const recentproperties = await response.json();
        
        // Render properties
        if (propertiesArea) {
            propertiesArea.innerHTML = recentproperties.map(property => `
                <div class="property-card">
                    <div class="badge">${property.rentorsell === 'sell' ? 'For Sale' : 'For Rent'}</div>
                    <img src="${property.image_path || '/images/default-property.jpg'}" alt="${property.title || 'Property'}">
                    <div class="property-details">
                        <h3>${property.title || 'No Title'}</h3>
                        <p><i class="fas fa-map-marker-alt"></i> ${property.specific_place || property.address || 'Location not specified'}</p>
                        <div class="features">
                            <span><i class="fas fa-bed"></i> ${property.bedrooms || 0}</span>
                            <span><i class="fas fa-bath"></i> ${property.bathrooms || 0}</span>
                            <span><i class="fas fa-vector-square"></i> ${property.area || 0} sqft</span>
                        </div>
                        <div class="price">${parseFloat(property.price || 0).toLocaleString('en-US')} ETB</div>
                    </div>
                </div>
            `).join('');
        }

        // Render testimonials
        if (testimonialCards) {
            testimonialCards.innerHTML = testimonials.map(testimonial => `
                <div class="testimonial">
                    <div class="rating">${testimonial.rating}</div>
                    <p>${testimonial.testimony}</p>
                    <div class="user">
                        <img src="${testimonial.userImg}" alt="${testimonial.userName}">
                        <span>${testimonial.userName}</span>
                    </div>
                </div>
            `).join('');
        }

        // Render popular locations
        if (locationCards) {
            locationCards.innerHTML = popularLocations.map(location => `
                <div class="location">
                    <img src="${location.image}" alt="${location.locName}">
                    <h3>${location.locName}</h3>
                    <p>${location.proAvailable}</p>
                </div>
            `).join('');
        }

    } catch (error) {
        console.error('Error loading content:', error);
        await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to load some content. Please try refreshing the page.'
        });
    } finally {
        loader.close();
    }
});

// Feedback form submission
const feedbackForm = document.getElementById('feedbackForm');
if (feedbackForm) {
    feedbackForm.addEventListener('submit', async(e) => {
        e.preventDefault();
        
        const submitButton = feedbackForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = '<span class="button-loader"></span> Sending...';
        submitButton.disabled = true;

        try {
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                subject: document.getElementById('subject').value.trim(),
                message: document.getElementById('message').value.trim()
            };

            // Basic validation
            if (!formData.name || !formData.email || !formData.message) {
                throw new Error('Please fill in all required fields');
            }

            if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
                throw new Error('Please enter a valid email address');
            }

            const response = await fetch(`${API_BASE_URL}/addFeedback`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to send feedback');
            }

            await Swal.fire({
                icon: 'success',
                title: 'Thank You!',
                text: 'Your feedback has been submitted successfully',
                showConfirmButton: false,
                timer: 2000
            });

            feedbackForm.reset();

        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: error.message
            });
        } finally {
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
        }
    });
}