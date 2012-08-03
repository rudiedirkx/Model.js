
(function() {

	function each(source, callback) {
		for ( var key in source ) {
			if ( source.hasOwnProperty(key) ) {
				callback(source[key], key, source);
			}
		}
	}

	Model = function(data) {
		var self = this;

		this.fill(data);
		this.getters.forEach(function(name) {
			self.__defineGetter__(name, function() {
				return self._cache[name] || (self._cache[name] = self['get' + name.replace(/^(\w)/, function(m) {
					return m.toUpperCase();
				})]());
			});
		});
	}

	Model.extend(null, {
		getters: [],
		_cache: {},
		fill: function(data) {
			var self = this;

			data && each(data, function(v, k) {
				self[k] = v;
			});
		}
	});

})();
