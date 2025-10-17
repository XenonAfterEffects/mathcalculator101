// Wait for animations, then fade out and redirect
setTimeout(() => {
  const loader = document.getElementById('loader');
  loader.classList.add('fade-out');

  // Redirect after fade animation
  setTimeout(() => {
    window.location.href = "/mathcalculator2/Home/"; // Redirect to Home inside mathcalculator2
  }, 1800);
}, 4000);
