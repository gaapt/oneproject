Template.groupSubmit.created = function() {
	Session.set('groupSubmitErrors', {});
}


Template.groupSubmit.helpers({
	errorMessage: function(field) {
		return Session.get('groupSubmitErrors')[field];
	},

	errorClass: function(field) {
		return !!Session.get('groupSubmitErrors')[field] ? 'has-error' : '';
	},
});


Template.groupSubmit.events({
	'submit form': function(e){
		e.preventDefault();

		var group = {
			title: 			$(e.target).find('[name=title]').val(),
			duedate: 		new Date( $(e.target).find('[name=duedate]').val() ),
			description: 	$(e.target).find('[name=description]').val()
		}

		var errors = validateGroups(group);
		if (errors.title || errors.duedate)
			return Session.set('groupSubmitErrors', errors);

		Meteor.call('groupInsert', group, function(error, result){
			// display error to the user
			if (error)
				Errors.throw(error.reason);
			
			Router.go('groupPage', {_id: result._id});
		});
		
	}
});


Template.groupSubmit.rendered = function() {

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

}