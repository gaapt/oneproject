Template.notifications.helpers({
	notifications: function() {
		return Notifications.find({userId: Meteor.userId(), read: false});
	},
	notificationCount: function() {
		return Notifications.find({userId: Meteor.userId(), read: false}).count();
	}
});


Template.notificationItem.helpers({
	notificationTodoPath: function() {
		return Router.routes.todoPage.path({_id: this.todoId});
	}
});


Template.notificationItem.events({
	'click a': function() {
		Notifications.update(this._id, {$set: {read: true} });
	}
})