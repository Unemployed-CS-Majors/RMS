const loginBtn = document.getElementById('login-btn');
const signUpBtn = document.getElementById('signup-btn');
const formContainer = document.getElementById('form-container');
const title = document.getElementById('title');



function loginForm(){
    formContainer.innerHTML = `
        <form id="auth-form">
            <input type="email" id="email" placeholder="Enter Email" required>
            <input type="password" id="password" placeholder="Enter Password" required>
            <span id="forgot-pass-txt">Forgot Password?</span>
            <button type="submit" id="submit-btn">Log In</button>
        </form>
    `;
    title.textContent = 'Log In';
}

function signUpForm(){
    formContainer.innerHTML = `
        <form id="auth-form">
            <div class="name-container">
                <input type="text" id="first-name" placeholder="First Name" required>
                <input type="text" id="last-name" placeholder="Last Name" required>
            </div>
            <input type="email" id="email" placeholder="Enter Email" required>
            <input type="text" id="phone-number" placeholder="Enter Phone Number" required>
            <input type="password" id="password" placeholder="Enter Password" required>
            <input type="password" id="confirm-password" placeholder="Confirm Password" required>
            <button type="submit" id="submit-btn">Sign Up</button>
        </form>
    `
    title.textContent = 'Sign Up';
}

loginBtn.addEventListener('click', loginForm);
signUpBtn.addEventListener('click', signUpForm);

loginForm();