Clients = new Mongo.Collection('clients');

Clients.allow({
	update: function(userId, todo) { return ownsDocument(userId, todo); },
	remove: function(userId, todo) { return ownsDocument(userId, todo); }
});

Clients.deny({
	update: function(userId, todo, fieldNames, modifier) {
		
		return ( _.without(fieldNames, 'title', 'pmId', 'pm').length > 0 );
	}
});

Meteor.methods({
	clientInsert: function(clientAttributes){

		check(Meteor.userId(), String);
		check(clientAttributes, {
			title: String,
			pmId: String,
			pm: String,
		});

		var errors = validateTodos(clientAttributes);
		if (errors.title)
			throw new Meteor.Error('invalid-post', "You must set a name for your Customer");

		var user = Meteor.user();

		var client = _.extend(clientAttributes, {
			authorId: user._id,
			author: user.profile.name,
			submitted: new Date(),
			groupCount: 0,
			logo: 'uploads/profile-images/default.jpg'
		});

		var clientId = Clients.insert(client);

		return {
			_id: clientId
		};

	}
});

validateClient = function (client) {
	var errors = {};
	if (!client.title)
		errors.title = "Please fill in a Customer Name";
	return errors;
}