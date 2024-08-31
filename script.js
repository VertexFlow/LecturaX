document.querySelectorAll('.dropdown-content a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
  
      if (targetElement) {
        // Find the .courses container
        const coursesContainer = document.querySelector('.courses');
  
        // Get the last .box element before the target heading
        let lastBox = targetElement.previousElementSibling;
        while (lastBox && !lastBox.classList.contains('box')) {
          lastBox = lastBox.previousElementSibling;
        }
  
        // Calculate the end position of the last .box element
        const lastBoxBottom = lastBox ? lastBox.offsetTop + lastBox.offsetHeight : 0;
  
        // Scroll to just below the last .box element
        coursesContainer.scrollTo({
          top: lastBoxBottom,
          behavior: 'smooth'
        });
      } else {
        console.error('Target element not found for ID:', targetId);
      }
    });
  });
  