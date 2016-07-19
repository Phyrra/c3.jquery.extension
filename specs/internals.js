describe('helper functions', function() {
	var internals = window['$chart-test'];
	
	it('should be defined', function() {
		expect(internals).toBeDefined();
	});
	
	describe('isInteger', function() {
		it('should recognize single number', function() {
			expect(internals.isInteger('1')).toBeTruthy();
		});
		
		it('should recognize longer number', function() {
			expect(internals.isInteger('10')).toBeTruthy();
		});
		
		it('should recognize negative number', function() {
			expect(internals.isInteger('-1')).toBeTruthy();
		});
		
		it('should not recognize leading 0', function() {
			expect(internals.isInteger('01')).toBeFalsy();
		});
		
		it('should not recognize negative leading 0', function() {
			expect(internals.isInteger('-01')).toBeFalsy();
		});
	});
	
	describe('isFloat', function() {
		it('should recognize .x', function() {
			expect(internals.isFloat('.1')).toBeTruthy();
		});
		
		it('should recognize x.', function() {
			expect(internals.isFloat('1.')).toBeTruthy();
		});
		
		it('should recognize 0.x', function() {
			expect(internals.isFloat('0.1')).toBeTruthy();
		});
		
		it('should recognize trailing 0', function() {
			expect(internals.isFloat('1.000')).toBeTruthy();
		});
		
		it('should recognize negative number', function() {
			expect(internals.isFloat('-1.')).toBeTruthy();
		});
		
		it('should not recognize integer', function() {
			expect(internals.isFloat('1')).toBeFalsy();
		});
		
		it('should not recognize leading 0', function() {
			expect(internals.isFloat('01.')).toBeFalsy();
		});
		
		it('should not recognize .', function() {
			expect(internals.isFloat('.')).toBeFalsy();
		});
	});
	
	describe('transpose', function() {
		it('should transpose matrix', function() {
			expect(internals.transpose([[1, 2], [3, 4]])).toEqual([[1, 3], [2, 4]]);
		});
	});
});