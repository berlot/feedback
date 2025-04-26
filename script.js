document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const ratingSlider = document.getElementById('rating-slider');
    const ratingValue = document.getElementById('rating-value');
    const feedbackText = document.getElementById('feedback');
    const submitBtn = document.getElementById('submit-btn');
    const newFeedbackBtn = document.getElementById('new-feedback-btn');
    const feedbackForm = document.getElementById('feedback-form');
    const thankYouScreen = document.getElementById('thank-you');
    
    // ID dla rozróżnienia sesji użytkownika
    const sessionId = generateSessionId();
    
    // Update rating value when slider changes
    ratingSlider.addEventListener('input', () => {
        ratingValue.textContent = ratingSlider.value;
        
        // Add visual feedback with color change based on rating
        const rating = parseInt(ratingSlider.value);
        if (rating >= 8) {
            ratingValue.style.color = 'var(--success)';
        } else if (rating >= 5) {
            ratingValue.style.color = 'var(--primary-light)';
        } else if (rating >= 3) {
            ratingValue.style.color = 'var(--secondary)';
        } else {
            ratingValue.style.color = 'var(--error)';
        }
    });
    
    // Submit feedback
    submitBtn.addEventListener('click', () => {
        const rating = ratingSlider.value;
        const feedback = feedbackText.value.trim();
        
        if (feedback === '') {
            // Add simple validation with shake animation
            feedbackText.classList.add('shake');
            setTimeout(() => {
                feedbackText.classList.remove('shake');
            }, 500);
            return;
        }
        
        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Wysyłanie...';
        submitBtn.classList.remove('pulse');
        
        // Create feedback object
        const feedbackObject = {
            sessionId: sessionId,
            rating: rating,
            feedback: feedback,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        };
        
        // Send feedback to the API
        sendFeedback(feedbackObject).then(() => {
            // Show thank you screen with animation after successful submission
            feedbackForm.style.animation = 'fadeOut 0.5s forwards';
            setTimeout(() => {
                feedbackForm.classList.add('hidden');
                thankYouScreen.classList.remove('hidden');
                thankYouScreen.style.animation = 'fadeIn 0.5s forwards';
            }, 500);
        }).catch(error => {
            console.error('Error sending feedback:', error);
            alert('Wystąpił błąd podczas wysyłania opinii. Spróbuj ponownie.');
            
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Wyślij opinię';
            submitBtn.classList.add('pulse');
        });
    });
    
    // Add new feedback option
    newFeedbackBtn.addEventListener('click', () => {
        // Reset form
        ratingSlider.value = 7;
        ratingValue.textContent = 7;
        ratingValue.style.color = 'var(--primary-light)';
        feedbackText.value = '';
        
        // Reset submit button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Wyślij opinię';
        submitBtn.classList.add('pulse');
        
        // Switch back to feedback form with animation
        thankYouScreen.style.animation = 'fadeOut 0.5s forwards';
        setTimeout(() => {
            thankYouScreen.classList.add('hidden');
            feedbackForm.classList.remove('hidden');
            feedbackForm.style.animation = 'fadeIn 0.5s forwards';
        }, 500);
    });
    
    // Funkcja generująca unikalny identyfikator sesji
    function generateSessionId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    
    // Funkcja wysyłająca dane do zewnętrznego API (Google Sheets)
    async function sendFeedback(data) {
        // Tu będzie URL do twojego API (Google Sheet Web App URL)
        const apiUrl = 'https://script.google.com/macros/s/AKfycbwk3uyER1XFvtirdiNWf3vwZq5ggYS0GVfs6lWV0xrwdWFk92igtq8p46kWCBaedFj81Q/exec';
        
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                mode: 'no-cors', // Ważne dla Cross-Origin
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            return true; // Zakładamy, że wysłanie się powiodło z no-cors
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
    
    // Add animation styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-20px); }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-10px); }
            40%, 80% { transform: translateX(10px); }
        }
        
        .shake {
            animation: shake 0.5s;
        }
    `;
    document.head.appendChild(style);
}); 