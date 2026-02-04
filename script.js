document.getElementById('auth-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const isLoginMode = document.getElementById('submit-btn').textContent === "Log In";

    // 1. Secret Login - Redirects to Loading folder inside Main
    if (user === "Charlie" && pass === "5879") {
        localStorage.setItem('currentUser', 'Charlie');
        localStorage.setItem('redirectDestination', 'admin'); // Tell the loading page where to go next
        window.location.href = "Main/Loading/index.html"; 
        return;
    }

    // 2. Normal Users - Also redirects to Loading folder
    let users = JSON.parse(localStorage.getItem('skillSphereUsers')) || [];

    if (isLoginMode) {
        const foundUser = users.find(u => u.username === user && u.password === pass);
        if (foundUser) {
            localStorage.setItem('currentUser', user);
            window.location.href = "SkillSphere/index.html";
        } else {
            alert("Invalid credentials");
        }
    } else {
        // Sign up logic
        if (users.some(u => u.username === user)) {
            alert("Username taken");
        } else {
            users.push({ username: user, password: pass });
            localStorage.setItem('skillSphereUsers', JSON.stringify(users));
            alert("Account created! Now please log in.");
            location.reload();
        }
    }
});

// Toggle between Login and Join
document.getElementById('toggle-link').addEventListener('click', (e) => {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    const title = document.getElementById('form-title');
    const toggleText = document.getElementById('toggle-text');

    if (btn.textContent === "Log In") {
        title.textContent = "Create Account";
        btn.textContent = "Join SkillSphere";
        toggleText.innerHTML = 'Already have an account? <a href="#" onclick="location.reload()">Log in</a>';
    } else {
        title.textContent = "Sign in to SkillSphere";
        btn.textContent = "Log In";
        toggleText.innerHTML = 'Don\'t have an account? <a href="#" id="toggle-link">Join now</a>';
    }
    // ... (rest of your signup logic remains the same)
});

