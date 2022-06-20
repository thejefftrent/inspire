import {removeTags} from "./util.js"

let totalQuotes = 100

export function updateRandomQuote() {
  fetchRandomQuote().then(function(quote) {
    document.getElementById("quote-text").innerHTML = removeTags(quote.content)
    document.getElementById("quote-author").innerHTML = quote.author
  })
}

function fetchRandomQuote() {
  let req = fetch('https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand&per_page=1&offset=' + Math.floor(Math.random() * totalQuotes))
  req.then(res => totalQuotes = res.headers.get("x-wp-total"))
  return req.then(response => response.json())
    .then(function(data) {
      return {
        author: data[0].title.rendered,
        content: data[0].content.rendered
      }
    })
}
