function Model(data) {
  var self = this;
  
  self.data = data;
  
  self.addItem = function (item) {
     if (item.length == 0) {
      return;
     } 

    self.data.push(item);

    return self.data;
  };

  
  self.removeItem = function (item) {
    var index = self.data.indexOf(item);

    if (index == -1) {
      return;
    }

    self.data.splice(index, 1);

    return self.data;
  };

  
  self.editItem = function (item) {
    var index = self.data.indexOf(item); //получаем индекс редактируемого элемента

    var editedItem = self.data.slice(index, index+1); // берем сам элемент для редактирования и возвращаем его

    return editedItem;
  };

  
  self.replaceEditedItem = function (item, index) {
    if (item.length == 0) {
      return;
    }

    self.data.splice(index, 1, item);
    console.log('itemIndex in Model: ', index);
    console.log('');
    return self.data;

  }
};


function View(model) {
  var self = this;

  function init () {
    var wrapper = tmpl( $('#wrapper-template').html());
    
    $('body').append(wrapper);
    self.elements = {
      input: $('.item-value'),
      addBtn: $('.item-add'),
      listContainer: $('.item-list'),         
    };

    self.renderList(model.data);
  };

  self.renderList = function (data) {
    var list = tmpl( $('#list-template').html(), {data: data} );
    self.elements.listContainer.html(list);
  };

  init();
};



function Controller(model, view) {
  var self = this;
  view.elements.addBtn.on('click', addItem);
  view.elements.listContainer.on('click', '.item-delete', removeItem);
  view.elements.listContainer.on('click', '.item-edit', editItem);

  function addItem() {
    if( !$(this).hasClass('item-add') )
      return;
    var newItem = view.elements.input.val();
    model.addItem(newItem);
    view.renderList(model.data);
    view.elements.input.val('');
  };

  function removeItem() {
    var item = $(this).attr('data-value');
    model.removeItem(item);
    view.renderList(model.data);
  };

  
  function editItem() {
    var item = $(this).attr('data-value'); // получаем значение, которое нужно найти в массиве
    var itemIndex = $('.item-edit').index(this); // получаем индекс этого значения в массиве
    var editItem = $('.item-show').eq(itemIndex).html();
    console.log('itemIndex in editItem: ', itemIndex);
    console.log(editItem);
    var editedItem = model.editItem(item); // ищем полученное значение в массиве 

    view.elements.input.val(editedItem); // отправляем полученное значение в инпут для редактирования

    $('.item-add').addClass('item-change').removeClass('item-add').html('Edit'); // меняем класс и внутренность кнопки
    $('.item-change').on('click', replaceItem);
      
      function replaceItem() {
        if( !$(this).hasClass('item-change') )
          return;
        console.log('itemIndex in replaceItem: ', itemIndex)
        
        var newItem = view.elements.input.val(); // записываем новое содержимое инпута в переменную
        model.replaceEditedItem(newItem, itemIndex); // передаем в модель новое содержимое и индекс изменяемого элемента
        view.renderList(model.data); //рендерим
        view.elements.input.val('');


        $(this).addClass('item-add').removeClass('item-change').html('Add'); //возвращаем кнопке первоначальный вид
      };
  };




};


$(function () {
  var firstToDoList = ['0', '1', '2'];
  var model = new Model(firstToDoList);
  console.log(model);

  var view = new View(model);
  console.log(view);

  var controller = new Controller(model, view);
  console.log(controller);
});



