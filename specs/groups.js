
describe('drilldown data grouping', function() {
	var internals = window['$chart-test'];
	
	describe('build levels from data and groups', function() {
		it('should create a single level if no groups are provided', function() {
			var data = [
				['A', 1],
				['B', 2]
			];
			
			var groups = [];
			
			expect(internals.getDrilldownLevels(data, groups)).toEqual({
				'0': {
					ids: ['A', 'B'],
					data: [
						['A', 1],
						['B', 2]
					],
					parent: null
				}
			});
		});
		
		it('should get a single level for group == data', function() {
			var data = [
				['A', 1],
				['B', 2]
			];
			
			var groups = [
				{
					name: 'A',
					ids: ['A']
				},
				{
					name: 'B',
					ids: ['B']
				}
			];
			
			expect(internals.getDrilldownLevels(data, groups)).toEqual({
				'0': {
					ids: ['A', 'B'],
					data: [
						['A', 1],
						['B', 2]
					],
					parent: null
				}
			});
		});
		
		it('should correclty collect grouped values', function() {
			var data = [
				['A', 1],
				['B', 2],
				['C', 3],
				['D', 4]
			];
			
			var groups = [
				{
					name: 'A + B',
					ids: ['A', 'B']
				},
				{
					name: 'C + D',
					ids: ['C', 'D']
				}
			];
			
			expect(internals.getDrilldownLevels(data, groups)).toEqual({
				'0': {
					ids: ['A + B', 'C + D'],
					data: [
						['A + B', 3],
						['C + D', 7]
					],
					parent: null
				},
				'A + B': {
					ids: ['A', 'B'],
					data: [
						['A', 1],
						['B', 2]
					],
					parent: '0'
				},
				'C + D': {
					ids: ['C', 'D'],
					data: [
						['C', 3],
						['D', 4]
					],
					parent: '0'
				}
			});
			
			it('should build correct hierarchy', function() {
				var data = [
					['A', 1],
					['B', 2],
					['C', 3],
					['D', 4],
					['E', 5],
					['F', 6],
					['G', 7]
				];
				
				var groups = [
					{
						name: 'A + B + C + D',
						ids: ['A', 'B', 'C', 'D'],
						groups: [
							{
								name: 'A + B',
								ids: ['A', 'B']
							},
							{
								name: 'C + D',
								ids: ['C', 'D']
							}
						]
					},
					{
						name: 'E + F',
						ids: ['E', 'F']
					},
					{
						name: 'G',
						ids: ['G']
					}
				];
				
				expect(internals.getDrilldownLevels(data, groups)).toEqual({
					'0': {
						ids: ['A + B + C + D', 'E + F'],
						data: [
							['A + B + C + D', 1],
							['E + F', 2]
						],
						parent: null
					},
					'A + B + C + D': {
						ids: ['A + B', 'C + D'],
						data: [
							['A + B', 3],
							['C + D', 4]
						],
						parent: '0'
					},
					'A + B': {
						ids: ['A', 'B'],
						data: [
							['A', 5],
							['B', 6]
						],
						parent: 'A + B + C + D'
					},
					'C + D': {
						ids: ['C', 'D'],
						data: [
							['C', 7],
							['D', 8]
						],
						parent: 'A + B + C + D'
					},
					'E + F': {
						ids: ['E', 'F'],
						data: [
							['E', 9],
							['F', 10]
						],
						parent: '0'
					}
				});
			});
		});
	});
	
	describe('get groups from table data', function() {
		it('should create a single level', function() {
			var groups = {
				'A': 'g1',
				'B': 'g1',
				'C': 'g2',
				'D': 'g2'
			};
			
			expect(internals.analyzeGroupData(groups)).toEqual([
				{
					name: 'g1',
					ids: ['A', 'B']
				},
				{
					name: 'g2',
					ids: ['C', 'D']
				}
			]);
		});
		
		it('should create a group hierarchy', function() {
			var groups = {
				'A': 'g1 > g2',
				'B': 'g1 > g2',
				'C': 'g1 > g3',
				'D': 'g1 > g3'
			};
			
			expect(internals.analyzeGroupData(groups)).toEqual([
				{
					name: 'g1',
					ids: ['A', 'B', 'C', 'D'],
					groups: [
						{
							name: 'g2',
							ids: ['A', 'B']
						},
						{
							name: 'g3',
							ids: ['C', 'D']
						}
					]
				}
			]);
		});
	});
});