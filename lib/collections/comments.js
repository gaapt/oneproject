Comments = new Mongo.Collection('comments');

Meteor.methods({
	commentInsert: function(commentAttributes, pageType) {
		check(this.userId, String);
		check(commentAttributes, {
			pageId: String,
			body: String
		});

		var user = Meteor.user();

		switch(pageType) {
		
			case "todos":
				var todo = Todos.findOne(commentAttributes.pageId);
				if (!todo)
					throw new Meteor.Error('invalid-comment', 'You must comment on a project');
				break;

			case "groups":
				var group = Groups.findOne(commentAttributes.pageId);
				if (!group)
					throw new Meteor.Error('invalid-comment', 'You must comment on a team');
				break;

			default:
				throw new Meteor.Error('invalid-comment', 'You must comment on an acceptable page.');
				break;

		}


		comment = _.extend(commentAttributes, {
			userId: user._id,
			author: user.profile.name,
			submitted: new Date(),
		});


		// update the correct number of comments
		switch(pageType) {

			case "todos":
				Todos.update(comment.pageId, { $inc: {commentCount: 1} });
				break;

			case "groups":
				Groups.update(comment.pageId, { $inc: {commentCount: 1} });
				break;
		}

		// create the comment, save the id
		comment._id = Comments.insert(comment);

		// now create a notification, informing the user that there's been a comment
		// NOTE: Fix later.
		createCommentNotification(comment);

		return comment._id;

	}
})