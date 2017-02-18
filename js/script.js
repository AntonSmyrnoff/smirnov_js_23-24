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
  
  self.editItem = function (item, newItem) {
    var index = self.data.indexOf(item); //получаем индекс редактируемого элемента
    if (index==-1) {
      return
    };
    var editedItem = self.data.splice(index, 1, newItem); // берем сам элемент для редактирования и возвращаем его
    return editedItem;
  };

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
  view.elements.listContainer.on('click', '.item-show', editItem);

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
    $(this).hide();
    var input = $(this).siblings('.edit-item');
    input.val(item).show().select();
    input.keypress(function(e) { //ввод нового значения по нажатию Enter;
      if(e.keyCode==13) replaceItem()
   });
    input.focusout(replaceItem); // ввод нового значения по клику в любом месте вне инпута

      function replaceItem() {
        var newItem = input.val();
        model.editItem(item, newItem);
        view.renderList(model.data);
    }
  };
};

$(function () {
  var firstToDoList = ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'];
  var model = new Model(firstToDoList);
  var view = new View(model);
  var controller = new Controller(model, view);
});



