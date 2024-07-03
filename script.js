// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Fade-up animation for cards and milestones
function fadeUpAnimation() {
    const fadeUps = document.querySelectorAll('.fade-up');
    fadeUps.forEach(fadeUp => {
        if (isElementInViewport(fadeUp)) {
            fadeUp.classList.add('active');
        }
    });
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Trigger fade-up animation on scroll
document.addEventListener('scroll', function() {
    fadeUpAnimation();
});

// Initial check for fade-up elements on page load
fadeUpAnimation();
document.addEventListener('DOMContentLoaded', function() {
    var tracker = document.querySelector('.tracker');
    var timeline = document.querySelector('.timeline');
    var timelineSection = document.querySelector('.timeline-section');

    function moveTracker() {
        var timelineRect = timeline.getBoundingClientRect();
        var sectionRect = timelineSection.getBoundingClientRect();

        // Calculate the scroll progress within the timeline section
        var sectionTop = sectionRect.top + window.scrollY; // Top position of the section relative to the document
        var sectionBottom = sectionTop + sectionRect.height; // Bottom position of the section relative to the document
        var scrollPosition = window.scrollY + window.innerHeight; // Current scroll position

        // Ensure scroll position is within the timeline section range
        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            var scrollProgress = (scrollPosition - sectionTop) / (sectionBottom - sectionTop);
            var trackerPosition = scrollProgress * timelineRect.height;

            // Add an offset to move the tracker up
            var offset = -10; // Adjust this value as needed
            tracker.style.top = (trackerPosition + offset) + 'px';
        }
    }

    // Check the position of the tracker on scroll
    window.addEventListener('scroll', moveTracker);
    // Initial call to position tracker on load
    moveTracker();
});
document.addEventListener('DOMContentLoaded', function() {
    // Function to check if an element is in the viewport
    function isInViewport(element) {
        var rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to handle animations or loading of content based on viewport visibility
    function handleViewport() {
        var sections = document.querySelectorAll('.section'); // Adjust this selector based on your HTML structure
        sections.forEach(function(section) {
            if (isInViewport(section) && !section.classList.contains('loaded')) {
                section.classList.add('loaded'); // Add a class to mark it as loaded
                // Implement your animation or loading logic here
            }
        });
    }

    // Call handleViewport initially
    handleViewport();

    var customCursor = document.querySelector('.custom-cursor');
    
    // Function to position the custom cursor
    function moveCursor(e) {
        customCursor.style.left = e.clientX + 'px';
        customCursor.style.top = e.clientY + 'px';
    }

    // Function to activate custom cursor
    function activateCursor() {
        customCursor.classList.add('active');
    }

    // Function to deactivate custom cursor
    function deactivateCursor() {
        customCursor.classList.remove('active');
    }

    // Apply custom cursor to entire document
    document.addEventListener('mousemove', function(e) {
        moveCursor(e);
    });

    // Check background color and adjust cursor color accordingly
    function checkBackgroundColor() {
        var body = document.body;
        
        if (getComputedStyle(body).getPropertyValue('background-color') === 'rgb(255, 255, 255)') {
            body.classList.remove('dark-bg');
            body.classList.add('light-bg');
        } else {
            body.classList.remove('light-bg');
            body.classList.add('dark-bg');
        }

        // Trigger cursor color update on background change
        customCursor.classList.remove('active');
        setTimeout(function() {
            customCursor.classList.add('active');
        }, 10); // Adjust timing as needed
    }

    // Initial check and listen for changes in background color
    checkBackgroundColor();
    window.addEventListener('resize', checkBackgroundColor);
});