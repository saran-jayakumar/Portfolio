export function initContact() {
    const contactForm = document.getElementById('contact-form');
    const formSuccessMessage = document.getElementById('form-success');
    
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const submitBtnText = submitBtn.querySelector('span');
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        submitBtn.disabled = true;
        submitBtnText.textContent = 'Sending Message...';
        
        fetch("https://formsubmit.co/ajax/saranjayakumar22@gmail.com", {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                Name: name,
                Email: email,
                Subject: subject,
                Message: message
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.success === 'true' || data.success === true) {
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtnText.textContent = 'Send Message';
                
                formSuccessMessage.style.display = 'flex';
                formSuccessMessage.offsetHeight; // reflow
                formSuccessMessage.classList.add('active');
                
                setTimeout(() => {
                    formSuccessMessage.classList.remove('active');
                    setTimeout(() => {
                        formSuccessMessage.style.display = 'none';
                    }, 300);
                }, 5000);
            } else {
                submitBtn.disabled = false;
                submitBtnText.textContent = 'Send Message';
                alert(data.message || 'There was an issue sending your message. Please activate the form or try again.');
            }
        })
        .catch(error => {
            console.error('Error sending message:', error);
            submitBtn.disabled = false;
            submitBtnText.textContent = 'Send Message';
            alert('Oops! There was an issue sending your message. Please check if you have activated FormSubmit for your email, or contact me directly.');
        });
    });
}
