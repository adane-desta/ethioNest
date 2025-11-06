

console.log("you are here")
// Base API URL
const API_BASE_URL = 'https://ethinest.onrender.com/api';


const testimonials = [

    {
       rating: "★★★★★" ,
       testimony: "\"Found my dream apartment in just 2 days! The process was so easy compared to traditional methods.\"",
       userImg: "/images/Screenshot 2025-06-23 224442.png",
       userName: "Kaleb M., Tenant"
    },

    {
        rating: "★★★★★" ,
        testimony: "\"As a property owner, I've rented my units 3x faster using SidamaRent. Highly recommended!\"",
        userImg: "/images/Screenshot 2025-06-23 224827.png",
        userName: "Selam W., Property Owner"
     },

     {
        rating: "★★★★☆" ,
        testimony: "\"The customer service team helped me resolve an issue within hours. Great platform!\"",
        userImg: "/images/Screenshot 2025-06-23 224429.png",
        userName: "Daniel T., Buyer"
     },
]

const popularLocations = [
    {
       image: "/images/images.jpeg",
       locName: "Pissa" ,
       proAvailable: "42 properties available"
    },

    {
        image: "/images/images (1).jpeg",
        locName: "Atote" ,
        proAvailable: "18 properties available"
     },

     {
        image: "/images/images.jpeg",
        locName: "Alito" ,
        proAvailable: "25 properties available"
     },

     {
        image: "/images/Lake_Hawassa_.jpg",
        locName: "Fikir Hayk" ,
        proAvailable: "12 properties available"
     }
]


// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Search tabs functionality
const searchTabs = document.querySelectorAll('.search-tabs button');
searchTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        searchTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    });
});

// Save property button
const saveButtons = document.querySelectorAll('.save-btn');
saveButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        this.innerHTML = this.innerHTML.includes('far') 
            ? '<i class="fas fa-heart"></i>' 
            : '<i class="far fa-heart"></i>';
    });
});


// featured properties section

document.addEventListener('DOMContentLoaded', async() => {
  
    const propertiesArea = document.getElementById('propertyGrid');
    const testimonialCards = document.getElementById('testimonialCards')
    const locationCards = document.getElementById('locationCards')
    
    const response = await fetch(`${API_BASE_URL}/recentproperties`)
    const recentproperties = await response.json()
    recentproperties.forEach(featuredPropertie => {
        propertiesArea.innerHTML += `
        <div class="property-card">
        <div class="badge">${featuredPropertie.rentorsell}</div>
        <img src="${featuredPropertie.image_path}" alt="${featuredPropertie.title}">
        <div class="property-details">
            <h3>${featuredPropertie.title}</h3>
            <p><i class="fas fa-map-marker-alt"></i> ${featuredPropertie.specific_place}</p>
            <div class="features">
                <span><i class="fas fa-bed"></i> ${featuredPropertie.bedrooms}</span>
                <span><i class="fas fa-bath"></i>${featuredPropertie.bathrooms}</span>
                <span><i class="fas fa-vector-square"></i> ${featuredPropertie.area}</span>
            </div>
            <div class="price">${parseFloat(featuredPropertie.price).toLocaleString('en-US')} ETB</div>
            
        </div>
    </div>
        `;
    });

    testimonials.forEach(testimonial => {
        testimonialCards.innerHTML += `

        <div class="testimonial">
        <div class="rating">${testimonial.rating}</div>
        <p>${testimonial.testimony}</p>
        <div class="user">
            <img src="${testimonial.userImg}" alt="User">
            <span>${testimonial.userName}</span>
        </div>
        </div>
        
        `
    })
    
    popularLocations.forEach(location =>{

        locationCards.innerHTML += `

        <div class="location">
        <img src="${location.image}" alt="Hawassa">
        <h3>${location.locName}</h3>
        <p>42 ${location.proAvailable}</p>
        </div>
        
        `
    
    })

    document.querySelectorAll('.search-btn, .view-all, .btn, .btn-primary1').forEach(button => {
        button.addEventListener('click' , function() {
            showLoginPopup();
        })
    })

});

document.getElementById('feedbackForm').addEventListener('submit', async() =>{

    try{
        const response = await fetch(`${API_BASE_URL}/addFeedback` , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            })
        })
        if(response.ok){
            alert('your message has been delvered successfully')
        }else{
           const errorData = await response.json()
           alert(errorData.message)
        }
    }catch(error){
        alert(error)
    }
})

        const accessContentBtn = document.getElementById('accessContentBtn');
        const loginPopup = document.getElementById('loginPopup');
        const closePopup = document.getElementById('closePopup');
        const loginBtn = document.getElementById('loginBtn');
        const signupBtn = document.getElementById('signupBtn');

        // Show popup when trying to access content
       const showLoginPopup = () => {
            loginPopup.classList.add('active');
        };

        // Close popup
        closePopup.addEventListener('click', () => {
            loginPopup.classList.remove('active');
        });

        // Login button action
        loginBtn.addEventListener('click', () => {
            loginPopup.classList.remove('active');
             window.location.href = './login.html';
        });

        // Signup button action
        signupBtn.addEventListener('click', () => {
            loginPopup.classList.remove('active');
            window.location.href = './signup.html';
        });

        // Close popup when clicking outside
        loginPopup.addEventListener('click', (e) => {
            if (e.target === loginPopup) {
                loginPopup.classList.remove('active');
            }
        });
