Groups = new Mongo.Collection('groups');

Groups.allow({
	update: function(userId, group) { return ownsDocument(userId, group); },
	remove: function(userId, group) { return ownsDocument(userId, group); }
});

Groups.deny({
	update: function(userId, group, fieldNames, modifier) {
		// may only edit the following fields
		return ( _.without(fieldNames, 'title', 'duedate', 'description').length > 0 );
	}
});

Meteor.methods({
	groupInsert: function(groupAttributes){
		
		check(Meteor.userId(), String);
		check(groupAttributes, {
			title: String,
			duedate: Date,
			description: String
		});

		var errors = validateGroups(groupAttributes);
		if (errors.title || errors.duedate)
			throw new Meteor.Error('invalid-post', "You must set a title and due date for your Group");

		var user = Meteor.user();

		var group = _.extend(groupAttributes, {
			authorId: user._id,
			author: user.profile.name,
			submitted: new Date(),
			commentCount: 0,
			todosCount: 0
		});

		var groupId = Groups.insert(group);

		return { 
			_id: groupId 
		};
	
	}
});


validateGroups = function (group) {
	var errors = {};
	if (!group.title)
		errors.title = "Please fill in a Group Title or no Fireball for you!";
	if (!group.duedate)
		errors.duedate =  "Please fill in a Due Date or no Fireball for you!";
	return errors;
}