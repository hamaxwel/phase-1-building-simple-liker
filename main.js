// Defining text characters for the empty and full hearts for later use.
const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

// Select all like elements
const likeElements = document.querySelectorAll('.like-glyph');

// Add event listeners to each like element
likeElements.forEach(likeGlyph => {
  likeGlyph.addEventListener('click', () => {
    const isFull = likeGlyph.textContent === FULL_HEART;

    // Call the server to mimic the like/unlike action
    mimicServerCall()
      .then(() => {
        // Toggle the heart's display based on its current state
        likeGlyph.textContent = isFull ? EMPTY_HEART : FULL_HEART;
        likeGlyph.classList.toggle('activated-heart', !isFull);
      })
      .catch(error => {
        // Show the error message in the modal
        document.getElementById('modal-message').textContent = error;
        document.getElementById('modal').classList.remove('hidden');
        
        // Optionally close the modal after a timeout
        setTimeout(() => {
          document.getElementById('modal').classList.add('hidden');
        }, 3000);
      });
  });
});


// //------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
// ------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}