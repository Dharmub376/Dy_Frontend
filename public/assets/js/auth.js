document.addEventListener('DOMContentLoaded', function () {
    const toggleLink = document.getElementById('toggle-link');
    const formTitle = document.getElementById('form-title');
    const extraFields = document.getElementById('extra-fields');
    const confirmPasswordGroup = document.getElementById('confirm-password-group');
    const authForm = document.getElementById('auth-form');
    const submitBtn = document.getElementById('submit-btn');
    const signInBtn = document.getElementById('sign-in-btn');
    const userInfo = document.getElementById('user-info');
    const usernameDisplay = document.getElementById('username');
    const profilePicture = document.getElementById('profile-picture');
    const signInBtnContainer = document.getElementById('sign-in-btn-container');

    // Toggle between Sign In and Sign Up form
    toggleLink.addEventListener('click', function (e) {
        e.preventDefault();
        if (toggleLink.textContent.includes('Sign up')) {
            formTitle.textContent = 'Create an Account';
            extraFields.style.display = 'block';
            confirmPasswordGroup.style.display = 'block';
            submitBtn.textContent = 'Sign Up';
            authForm.action = '/api/auth/signup';
            toggleLink.textContent = 'Already have an account? Sign in';
        } else {
            formTitle.textContent = 'Join With Us';
            extraFields.style.display = 'none';
            confirmPasswordGroup.style.display = 'none';
            submitBtn.textContent = 'Sign In';
            authForm.action = '/api/auth/login';
            toggleLink.textContent = 'Don\'t have an account? Sign up';
        }
    });

    // Handle form submission
    authForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const formData = new FormData(authForm);
        const data = Object.fromEntries(formData);
        const response = await fetch(authForm.action, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        if (response.ok) {
            alert(result.msg || 'Success');
            localStorage.setItem('token', result.token);
            await fetchUserInfo(result.token);
        } else {
            alert(result.msg || 'Error');
        }
    });

    // Fetch user info
    async function fetchUserInfo(token) {
        const response = await fetch('/api/auth/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const user = await response.json();
        if (response.ok) {
            usernameDisplay.textContent = user.username;
            profilePicture.src = user.profilePicture || 'assets/img/default-profile.png';
            userInfo.style.display = 'flex';
            signInBtnContainer.style.display = 'none';
        }
    }

    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
        fetchUserInfo(token);
    }
});