
// Manage Users
Template.manageUsers.helpers({
	allUsers: function() {
		return Meteor.users.find();
	}
});

Template.manageUsers.rendered = function() {
	// http://davidstutz.github.io/bootstrap-multiselect/
	$('.user-roles').multiselect({
		buttonClass: "btn btn-sm btn-off-white",
		numberDisplayed: 1
	});
}

Template.manageUsers.events({
	'change input': function(e){

		var cb   	= $(e.target),
			cbs 	= cb.closest(".btn-group").find("input[type=checkbox]"),
			roles 	= [],
			userId 	= cb.closest(".btn-group").prev().data("id");


		cbs.each(function(){
			if ( $(this).is(':checked') ) {
				roles.push($(this).val());
			}
		});

		// Roles.updateRoles(userId, roles);
		Meteor.call('updateRoles', userId, roles, function(error, result){
			// display error to the user
			if (error)
				Errors.throw(error.reason);
		});

	}
});



// Manage a single user
Template.manageSingleUser.helpers({
	allRoles: function() {
		return Roles.getAllRoles();
	},
	isChecked: function(role, user) {
		// note that .. refers to the parent data context
		// https://www.discovermeteor.com/blog/a-guide-to-meteor-templates-data-contexts/
		return Roles.userIsInRole( user, role );
	}
});

