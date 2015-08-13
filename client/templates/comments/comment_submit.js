Template.commentSubmit.created = function() {
	Session.set('commentSubmitErrors', {});
}


Template.commentSubmit.helpers({
	errorMessage: function(field) {
		return Session.get('commentSubmitErrors')[field];
	},
	errorClass: function(field) {
		return !! Session.get('commentSubmitErrors')[field] ? 'has-error' : '';
	}
});


Template.commentSubmit.events({
	'submit form': function(e, template) {
		e.preventDefault();

		// find what kind of page we are on
		var pageType = window.location.pathname.split( '/' )[1];

		var $body = $(e.target).find('[name=body]');
		var comment = {
			body: $body.val(),
			pageId: template.data._id
		};

		var errors = {};
		if (! comment.body) {
			errors.body = "Please write a comment";
			return Session.set('commentSubmitErrors', errors);
		}

		Meteor.call('commentInsert', comment, pageType, function(error, commentId) {
			if (error) {
				throwError(error.reason);
			} else {
				$body.val('');
			}
		});
		
	}
});