Template.groupEdit.created = function() {
	Session.set('groupEditErrors', {});
}


Template.groupEdit.helpers({
	errorMessage: function(field) {
		return Session.get('groupEditErrors')[field];
	},

	errorClass: function(field) {
		return !!Session.get('groupEditErrors')[field] ? 'has-error' : '';
	},
});


Template.groupEdit.events({
	
	'submit form': function(e) {
		e.preventDefault();

		var currentGroupId = this._id;

		var groupProperties = {
			title: 			$(e.target).find('[name=title]').val(),
			duedate: 		new Date( $(e.target).find('[name=duedate]').val() ),
			description: 	$(e.target).find('[name=description]').val()
		}

		var errors = validateGroups(groupProperties);
		if (errors.title || errors.duedate)
			return Session.set('groupEditErrors', errors);

		Groups.update(currentGroupId, {$set: groupProperties}, function(error) {
			if (error) {
				// display the error to the user
				Errors.throw(error.reason);
			} else {
				Router.go('groupPage', {_id: currentGroupId});
			}
		});
	},

	'click .delete': function(e) {
		e.preventDefault();

		if (confirm("Delete this group?")) {
			var currentGroupId = this._id;
			Groups.remove(currentGroupId);
			Router.go('groupList');
		}
	}

});


Template.groupEdit.rendered = function() {

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