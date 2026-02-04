const cardContainer = document.querySelector('.card-container');
const scrollSpeed = 2.5;

// scroll
const handleWheel = (e) => {
  if (e.deltaY !== 0 || e.deltaX !== 0) {
    e.preventDefault();
    cardContainer.scrollLeft += (e.deltaY + e.deltaX) * scrollSpeed / 1.15; 
  }
};

const modal = document.createElement('div');
modal.className = 'modal';
document.body.appendChild(modal);

// images
document.querySelectorAll('.card-img').forEach(img => {
  img.onclick = (e) => {
    e.stopPropagation();
    modal.innerHTML = `<img src="${img.src}" class="enlarged-img" alt="${img.alt}">`;
    modal.style.display = 'block';
  };
  img.ontap = (e) => {
    e.stopPropagation();
    modal.innerHTML = `<img src="${img.src}" class="enlarged-img" alt="${img.alt}" style="max-width: 90vw; max-height: 90vh; object-fit: contain;">`;
    modal.style.display = 'block';
  };
});

document.querySelectorAll('.card-imgRectangle').forEach(img => {
  const container = document.createElement('div');
  container.className = 'card-img-container';
  img.parentNode.insertBefore(container, img);
  container.appendChild(img);
  
  const zoomIcon = document.createElement('div');
  zoomIcon.className = 'zoom-indicator';
  zoomIcon.innerHTML = '🔍';
  container.appendChild(zoomIcon);

  img.onclick = (e) => {
    e.stopPropagation();
    modal.innerHTML = `<img src="${img.src}" class="enlarged-img" alt="${img.alt}" style="max-width: 90vw; max-height: 90vh; object-fit: contain;">`;
    modal.style.display = 'block';
  };
  img.ontap = (e) => {
    e.stopPropagation();
    modal.innerHTML = `<img src="${img.src}" class="enlarged-img" alt="${img.alt}" style="max-width: 90vw; max-height: 90vh; object-fit: contain;">`;
    modal.style.display = 'block';
  };
});

document.querySelectorAll('.card-img').forEach(img => {
  const container = document.createElement('div');
  container.className = 'oval-container';
  img.parentNode.insertBefore(container, img);
  container.appendChild(img);
  
  const zoomIcon = document.createElement('div');
  zoomIcon.className = 'zoom-indicator';
  zoomIcon.innerHTML = '🔍';
  container.appendChild(zoomIcon);
});

modal.onclick = () => modal.style.display = 'none';

window.addEventListener('wheel', handleWheel, { passive: false });

const emailLogo = document.getElementById('emailLogo');
const copyMessage = document.getElementById('copyMessage');

emailLogo.addEventListener('click', () => {
  const email = 'o.shaw01942@gmail.com';
  navigator.clipboard.writeText(email)
    .then(() => {
      copyMessage.textContent = 'Copied email to clipboard!';
      setTimeout(() => {
        copyMessage.textContent = '';
      }, 2000);
    })
    .catch((error) => {
      console.error('Failed to copy email:', error);
    });
});

// hover colours
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.card');
  const oohBabyText = document.querySelector('.oooh-baby-regular');
  const githubButton = document.querySelector('.github-button');
  let currentColor = null;

  cards.forEach(function(card) {
    card.addEventListener('mouseenter', function() {
      currentColor = getRandomColor();
      card.style.setProperty('--hover-color', currentColor);
      if (oohBabyText) {
        oohBabyText.style.color = currentColor;
      }
    });

    card.addEventListener('mouseleave', function() {
      currentColor = null;
      card.style.removeProperty('--hover-color');
      if (oohBabyText) {
        oohBabyText.style.color = '';
      }
    });
  });

  if (githubButton) {
    githubButton.addEventListener('mouseenter', function() {
      if (currentColor) {
        githubButton.style.setProperty('--hover-color', currentColor);
      }
    });

    githubButton.addEventListener('mouseleave', function() {
      githubButton.style.removeProperty('--hover-color');
    });
  }

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
});

// mobile
let touchStartX = 0;
let touchEndX = 0;

cardContainer.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

cardContainer.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeDistance = touchStartX - touchEndX;
  if (Math.abs(swipeDistance) > 50) {
    cardContainer.scrollLeft += swipeDistance;
  }
}

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    const content = card.querySelector('.card-content') || card.querySelector('.fixed-card-content');
    if (content) {
      content.style.display = content.style.display === 'block' ? 'none' : 'block';
    }
  });
});