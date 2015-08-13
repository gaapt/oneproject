Template.groupPage.helpers({
	comments: function() {
		return Comments.find({pageId: this._id});
	},
	todos: function() {
		return Todos.find({groupId: this._id}, {sort: {checked: false, duedate: 1}});
	}
})