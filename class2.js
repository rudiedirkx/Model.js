
Class = function(methods, parents) {
	// Create class + native constructor
	var C = function() {
		if ( 'function' == typeof this.construct ) {
			this.construct.apply(this, arguments);
		}
	};

	// Add prototype
	if ( parents && parents[0] ) {
		C.prototype = Object.create(parents[0].prototype);

		// Add more methods
		for ( var i=1, L=parents.length; i<L; i++ ) {
			var parentMethods = parents[i].prototype;
			for ( var m in parentMethods ) {
				parentMethods.hasOwnProperty(m) && (C.prototype[m] = parentMethods[m]);
			}
		}
	}

	// Add methods
	for ( var m in methods ) {
		methods.hasOwnProperty(m) && (C.prototype[m] = methods[m]);
	}

	return C;
};
