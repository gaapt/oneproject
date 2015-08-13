Template.groupsList.helpers({
	groups: Groups.find({}, {sort: {title: 1}})
});