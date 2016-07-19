(function($) {
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
	
	var config = {
		/**
		 * Define the reading direction
		 * x:
		 *   The table header becomes the labels on the X-Axis
		 *   A row will form a data-set (with the first column being the label)
		 * y:
		 *   A column will form a data-set, the header will be the label of the set
		 *   The first column will become the labels for the X-Axis
		 */
		direction: 'x',
		
		/**
		 * Turning on/off the analysis of the first column as a label
		 * x:
		 *   The data-sets will be named 1:n
		 * y:
		 *   The X-Axis will be labeled 1:n
		 */
		labels: true,
		
		/**
		 * Separator for groups
		 *   e.g. 'g1 > g2'
		 *   will collect everything with g1
		 *   and then nest everything with g2 under it
		 */
		groupSeparator: '>'
	};
	
	var mixin = function(left, right) {
		$.each(right, function(key, value) {
			left[key] = value;
		});
	};
	
	var configure = function(cfg) {
		mixin(config, cfg);
	};
	
	/**
	 * Flatten an HTML structure
	 * <div><div>1</div><div>2</div><div>3</div></div>.flatten(', ') -> 1, 2, 3
	 * @param concat string to combine two elements
	 * @return flattened value
	 */
	$.fn.flatten = function(concat) {
		var loop = function(elem) {
			var children = elem.contents();

			if (children.length > 0) {
				var content = [];

				for (var i = 0; i < children.length; ++i) {
					var child = children[i];

					if (child.nodeType === Node.TEXT_NODE) { // IE8+ (== 3 otherwise)
						content.push(child.nodeValue);
					} else {
						content.push(loop($(child)));
					}
				}

				var html = '';
				var prefix = '';

				for (var i = 0; i < content.length; ++i) {
					var c = $.trim(content[i]);

					if (c && c.length > 0) {
						html += prefix + c;

						if (concat) {
							prefix = concat;
						}
					}
				}

				return html;
			} else {
				return elem.text();
			}
		};

		return loop($(this));
	};
	
	var isInteger = function(val) {
		return val.match(/^-?[1-9]\d*$/);
	};
	
	var isFloat = function(val) {
		return val.length > 1 && val.match(/^-?(0|[1-9]\d*)?\.\d*$/);
	};

	/**
	 * Get the flattened value of an HTML structure
	 * elements will be combined with ''
	 * <div><div>Node</div><div>1</div></div>.flatVal() -> Node1
	 * If the result is parseable as number, it will be returned as such,
	 * string otherwise
	 * @return evaluated flat value
	 */
	$.fn.flatVal = function() {
		var val = $(this).flatten('');
		
		if (!val) {
			return '';
		}
		
		if (isInteger(val)) {
			return parseInt(val);
		}
		
		if (isFloat(val)) {
			return parseFloat(val);
		}
		
		return val;
	};
	
	var directionReader = {
		/*
			A, B, C are labels for the X-Axis
			S1, S2, S3 are labels for the data set
			(1) is automatic numeration as label for w/e
		*/
		
		'x': function(table, config) {
			var rows = [];
			var labels = [];
			var groups = {};
			
			table.find('> thead > tr:first-child').each(function() {
				$(this).find('th, td').each(function(i) {
					/*
						With labels:
						|   | A | B | C |
						
						Without labels:
						| A | B | C |
					*/
					
					if (!config.labels || i > 0) {
						var val = $(this).flatten(' ');
						
						if (val === '') {
							labels.push(' ');
						} else {
							labels.push(val);
						}
					}
				});
			});
			
			table.find('> tbody > tr').each(function(i) {
				var row = [];
				
				if (!config.labels) {
					row.push((i + 1).toString());
				}
				
				$(this).find('td').each(function(j) {
					/*
						With labels:
						| S1 | 1 | 2 | 3 |
						
						Without labels:
						(1) | 1 | 2 | 3 |
					*/
					
					var inner;
					
					if (config.labels && j === 0) {
						inner = $(this).flatten(' ');
					
						if (inner === '') {
							row.push(' ');
						} else {
							row.push(inner);
						}
					} else {
						inner = $(this).flatVal();
						
						if (typeof inner === 'number') {
							row.push(inner);
						} else {
							row.push(0);
						}
					}
				});
				
				var data = $(this).data();
				if (data.hasOwnProperty('group')) {
					groups[row[0]] = data.group;
				}
				
				rows.push(row);
			});
			
			return {
				data: rows,
				labels: labels,
				groups: groups
			};
		},
		'y': function(table, config) {
			var columns = [];
			var labels = [];
			var groups = {};
			
			table.find('> thead > tr:first-child').each(function() {
				$(this).find('th, td').each(function(i) {
					/*
						With labels:
						|   | S1 | S2 | S3 |
						
						Without labels:
						| S1 | S2 | S3 |
					*/
					
					if (!config.labels || i > 0) {
						var val = $(this).flatten(' ');
						
						if (val === '') {
							columns.push([' ']);
						} else {
							columns.push([val]);
						}
						
						var data = $(this).data();
						if (data.hasOwnProperty('group')) {
							groups[columns[columns.length - 1][0]] = data.group;
						}
					}
				});
			});
			
			table.find('> tbody > tr').each(function(i) {
				if (!config.labels) {
					labels.push((i + 1).toString());
				}
					
				$(this).find('td').each(function(j) {
					/*
						With labels:
						| A | 1 | 2 | 3 |
						
						Without labels:
						(1) | 1 | 2 | 3 |
					*/
					
					var inner;
					var colIdx = config.labels ? j - 1 : j;
					
					if (config.labels && j === 0) {
						inner = $(this).flatten(' ');
					
						if (inner === '') {
							labels.push(' ');
						} else {
							labels.push(inner);
						}
					} else {
						inner = $(this).flatVal();
						
						if (typeof inner === 'number') {
							columns[colIdx].push(inner);
						} else {
							columns[colIdx].push(0);
						}
					}
				});
			});
			
			return {
				data: columns,
				labels: labels,
				groups: groups
			};
		}
	};

	/**
	 * Evaluate a table into a JS object
	 * @return table data object
	 */
	$.fn.getTableData = function() {
		var self = $(this);
		
		if (!self.is('table') || !directionReader.hasOwnProperty(config.direction)) {
			return {
				data: [[]]
			};
		}
		
		return directionReader[config.direction](self, config);
	};
	
	var transpose = function(arr) {
		var trans = [];
		
		var num = arr[0].length;
		for (var i = 0; i < num; ++i) {
			var tmp = [];
			
			for (var j = 0; j < arr.length; ++j) {
				tmp.push(arr[j][i]);
			}
			
			trans.push(tmp);
		}
		
		return trans;
	};
	
	var gatherGroupData = function(data, name, ids) {
		var row = [name];
		
		for (var i = 0; i < ids.length; ++i) {
			var id = ids[i];
			var set = data.find(
				function(d) {
					return d[0] === id;
				}
			);
			
			if (set && set.length > 1) {
				for (var j = 1; j < set.length; ++j) {
					if (row.length <= j) {
						row.push(set[j]);
					} else {
						row[j] += set[j];
					}
				}
			}
		}
		
		return row;
	};
	
	var getIdsFromGroups = function(groups) {
		return groups.map(
			function(g) {
				return g.name;
			}
		);
	};
	
	var getSetsFromGroup = function(data, ids) {
		return data.filter(
			function(d) {
				return ids.contains(d[0]);
			}
		);
	};
	
	var getDataFromGroups = function(data, groups) {
		return groups.map(
			function(g) {
				return gatherGroupData(data, g.name, g.ids);
			}
		);
	};
	
	var drillDown = function(drilldown, data, parent, groups) {
		for (var i = 0; i < groups.length; ++i) {
			var group = groups[i];
			
			if (group.hasOwnProperty('groups')) {
				drilldown[group.name] = {
					ids: getIdsFromGroups(group.groups),
					data: getDataFromGroups(data, group.groups),
					parent: parent
				};
				
				drilldown = drillDown(drilldown, data, group.name, group.groups);
			} else {
				if (group.ids.length > 1) {
					drilldown[group.name] = {
						ids: group.ids,
						data: getSetsFromGroup(data, group.ids),
						parent: parent
					};
				}
			}
		}
		
		return drilldown;
	};
	
	var getDrilldownLevels = function(data, groups) {
		if (typeof groups === 'undefined' || groups.length === 0) {
			return {
				'0': {
					ids: data.map(
						function(d) {
							return d[0];
						}
					),
					data: data,
					parent: null
				}
			};
		} else {
			return drillDown({}, data, null, [{ name: '0', groups: groups }]);
		}
	};
	
	var objectToArray = function(object) {
		var array = [];
		
		$.each(object, function(key, value) {
			array.push(value);
		});
		
		return array;
	};
	
	var groupObjectsToArray = function(object) {
		if (object.hasOwnProperty('groups')) {
			object.groups = objectToArray(object.groups);
			
			for (var i = 0; i < object.groups.length; ++i) {
				groupObjectsToArray(object.groups[i]);
			}
		}
	};
	
	var splitGroupString = function(group) {
		return group
			.split(config.groupSeparator)
			.map(
				function(g) {
					return g.trim();
				}
			);
	};
	
	var analyzeGroupData = function(groups) {
		var result = {};
		
		$.each(groups, function(label, groupString) {
			var groupList = splitGroupString(groupString);
			
			var current = result;
			for (var i = 0; i < groupList.length; ++i) {
				var group = groupList[i];
				
				if (!current.hasOwnProperty('groups')) {
					current.groups = {};
				}
				
				if (!current.groups.hasOwnProperty(group)) {
					current.groups[group] = {
						name: group,
						ids: [label]
					};
				} else {
					current.groups[group].ids.push(label);
				}
				
				current = current.groups[group];
			}
		});
		
		groupObjectsToArray(result);
		return result.groups;
	};
	
	var groupDataToC3Groups = function(groups) {
		return groups.map(
			function(g) {
				return g.ids;
			}
		);
	};
	
	var dataExtractor = {
		'line': function(table) {
			var tableData = table.getTableData();
			
			// TODO: Decide how grouping should work for line charts
			var data;
			if (tableData.groups !== {}) {
				var groups = analyzeGroupData(tableData.groups);
				
				data = groups.map(
					function(g) {
						return gatherGroupData(tableData.data, g.name, g.ids);
					}
				);
				
				var unusedData = tableData.data.filter(
					function(d) {
						return !tableData.groups.hasOwnProperty(d[0]);
					}
				);
				
				for (var i = 0; i < unusedData.length; ++i) {
					data.push(unusedData[i]);
				}
			} else {
				data = tableData.data;
			}
			
			return {
				columns: data,
				labels: tableData.labels
			};
		},
		'bar': function(table) {
			var tableData = table.getTableData();
			
			var groups;
			if (tableData.groups !== {}) {
				groups = groupDataToC3Groups(analyzeGroupData(tableData.groups));
			}
			
			return {
				columns: tableData.data,
				labels: tableData.labels,
				groups: groups
			};
		},
		'pie': function(table, chart) {
			var tableData = table.getTableData();
			
			var onclick;
			
			var data = table.data();
			if (data.hasOwnProperty('drilldown')) {
				var groups = analyzeGroupData(tableData.groups);
				var levels = getDrilldownLevels(tableData.data, groups);
				
				return {
					columns: levels['0'].data,
					levels: levels,
					onclickBuilder: function(chart, levels, container) {
						console.log(chart, levels, container);
						return function(d, i) {
							var id = d.id;
							
							if (levels.hasOwnProperty(id)) {
								chart.load({
									columns: levels[id].data
								});
								
								chart.unload({
									ids: levels[currentLevel].ids
								});
							}
						};
					}
				};
			}
			
			if (tableData.groups !== {}) {
				var groups = analyzeGroupData(tableData.groups);
				var levels = getDrilldownLevels(tableData.data, groups);
				
				return {
					columns: levels['0'].data
				};
			}
			
			return {
				columns: tableData.data
			};
		}
	};
	
	/**
	 * Turn a table into a C3 chart
	 * @param type must be one of [ line | bar | pie ]
	 * @param container destination of the chart,
	 *		  if none is provided, a new div will be inserted after the table
	 * @return void
	 */
	// TODO: This is still somewhat messy
	$.fn.chart = function(type, container) {
		if (!dataExtractor.hasOwnProperty(type)) {
			return;
		}
		
		var self = $(this);
		
		if (!self.is('table')) {
			return;
		}

		var destId;
		if (!container || container.length === 0) {
			destId = 'gen' + new Date().getTime();
			
			container = $('<div id="' + destId + '" class="graph"></div>');
			self.after(container);
		} else {
			destId = container.attr('id');
		}

		container.empty();
		
		var tableData = dataExtractor[type](self);
		
		var currentLevel = '0';
		var loadLevel = function(id) {
			var levels = tableData.levels;
			
			if (levels.hasOwnProperty(id)) {
				chart.load({
					columns: levels[id].data
				});
				
				chart.unload({
					ids: levels[currentLevel].ids
				});
				
				currentLevel = id;
				
				if (id === '0') {
					container.find('.step-back-button').prop('disabled', true);
				} else {
					container.find('.step-back-button').removeProp('disabled');
				}
			}
		};
		
		var chart = c3.generate({
			bindto: '#' + destId,
			data: {
				type: type,
				columns: tableData.columns,
				groups: tableData.groups,
				onclick: tableData.hasOwnProperty('levels') ? function(d, e) {
					loadLevel(d.id);
				} : function(d, e) { }
			},
			axis: {
				x: {
					tick: {
						format: function(x) {
							return (tableData.labels && tableData.labels.length > 0) ? tableData.labels[x] : x + 1;
						}
					}
				}
			}
		});
		
		if (tableData.hasOwnProperty('levels')) {
			container.append($('<button class="step-back-button" disabled>Step back</button>').on('click', function() {
				loadLevel(tableData.levels[currentLevel].parent);
			}));
		}
	};
	
	window['$chart-test'] = {
		'isInteger': isInteger,
		'isFloat': isFloat,
		'transpose': transpose,
		'getDrilldownLevels': getDrilldownLevels,
		'analyzeGroupData': analyzeGroupData
	};
	
	window.$chart = {
		'configure': configure,
		'BAR': 'bar',
		'LINE': 'line',
		'PIE': 'pie'
	};
})(jQuery);
