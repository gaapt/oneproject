Template.todoItem.helpers({
	ownTodo: function() {
		return this.userId === Meteor.userId();
	},
	editAttr: function() {
		if (this.checked) {
			return {
				class: 'btn btn-off-white btn-sm disabled',
			}
		} else {
			return {
				class: 'btn btn-off-white btn-sm'
			}
		}
	}
});

Template.todoItem.events({
	'click input[name=todoCheck]': function(e) {
		var todoId 	= this._id;
			checked = $(e.target).is(':checked');
		Meteor.call('todoSetChecked', todoId, checked);
	}
})