define(
	'modules/controller',
	[
		'jquery',
	],
	function() {
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

		return Controller;
	}
);