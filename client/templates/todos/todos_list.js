Template.todosList.helpers({
	todos: function() {
		return Todos.find({userId: Meteor.userId()}, {sort: {checked: false, duedate: 1}});
	}
});