

export function setRandomImageBackground() {
  fetchRandomImageUrl().then(url => document.body.style.backgroundImage = 'url(' + url + ')')
}

function fetchRandomImageUrl() {
  return fetch('https://source.unsplash.com/random')
    .then(response => response.url);
}
