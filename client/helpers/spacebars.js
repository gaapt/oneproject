UI.registerHelper('displayFormat', function(date){
	// use .toISOString() because of reasons
	// https://github.com/moment/moment/issues/1407
	var string = date.toISOString();
	return moment(string).calendar();
});

UI.registerHelper('deslug', function(string){
	// change case and remove dashes
	return string.replace('-', ' ').replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
});

UI.registerHelper('isItMe', function(string){
	return (Meteor.user().profile.name === string) ? 'Me' : string;
});
