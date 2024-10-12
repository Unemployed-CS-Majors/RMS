const loginBtn = document.getElementById('login-btn');
const signUpBtn = document.getElementById('signup-btn');
const formContainer = document.getElementById('form-container');
const title = document.getElementById('title');

async function handleLogin(e){
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try{
        const res = await axios.post('https://jsonplaceholder.typicode.com/posts', {
            email: email,
            password: password
        });
        console.log("test", res.data);
    }catch(err){
        console.error("test", err);
    }
}

async function handleSignUp(e){
    e.preventDefault();

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phone-number').value;
    const password = document.getElementById('password').value;

    try{
        const res = await axios.post('https://jsonplaceholder.typicode.com/posts', {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            phoneNumber: phoneNumber
        });
    }catch(err){
        console.error(err);
    }
}

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
    document.getElementById('auth-form').addEventListener('submit', handleLogin);
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
    document.getElementById('auth-form').addEventListener('submit', handleSignUp);
}

loginBtn.addEventListener('click', loginForm);
signUpBtn.addEventListener('click', signUpForm);

loginForm();