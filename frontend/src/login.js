// Base API URL
const API_BASE_URL = 'http://localhost:5200/api';

// Password toggle functionality
const togglePassword = document.getElementById('togglePassword');
const password = document.getElementById('password');

if (togglePassword && password) {
    togglePassword.addEventListener('click', function() {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        this.classList.toggle('fa-eye-slash');
        

        const ariaLabel = type === 'password' ? 'Show password' : 'Hide password';
        this.setAttribute('aria-label', ariaLabel);
    });
}

// Form submission
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async(event) => {
        event.preventDefault();

        const submitButton = loginForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = '<span class="button-loader"></span> Logging in...';
        submitButton.disabled = true;

        try {
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;

            // Basic validation
            if (!email || !password) {
                throw new Error('Please fill in all fields');
            }

            if (!/^\S+@\S+\.\S+$/.test(email)) {
                throw new Error('Please enter a valid email address');
            }

            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Login failed. Please try again.');
            }

            const user = await response.json();
            if (!user) throw new Error('Invalid user data received');


            localStorage.setItem("activeUser", JSON.stringify(user));
            
            
            await Swal.fire({
                icon: 'success',
                title: 'Login Successful!',
                text: `Welcome back, ${user.firstname || 'User'}!`,
                showConfirmButton: false,
                timer: 1500
            });

            // Redirect based on role
            let redirectPath;
            switch(user.role) {
                case 'tenant':
                    redirectPath = '/homepage.html';
                    break;
                case 'owner':
                    redirectPath = '/owner.html';
                    break;
                case 'admin':
                    redirectPath = '/admin.html';
                    break;
                default:
                    throw new Error('Unknown user role');
            }
            
            window.location.href = redirectPath;

        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: error.message,
                confirmButtonColor: '#3085d6'
            });
            
            document.getElementById('password').value = '';
        } finally {
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
        }
    });
}

// Social login handlers
const googleBtn = document.querySelector('.social-btn.google');
const facebookBtn = document.querySelector('.social-btn.facebook');

if (googleBtn) {
    googleBtn.addEventListener('click', async function() {
        const loader = Swal.fire({
            title: 'Redirecting to Google',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading()
        });
        
        try {
           
            console.log('Google login clicked');
            // window.location.href = `${API_BASE_URL}/auth/google`;
            
            await Swal.fire({
                icon: 'info',
                title: 'Coming Soon',
                text: 'Google login will be available soon',
                confirmButtonColor: '#3085d6'
            });
        } finally {
            loader.close();
        }
    });
}

if (facebookBtn) {
    facebookBtn.addEventListener('click', async function() {
        const loader = Swal.fire({
            title: 'Redirecting to Facebook',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading()
        });
        
        try {
            
            console.log('Facebook login clicked');
            // window.location.href = `${API_BASE_URL}/auth/facebook`;
            
            await Swal.fire({
                icon: 'info',
                title: 'Coming Soon',
                text: 'Facebook login will be available soon',
                confirmButtonColor: '#3085d6'
            });
        } finally {
            loader.close();
        }
    });
}
