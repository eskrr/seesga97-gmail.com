function searchVideo(event) {
  item_name = document.getElementById('input_text').value;
  // item_template = document.getElementById('item_template').content.cloneNode(true);
  // item_template.querySelector('.item-name').innerText = item_name;

  // items = document.getElementById('items');
  // items.appendChild(item_template);

  // new_item = items.children[items.children.length - 1];
  // new_item.getElementsByClassName('delete')[0].addEventListener('click', deleteItem);
  // new_item.getElementsByClassName('check')[0].addEventListener('click', checkItem);
}

window.addEventListener('load', function(event) {
  document.getElementById('search').addEventListener('click', searchVideo);
});