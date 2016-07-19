describe('check internal prototypes', function() {
	describe('for strings', function() {
		describe('startsWith', function() {
			it('should exist', function() {
				expect(''.startsWith).toBeDefined();
			});
			
			it('should match', function() {
				expect('Hello World'.startsWith('Hello')).toBeTruthy();
			});
			
			it('should not match', function() {
				expect('Hello World'.startsWith('World')).toBeFalsy();
			});
		});
		
		describe('endsWith', function() {
			it('should exist', function() {
				expect(''.endsWith).toBeDefined();
			});
			
			it('should match', function() {
				expect('Hello World'.endsWith('World')).toBeTruthy();
			});
			
			it('should not match', function() {
				expect('Hello World'.endsWith('Hello')).toBeFalsy();
			});
		});
		
		describe('trim', function() {
			it('should exist', function() {
				expect(''.trim).toBeDefined();
			});
			
			it('should trim', function() {
				expect(' \n Hello World \n '.trim()).toEqual('Hello World');
			});
			
			it('should not do anything', function() {
				expect('Hello World'.trim()).toEqual('Hello World');
			});
		});
		
		describe('contains', function() {
			it('should exist', function() {
				expect(''.contains).toBeDefined();
			});
			
			it('should find', function() {
				expect('Hello World'.contains('o W')).toBeTruthy();
			});
			
			it('should not find', function() {
				expect('Hello World'.contains('ow')).toBeFalsy();
			});
		});
	});
	
	describe('for arrays', function() {
		describe('find', function() {
			it('should exist', function() {
				expect([].find).toBeDefined();
			});
		
			/*
			it('should return undefined if there is no callback', function() {
				expect([1, 2, 3].find()).toEqual(undefined);
			});
			*/
			
			it('should find element', function() {
				expect([1, 2, 3].find(function(el) { return el > 1; })).toEqual(2);
			});
			
			it('should return null when not found', function() {
				expect([1, 2, 3].find(function(el) { return false; })).toEqual(undefined);
			});
		});
		
		describe('join', function() {
			it('should exist', function() {
				expect([].join).toBeDefined();
			});
			
			it('should join with nothing', function() {
				expect([1, 2, 3].join()).toEqual('1,2,3');
			});
			
			it('should join with glue', function() {
				expect([1, 2, 3].join(', ')).toEqual('1, 2, 3');
			});
		});
		
		describe('map', function() {
			it('should exist', function() {
				expect([].map).toBeDefined();
			});
			
			/*
			it('should not do anything', function() {
				expect([1, 2, 3].map()).toEqual([1, 2, 3]);
			});
			*/
			
			it('should map elements', function() {
				expect([1, 2, 3].map(function(el) { return el * 2; })).toEqual([2, 4, 6]);
			});
		});
		
		describe('filter', function() {
			it('should exist', function() {
				expect([].filter).toBeDefined();
			});
			
			/*
			it('should not do anything', function() {
				expect([1, 2, 3].filter()).toEqual([1, 2, 3]);
			});
			*/
			
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
				expect([1, 2, 3].contains(2)).toBeTruthy();
			});
			
			it('should not contain element', function() {
				expect([1, 2, 3].contains(4)).toBeFalsy();
			});
			
			it('should not contain undefined', function() {
				expect([1, 2, 3].contains()).toBeFalsy();
			});
		});
	});
});