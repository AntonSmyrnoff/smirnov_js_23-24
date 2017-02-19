define(
	'modules/model',
	[],
	function() {

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
		    var editedArr = self.data.splice(index, 1, newItem); // берем сам элемент для редактирования и возвращаем его
		    return editedArr;
		  };
		};

		return Model;	
	}
);