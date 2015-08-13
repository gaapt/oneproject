if (Todos.find().count() === 0) {
	var now = new Date().getTime();

	// create two users
	var mattId = Accounts.createUser({
		email: 'user1@user1.com',
		password: 'user1user1',
		profile: {
			name: 'User One',
			avatar: '/uploads/profile-images/default.jpg',
			todosCount: 3,
		},
		username: 'userone'
	});
	var matt = Meteor.users.findOne(mattId);

	var kelseyId = Accounts.createUser({
		email: 'user2@user2.com',
		password: 'user2user2',
		profile: {
			name: 'User Two',
			avatar: '/uploads/profile-images/default.jpg',
			todosCount: 0,
		},
		username: 'usertwo'
	});
	var kelsey = Meteor.users.findOne(kelseyId);


	// create admin roles
	Roles.addUsersToRoles([mattId, kelseyId], ['super-admin']);


	// create all other roles
	Roles.createRole("admin");
	Roles.createRole("designer");
	Roles.createRole("management");
	Roles.createRole("project-manager");
	Roles.createRole("web-developer");


	// create clients
	var clientOne = Clients.insert({
		title: 'Switch Client',
		logo: '/uploads/client-images/Square-01.jpg',
		pmId: kelsey._id,
		pm: kelsey.profile.name,
		submitted: new Date(now - 5 * 3600 * 1000),
		groupCount: 2
	});


	// create groups
	var groupOneId = Groups.insert({
		title: 'Jobs for Morning Time',
		userId: matt._id,
		author: matt.profile.name,
		description: "Modo typi qui nunc nobis videntur parum clari fiant sollemnes in. Vel eum iriure dolor in hendrerit in vulputate.",
		submitted: new Date(now - 5 * 3600 * 1000),
		todosCount: 3,
		commentCount: 0,
	});

	Groups.insert({
		title: 'Switch Todos',
		userId: kelsey._id,
		author: kelsey.profile.name,
		description: "Modo typi qui nunc nobis videntur parum clari fiant sollemnes in. Vel eum iriure dolor in hendrerit in vulputate.",
		client: clientOne._id,
		submitted: new Date(now - 5 * 3600 * 1000),
		todosCount: 0,
		commentCount: 0,
	});


	// create some Todos
	var oneId = Todos.insert({
		title: 'Create HTML',
		authorId: matt._id,
		author: matt.profile.name,
		userId: matt._id,
		user: matt.profile.name,
		groupId: groupOneId,
		group: 'Jobs for Morning Time',
		submitted: new Date(now - 5 * 3600 * 1000),
		duedate: new Date(now + 8 * 3600 * 1000),
		description: "Est notare quam littera gothica quam nunc putamus parum claram. Per seacula quarta decima et quinta decima eodem modo? Nostrud exerci tation ullamcorper suscipit lobortis nisl ut. Est usus legentis in, iis qui facit eorum claritatem Investigationes demonstraverunt lectores legere me!",
		commentCount: 3,
		checked: false
	});

	Comments.insert({
		pageId: oneId,
		userId: matt._id,
		author: matt.profile.name,
		submitted: new Date(now - 4 * 3600 * 1000),
		body: "I have a question."
	});

	Comments.insert({
		pageId: oneId,
		userId: kelsey._id,
		author: kelsey.profile.name,
		submitted: new Date(now - 3 * 3600 * 1000),
		body: "Here is your answer."
	});

	Comments.insert({
		pageId: oneId,
		userId: matt._id,
		author: matt.profile.name,
		submitted: new Date(now - 2 * 3600 * 1000),
		body: "Awesome thank you."
	});


	Todos.insert({
		title: 'Create CSS',
		authorId: matt._id,
		author: matt.profile.name,
		userId: matt._id,
		user: matt.profile.name,
		groupId: groupOneId,
		group: 'Jobs for Morning Time',
		submitted: new Date(now - 5 * 3600 * 1000),
		duedate: new Date(now + 9 * 3600 * 1000),
		description: "Est notare quam littera gothica quam nunc putamus parum claram. Per seacula quarta decima et quinta decima eodem modo? Nostrud exerci tation ullamcorper suscipit lobortis nisl ut. Est usus legentis in, iis qui facit eorum claritatem Investigationes demonstraverunt lectores legere me!",
		commentCount: 0,
		checked: false
	});

	Todos.insert({
		title: 'Create CSS',
		authorId: matt._id,
		author: matt.profile.name,
		userId: matt._id,
		user: matt.profile.name,
		groupId: groupOneId,
		group: 'Jobs for Morning Time',
		submitted: new Date(now - 5 * 3600 * 1000),
		duedate: new Date(now + 10 * 3600 * 1000),
		description: "Est notare quam littera gothica quam nunc putamus parum claram. Per seacula quarta decima et quinta decima eodem modo? Nostrud exerci tation ullamcorper suscipit lobortis nisl ut. Est usus legentis in, iis qui facit eorum claritatem Investigationes demonstraverunt lectores legere me!",
		commentCount: 0,
		checked: false
	});



}










