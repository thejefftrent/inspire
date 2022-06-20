
//helper function to remove <p> tags that come with quotes
export function removeTags(s)
{
  let div = document.createElement("div")
  div.innerHTML = s
  return div.textContent || div.innerText || ""
}
