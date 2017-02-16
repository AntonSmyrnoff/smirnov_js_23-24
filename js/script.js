function Model() {
  var self = this;
  
  self.data = ['test 1', 'test 2', 'test 3'];
  
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

    self.fata.splice(index, 1);

    return self.data;
  };
};


function View(model) {
  var self - this;

  self.init = function () {
    var wrapper = tmpl( $('#wrapper-template').html());
    var $('body').html(wrapper);
    self.elements = {
      input: $('.item-value');
      addBtn: $('.item-add');
      listContainer: $('.item-list');         
    };
  };

  self.renderList = function (data) {

  };

  self.init();
};



function Controller() {

};


$(function () {

});



