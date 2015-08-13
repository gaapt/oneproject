Template.todoPage.helpers({
	comments: function() {
		return Comments.find({pageId: this._id});
	}
})