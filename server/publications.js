Meteor.publish('todos', function(){
	return Todos.find();
});

Meteor.publish('comments', function(todoId){
	check(todoId, String);
	return Comments.find({ pageId: todoId });
});

Meteor.publish('notifications', function() {
	return Notifications.find();
});


Meteor.publish('allUsers', function() {
	return Meteor.users.find({});
});


Meteor.publish(null, function(){
	return Meteor.roles.find();
});

Meteor.publish('groups', function(){
	return Groups.find();
})

Meteor.publish('clients', function(){
	return Clients.find();
});