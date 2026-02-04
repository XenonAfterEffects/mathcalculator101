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
            localStorage.setItem('redirectDestination', 'student'); // Tell the loading page where to go next
            window.location.href = "Main/Loading/index.html";
        } else {
            alert("Invalid credentials");
        }
    } 
    // ... (rest of your signup logic remains the same)
});
