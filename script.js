document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const ratingSlider = document.getElementById('rating-slider');
    const ratingValue = document.getElementById('rating-value');
    const feedbackText = document.getElementById('feedback');
    const submitBtn = document.getElementById('submit-btn');
    const newFeedbackBtn = document.getElementById('new-feedback-btn');
    const feedbackForm = document.getElementById('feedback-form');
    const thankYouScreen = document.getElementById('thank-you');
    
    // Feedback storage array
    let feedbackData = [];
    
    // Load any existing feedback data
    loadFeedbackData();
    
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
        
        // Create feedback object
        const feedbackObject = {
            rating: rating,
            feedback: feedback,
            timestamp: new Date().toISOString()
        };
        
        // Add to storage array
        feedbackData.push(feedbackObject);
        
        // Save feedback data
        saveFeedbackData();
        
        // Show thank you screen with animation
        feedbackForm.style.animation = 'fadeOut 0.5s forwards';
        setTimeout(() => {
            feedbackForm.classList.add('hidden');
            thankYouScreen.classList.remove('hidden');
            thankYouScreen.style.animation = 'fadeIn 0.5s forwards';
        }, 500);
    });
    
    // Add new feedback option
    newFeedbackBtn.addEventListener('click', () => {
        // Reset form
        ratingSlider.value = 7;
        ratingValue.textContent = 7;
        ratingValue.style.color = 'var(--primary-light)';
        feedbackText.value = '';
        
        // Switch back to feedback form with animation
        thankYouScreen.style.animation = 'fadeOut 0.5s forwards';
        setTimeout(() => {
            thankYouScreen.classList.add('hidden');
            feedbackForm.classList.remove('hidden');
            feedbackForm.style.animation = 'fadeIn 0.5s forwards';
        }, 500);
    });
    
    // Function to save feedback data to local storage
    function saveFeedbackData() {
        localStorage.setItem('feedbackData', JSON.stringify(feedbackData));
        
        // Also save to downloadable file
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(feedbackData, null, 2));
        
        // Create download link
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "feedback_data.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }
    
    // Function to load feedback data from local storage
    function loadFeedbackData() {
        const storedData = localStorage.getItem('feedbackData');
        if (storedData) {
            feedbackData = JSON.parse(storedData);
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