describe('check internal prototypes', function() {
	describe('for strings', function() {
		describe('startsWith', function() {
			it('should exist', function() {
				expect(''.startsWith).toBeDefined();
			});
			
			it('should match', function() {
				expect('Hello World'.startsWith('Hello')).toBe(true);
			});
			
			it('should not match', function() {
				expect('Hello World'.startsWith('World')).toBe(false);
			});
		});
		
		describe('endsWith', function() {
			it('should exist', function() {
				expect(''.endsWith).toBeDefined();
			});
			
			it('should match', function() {
				expect('Hello World'.endsWith('World')).toBe(true);
			});
			
			it('should not match', function() {
				expect('Hello World'.endsWith('Hello')).toBe(false);
			});
		});
		
		describe('trim', function() {
			it('should exist', function() {
				expect(''.trim).toBeDefined();
			});
			
			it('should trim', function() {
				expect(' \n Hello World \n '.trim()).toBe('Hello World');
			});
			
			it('should not do anything', function() {
				expect('Hello World'.trim()).toBe('Hello World');
			});
		});
		
		describe('contains', function() {
			it('should exist', function() {
				expect(''.contains).toBeDefined();
			});
			
			it('should find', function() {
				expect('Hello World'.contains('o W')).toBe(true);
			});
			
			it('should not find', function() {
				expect('Hello World'.contains('ow')).toBe(false);
			});
		});
	});
	
	describe('for arrays', function() {
		describe('find', function() {
			it('should exist', function() {
				expect([].find).toBeDefined();
			});
			
			it('should find element', function() {
				expect([1, 2, 3].find(function(el) { return el > 1; })).toBe(2);
			});
			
			it('should return null when not found', function() {
				expect([1, 2, 3].find(function(el) { return false; })).toBeUndefined();
			});
		});
		
		describe('join', function() {
			it('should exist', function() {
				expect([].join).toBeDefined();
			});
			
			it('should join with nothing', function() {
				expect([1, 2, 3].join()).toBe('1,2,3');
			});
			
			it('should join with glue', function() {
				expect([1, 2, 3].join(', ')).toBe('1, 2, 3');
			});
		});
		
		describe('map', function() {
			it('should exist', function() {
				expect([].map).toBeDefined();
			});
			
			it('should map elements', function() {
				expect([1, 2, 3].map(function(el) { return el * 2; })).toEqual([2, 4, 6]);
			});
		});
		
		describe('filter', function() {
			it('should exist', function() {
				expect([].filter).toBeDefined();
			});
			
			it('should find a single element', function() {
				expect([1, 2, 3].filter(function(el) { return el === 2; })).toEqual([2]);
			});
			
			it('should find even numbers', function() {
				expect([1, 2, 3, 4, 5, 6, 7, 8].filter(function(el) { return el % 2 === 0; })).toEqual([2, 4, 6, 8]);
			});
		});
		
		describe('contains', function() {
			it('should exist', function() {
				expect([].contains).toBeDefined();
			});
			
			it('should contain element', function() {
				expect([1, 2, 3].contains(2)).toBe(true);
			});
			
			it('should not contain element', function() {
				expect([1, 2, 3].contains(4)).toBe(false);
			});
			
			it('should not contain undefined', function() {
				expect([1, 2, 3].contains()).toBe(false);
			});
		});

		describe('some', function() {
			it('should exist', function() {
				expect([].some).toBeDefined();
			});

			it('should return true if one matches', function() {
				expect([1, 2, 3].some(function(el) { return el % 2 === 0; })).toBe(true);
			});

			it('should return false if none matches', function() {
				expect([1, 2, 3].some(function(el) { return el > 10; })).toBe(false);
			});
		});
	});
});