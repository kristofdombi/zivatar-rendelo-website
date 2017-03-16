const galleryImages = document.querySelectorAll('.gallery-img');

for (var i = 0; i < galleryImages.length; i++) {
  galleryImages[i].addEventListener('click', (e) => {
    e.target.classList.toggle('gallery-img--clicked');
  });
}
