const form = document.getElementById('addForm');

const items = document.getElementById('items');

const filter = document.getElementById('filter');


form.addEventListener('submit', addItem);
items.addEventListener('click', removeItem);
filter.addEventListener('keyup', filterItems);

function addItem(e){

    e.preventDefault(); 
    //Get input value.
    var item = document.getElementById('item');

    //Create new element.
    var li = document.createElement('li');
    
    //Add element class.
    li.className = 'list-group-item';

    //Add delete button.
    const button = document.createElement('button');

    //Add class to button.
    button.className = 'btn btn-danger btn-sm float-right delete';

    //Add field input to new element.
    li.appendChild(document.createTextNode(item.value));

    //Add the X to the delete button.
    button.appendChild(document.createTextNode('X'));

    //Add the button to the new item.
    li.appendChild(button);

    //Add new element to the list.
    items.appendChild(li);

};

//Remove Item
function removeItem(e){
    if(e.target.classList.contains('delete')){
        if(confirm('You sure?')){
            var li = e.target.parentElement;
            items.removeChild(li);
        }
    }
};

//Filter Items
function filterItems(e){
    //Conver text to lowercase.
    var text = e.target.value.toLowerCase();
    //Get list.
    var itemlist = items.getElementsByTagName('li');

    Array.from(itemlist).forEach(function(e){
        var itemName = e.firstChild.textContent;
        if(itemName.toLowerCase().indexOf(text) != -1){
            e.style.display = 'block';
        } else{
            e.style.display = 'none';
        }
    });

};