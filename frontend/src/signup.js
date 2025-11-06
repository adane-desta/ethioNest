// Base API URL
const API_BASE_URL = 'https://ethinest.onrender.com/api';

// Toggle between tenant and owner forms
const tenantBtn = document.getElementById('tenantBtn');
const ownerBtn = document.getElementById('ownerBtn');
const roleToggle = document.querySelector('.role-toggle');
const signupForm = document.getElementById('signupForm');

let role = "";

tenantBtn.addEventListener('click', () => {
    role = 'tenant';
    roleToggle.classList.remove('owner-active');
    tenantBtn.classList.add('active');
    ownerBtn.classList.remove('active');
});

ownerBtn.addEventListener('click', () => {
    role = 'owner';
    roleToggle.classList.add('owner-active');
    ownerBtn.classList.add('active');
    tenantBtn.classList.remove('active');
});

// Profile image preview
const profileImage = document.getElementById('profileImage');
const profilePreview = document.getElementById('profilePreview');

profileImage.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {

        if (file.size > 2 * 1024 * 1024) {
            Swal.fire({
                icon: 'error',
                title: 'Image too large',
                text: 'Please select an image smaller than 2MB',
                toast: true,
                position: 'center',
                showConfirmButton: false,
                timer: 3000
            });
            this.value = ''; 
            return;
        }

        // Validate image type
        if (!file.type.match('image.*')) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid file type',
                text: 'Please select an image file (JPEG, PNG, etc.)',
                toast: true,
                position: 'center',
                showConfirmButton: false,
                timer: 3000
            });
            this.value = '';
            return;
        }

        const reader = new FileReader();
        
        reader.addEventListener('load', function() {
            profilePreview.style.display = 'block';
            profilePreview.setAttribute('src', this.result);
            if (profilePreview.nextElementSibling) {
                profilePreview.nextElementSibling.style.display = 'none';
            }
        });
        
        reader.readAsDataURL(file);
    }
});

// Form submission with validation
signupForm.addEventListener('submit', async(event) => {
    event.preventDefault();

    // Validate role selection
    if (!role) {
        await Swal.fire({
            icon: 'error',
            title: 'Role Required',
            text: 'Please select whether you are a tenant or owner',
            confirmButtonColor: '#3085d6'
        });
        return;
    }

    // Validate password match
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        await Swal.fire({
            icon: 'error',
            title: 'Password Mismatch',
            text: 'Your passwords do not match',
            confirmButtonColor: '#3085d6'
        });
        return;
    }

    // Validate password strength
    if (password.length < 8) {
        await Swal.fire({
            icon: 'error',
            title: 'Weak Password',
            text: 'Password must be at least 8 characters long',
            confirmButtonColor: '#3085d6'
        });
        return;
    }

    // Show loading state
    const submitButton = signupForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.innerHTML = '<span class="button-loader"></span> Registering...';
    submitButton.disabled = true;

    try {
        const newUser = new FormData();
        newUser.append("firstname", document.getElementById('firstName').value.trim());
        newUser.append("lastname", document.getElementById('lastName').value.trim());
        newUser.append("email", document.getElementById('email').value.trim());
        newUser.append("phone", document.getElementById('phone').value.trim());
        newUser.append("password", password);
        newUser.append("bio", document.getElementById('bio').value.trim() || "");
        newUser.append("preferredLocation", document.getElementById('preferredLocation').value.trim() || "");
        newUser.append("role", role); 
        
        const profileImageFile = document.getElementById('profileImage').files[0];
        if(profileImageFile){
            newUser.append('profileImage', profileImageFile);
        }

        const response = await fetch(`${API_BASE_URL}/signup`, {
            method: 'POST',
            body: newUser
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Registration failed');
        }

        // Success
        await Swal.fire({
            icon: 'success',
            title: 'Registration Successful!',
            text: 'You have successfully registered',
            showConfirmButton: false,
            timer: 2000
        });

        setTimeout(() => {
            window.location.href = './login.html';
        }, 2000);

    } catch (error) {
        await Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: error.message,
            confirmButtonColor: '#3085d6'
        });
    } finally {
        // Reset button state
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
    }
});

const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        this.value = this.value.replace(/[^0-9+]/g, '');
    });
}