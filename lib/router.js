/* -------------------------------------------------------
 * Configure Routes
 * ------------------------------------------------------- */
 Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function() {
		return [ Meteor.subscribe('todos'), Meteor.subscribe('notifications'), Meteor.subscribe('groups') ];
	}
});



/* -------------------------------------------------------
 * Router Controllers
 * ------------------------------------------------------- */



/* -------------------------------------------------------
 * Application Routes
 * ------------------------------------------------------- */

// Todos
Router.route('/', {name: 'todosList'});

Router.route('/todos/submit', {
	name: 'todoSubmit',
	waitOn: function() {
		return Meteor.subscribe('allUsers');
	},
});

Router.route('/todos/:_id', {
	name: 'todoPage',
	waitOn: function() {
		return Meteor.subscribe('comments', this.params._id);
	},
	data: function() {
		return Todos.findOne(this.params._id);
	}
});

Router.route('/todos/edit/:_id', {
	name: 'todoEdit',
	waitOn: function() {
		return Meteor.subscribe('allUsers');
	},
	data: function() {
		return Todos.findOne(this.params._id);
	}
});


// Clients
Router.route('/clients', {
	name: 'clientsList',
	waitOn: function() {
		return Meteor.subscribe('clients');
	}
});

Router.route('/clients/submit', {
	name: 'clientSubmit',
	waitOn: function() {
		return Meteor.subscribe('allUsers');
	}
});

Router.route('/clients/edit/:_id', {
	name: 'clientEdit',
	waitOn: function() {
		return Meteor.subscribe('allUsers');
	},
	data: function() {
		return Clients.findOne(this.params._id);
	}
});


// Groups
Router.route('/groups', {name: 'groupsList'});

Router.route('/groups/submit', {
	name: 'groupSubmit',
});

Router.route('/groups/:_id', {
	name: 'groupPage',
	waitOn: function() {
		return [ Meteor.subscribe('comments', this.params._id), Meteor.subscribe('allUsers') ];
	},
	data: function() {
		return Groups.findOne(this.params._id);
	}
});

Router.route('/groups/edit/:_id', {
	name: 'groupEdit',
	data: function() {
		return Groups.findOne(this.params._id);
	}
});


// Accounts
Router.route('/profile', {
	name: 'profile',
	data: function() { return Meteor.user(); }
});

Router.route('/manage-users', {
	name: 'manageUsers',
	waitOn: function() {
		return Meteor.subscribe('allUsers');
	}
});

Router.route('/users', {
	name: 'usersList',
	waitOn: function() {
		return Meteor.subscribe('allUsers');
	}
});



/* -------------------------------------------------------
 * Account Routes
 * ------------------------------------------------------- */
AccountsTemplates.configureRoute('signIn', {
	name: 'signIn',
	path: '/signin',
	template: 'accountsSignIn',
	layoutTemplate: 'layout',
	redirect: '/profile',
});

AccountsTemplates.configureRoute('ensureSignedIn', {
    template: 'accountsSignIn',
    layoutTemplate: 'layout',
});



/* -------------------------------------------------------
 * Functions for onBeforeActions
 * ------------------------------------------------------- */
var requireLogin = function(){
	if (! Meteor.user()) {
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			this.render('accessDenied');
		}
	} else {
		this.next();
	}
}


Router.onBeforeAction(AccountsTemplates.ensureSignedIn, {
    except: ['signIn', 'signUp', 'forgotPassword']
});

Router.onBeforeAction('dataNotFound', {only: 'todoPage'});
Router.onBeforeAction(requireLogin, {only: 'todoSubmit'});