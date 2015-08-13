Template.mainNav.helpers({
	username: function() {
		return Meteor.user().username;
	}
});

Template.mainNav.events({
	'click .signout': function(){
		Meteor.logout(function(){
			Router.go('signIn');
		});
	}
});