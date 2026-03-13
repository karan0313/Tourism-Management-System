function openBookingForm(destination, state) {
    const modal = document.getElementById('bookingModal');
    document.getElementById('destination').value = destination;
    document.getElementById('state').value = state;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeBookingForm() {
    const modal = document.getElementById('bookingModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('bookingForm').reset();
}

window.onclick = function(event) {
    const modal = document.getElementById('bookingModal');
    if (event.target === modal) {
        closeBookingForm();
    }
}

function handleBookingSubmit(event) {
    event.preventDefault();
    
    const formData = {
        destination: document.getElementById('destination').value,
        state: document.getElementById('state').value,
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        travelDate: document.getElementById('travelDate').value,
        numPeople: document.getElementById('numPeople').value,
        message: document.getElementById('message').value
    };

 // Replace this in handleBookingSubmit:
fetch('http://localhost:3000/api/book', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
})
.then(response => {
  if (response.ok) {
    alert('Thank you for your booking request! We will contact you soon.');
    closeBookingForm();
  } else {
    alert('Failed to submit booking. Please try again.');
  }
})
.catch(error => {
  console.error('Error submitting booking:', error);
  alert('Error submitting booking. Please try again.');
});

}

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.destination-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    const today = new Date().toISOString().split('T')[0];
    document.getElementById('travelDate').setAttribute('min', today);
});
