Template.todosList.helpers({
	todos: Todos.find({}, {sort: {title: 1}})
});