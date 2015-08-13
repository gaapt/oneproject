Template.todoEdit.created = function() {
	Session.set('todoEditErrors', {});
}


Template.todoEdit.helpers({
	errorMessage: function(field) {
		return Session.get('todoEditErrors')[field];
	},

	errorClass: function(field) {
		return !!Session.get('todoEditErrors')[field] ? 'has-error' : '';
	},

	groups: function() {
		return Groups.find();
	},

	allUsers: function() {
		return Meteor.users.find({});
	},

	isCurrentUser: function(userId, todo) {
		return userId === todo.userId;
	},

	isCurrentGroup: function(groupId, todo) {
		return groupId === todo.groupId;
	}
});


Template.todoEdit.events({
	
	'submit form': function(e) {
		e.preventDefault();

		var currentTodoId = this._id;

		var todoProperties = {
			title: 			$(e.target).find('[name=title]').val(),
			duedate: 		new Date( $(e.target).find('[name=duedate]').val() ),
			description: 	$(e.target).find('[name=description]').val(),
			userId: 		$(e.target).find('#user-select').val(),
			user: 			$(e.target).find('#user-select option:selected').text(),
			groupId: 		$(e.target).find('#group-select').val(),
			group: 			$(e.target).find('#group-select option:selected').text(),
		}

		var errors = validateTodos(todoProperties);
		if (errors.title || errors.duedate)
			return Session.set('todoEditErrors', errors);

		Todos.update(currentTodoId, {$set: todoProperties}, function(error) {
			if (error) {
				// display the error to the user
				Errors.throw(error.reason);
			} else {
				Router.go('todoPage', {_id: currentTodoId});
			}
		});
	},

	'click .delete': function(e) {
		e.preventDefault();

		if (confirm("Delete this todo?")) {
			var currentTodoId = this._id;
			Todos.remove(currentTodoId);
			Router.go('todoList');
		}
	}

});


Template.todoEdit.rendered = function() {

	// http://eonasdan.github.io/bootstrap-datetimepicker/#options
	$('#duedate').datetimepicker({
		pickDate: 		true,					// en/disables the date picker
		pickTime: 		true,					// en/disables the time picker
		useMinutes: 	true,					// en/disables the minutes picker
		useSeconds: 	false,					// en/disables the seconds picker
		useCurrent: 	false,					// when true, picker will set the value to the current date/time
		minuteStepping: 30, 					// set the minute stepping
    	minDate: 		moment().format('L'),	// set a minimum date
    	showToday: 		true,					// shows the today indicator
    	sideBySide: 	true, 					// show the date and time picker side by side
	});

	// set the due date to the current duedate
	$("#duedate").data("DateTimePicker").setDate(this.data.duedate);

	$('#group-select, #user-select').multiselect({
		buttonClass: "btn btn-sm btn-off-white",
		numberDisplayed: 1
	});

}