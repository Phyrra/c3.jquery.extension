(function() {
	if (typeof String.prototype.startsWith !== 'function') {
		String.prototype.startsWith = function(str) {
			return this.slice(0, str.length) === str;
		};
	}

	if (typeof String.prototype.endsWith !== 'function') {
		String.prototype.endsWith = function(str) {
			return this.slice(-str.length) === str;
		};
	}

	if (typeof String.prototype.trim !== 'function') {
		String.prototype.trim = function() {
			return this.replace(/^\s+|\s+$/g, '');
		};
	}

	if (typeof String.prototype.contains !== 'function') {
		String.prototype.contains = function(str) {
			return this.indexOf(str) !== -1;
		};
	}

	if (typeof Array.prototype.find !== 'function') {
		Array.prototype.find = function(callback) {
			if (typeof callback !== 'function') {
				return undefined;
			}

			for (var i = 0; i < this.length; ++i) {
				var el = this[i];

				if (callback(el)) {
					return el;
				}
			}

			return undefined;
		};
	}

	if (typeof Array.prototype.join !== 'function') {
		Array.prototype.join = function(glue) {
			if (typeof glue === 'undefined') {
				glue = ',';
			}

			var joined = '';

			for (var i = 0; i < this.length; ++i) {
				joined += (i > 0 ? glue : '') + this[i].toString();
			}

			return joined;
		};
	}

	if (typeof Array.prototype.map !== 'function') {
		Array.prototype.map = function(callback) {
			if (typeof callback !== 'function') {
				return this;
			}

			var result = [];

			for (var i = 0; i < this.length; ++i) {
				var el = this[i];

				result.push(callback(el));
			}

			return result;
		};
	}

	if (typeof Array.prototype.filter !== 'function') {
		Array.prototype.filter = function(callback) {
			if (typeof callback !== 'function') {
				return this;
			}

			var result = [];

			for (var i = 0; i < this.length; ++i) {
				var el = this[i];

				if (callback(el)) {
					result.push(el);
				}
			}

			return result;
		};
	}

	if (typeof Array.prototype.contains !== 'function') {
		Array.prototype.contains = function(element) {
			return this.indexOf(element) !== -1;
		};
	}
})();