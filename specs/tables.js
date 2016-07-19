describe('get data from', function() {
	describe('in x direction', function() {
		describe('with labels', function() {
			it('should get flat values', function() {
				var table = $(
					'<table>' +
						'<thead>' +
							'<tr>' +
								'<th></th>' +
								'<th>Label 1</th>' +
								'<th>Label 2</th>' +
							'</tr>' +
						'</thead>' +
						'<tbody>' +
							'<tr>' +
								'<td>Set 1</td>' +
								'<td>1</td>' +
								'<td>2</td>' +
							'</tr>' +
							'<tr>' +
								'<td>Set 2</td>' +
								'<td>3</td>' +
								'<td>4</td>' +
							'</tr>' +
						'</tbody>' +
					'</table>'
				);
				
				$chart.configure({ direction: 'x', labels: true });
				
				var data = table.getTableData();
				
				expect(data.data).toEqual(
					[
						['Set 1', 1, 2],
						['Set 2', 3, 4]
					]
				);
				
				expect(data.labels).toEqual(['Label 1', 'Label 2']);
			});
		});
		
		describe('without labels', function() {
			it('should get flat values', function() {
				var table = $(
					'<table>' +
						'<thead>' +
							'<tr>' +
								'<th>Label 1</th>' +
								'<th>Label 2</th>' +
							'</tr>' +
						'</thead>' +
						'<tbody>' +
							'<tr>' +
								'<td>1</td>' +
								'<td>2</td>' +
							'</tr>' +
							'<tr>' +
								'<td>3</td>' +
								'<td>4</td>' +
							'</tr>' +
						'</tbody>' +
					'</table>'
				);
				
				$chart.configure({ direction: 'x', labels: false });
				
				var data = table.getTableData();
				
				expect(data.data).toEqual(
					[
						['1', 1, 2],
						['2', 3, 4]
					]
				);
				
				expect(data.labels).toEqual(['Label 1', 'Label 2']);
			});
		});
		
		describe('read group attribute', function() {
			it('should get groups', function() {
				var table = $(
					'<table>' +
						'<thead>' +
							'<tr>' +
								'<th></th>' +
								'<th>Label 1</th>' +
								'<th>Label 2</th>' +
							'</tr>' +
						'</thead>' +
						'<tbody>' +
							'<tr data-group="g1">' +
								'<td>Set 1</td>' +
								'<td>1</td>' +
								'<td>2</td>' +
							'</tr>' +
							'<tr data-group="g1">' +
								'<td>Set 2</td>' +
								'<td>3</td>' +
								'<td>4</td>' +
							'</tr>' +
							'<tr data-group="g2">' +
								'<td>Set 3</td>' +
								'<td>5</td>' +
								'<td>6</td>' +
							'</tr>' +
							'<tr data-group="g2">' +
								'<td>Set 4</td>' +
								'<td>7</td>' +
								'<td>8</td>' +
							'</tr>' +
						'</tbody>' +
					'</table>'
				);
				
				$chart.configure({ direction: 'x', labels: true });
				
				var data = table.getTableData();
				
				expect(data.groups).toEqual({
					'Set 1': 'g1',
					'Set 2': 'g1',
					'Set 3': 'g2',
					'Set 4': 'g2'
				});
			});
		});
	});
	
	describe('in y direction', function() {
		describe('with labels', function() {
			it('should get flat values', function() {
				var table = $(
					'<table>' +
						'<thead>' +
							'<tr>' +
								'<th></th>' +
								'<th>Set 1</th>' +
								'<th>Set 2</th>' +
							'</tr>' +
						'</thead>' +
						'<tbody>' +
							'<tr>' +
								'<td>Label 1</td>' +
								'<td>1</td>' +
								'<td>3</td>' +
							'</tr>' +
							'<tr>' +
								'<td>Label 2</td>' +
								'<td>2</td>' +
								'<td>4</td>' +
							'</tr>' +
						'</tbody>' +
					'</table>'
				);
				
				$chart.configure({ direction: 'y', labels: true });
				
				var data = table.getTableData();
				
				expect(data.data).toEqual(
					[
						['Set 1', 1, 2],
						['Set 2', 3, 4]
					]
				);
				
				expect(data.labels).toEqual(['Label 1', 'Label 2']);
			});
		});
		
		describe('without labels', function() {
			it('should get flat values', function() {
				var table = $(
					'<table>' +
						'<thead>' +
							'<tr>' +
								'<th>Set 1</th>' +
								'<th>Set 2</th>' +
							'</tr>' +
						'</thead>' +
						'<tbody>' +
							'<tr>' +
								'<td>1</td>' +
								'<td>3</td>' +
							'</tr>' +
							'<tr>' +
								'<td>2</td>' +
								'<td>4</td>' +
							'</tr>' +
						'</tbody>' +
					'</table>'
				);
				
				$chart.configure({ direction: 'y', labels: false });
				
				var data = table.getTableData();
				
				expect(data.data).toEqual(
					[
						['Set 1', 1, 2],
						['Set 2', 3, 4]
					]
				);
				
				expect(data.labels).toEqual(['1', '2']);
			});
		});
		
		describe('read group attribute', function() {
			it('should get groups', function() {
				var table = $(
					'<table>' +
						'<thead>' +
							'<tr>' +
								'<th></th>' +
								'<th data-group="g1">Set 1</th>' +
								'<th data-group="g1">Set 2</th>' +
								'<th data-group="g2">Set 3</th>' +
								'<th data-group="g2">Set 4</th>' +
							'</tr>' +
						'</thead>' +
						'<tbody>' +
							'<tr>' +
								'<td>Label 1</td>' +
								'<td>1</td>' +
								'<td>3</td>' +
								'<td>5</td>' +
								'<td>7</td>' +
							'</tr>' +
							'<tr>' +
								'<td>Label 1</td>' +
								'<td>2</td>' +
								'<td>4</td>' +
								'<td>6</td>' +
								'<td>8</td>' +
							'</tr>' +
						'</tbody>' +
					'</table>'
				);
				
				$chart.configure({ direction: 'y', labels: true });
				
				var data = table.getTableData();
				
				expect(data.groups).toEqual({
					'Set 1': 'g1',
					'Set 2': 'g1',
					'Set 3': 'g2',
					'Set 4': 'g2'
				});
			});
		});
	});
});