describe('get inner values', function() {
	describe('by flattening', function() {
		it('should get straight value', function() {
			expect($('<div>Hello World</div>').flatten()).toEqual('Hello World');
		});
		
		it('should concat nested value', function() {
			expect($('<div><div>Hello</div><div>World</div></div>').flatten()).toEqual('HelloWorld');
		});
		
		it('should concat with separator', function() {
			expect($('<div><div>Hello</div><div>World</div></div>').flatten(' ')).toEqual('Hello World');
		});
	});
	
	describe('from a flat structure', function() {
		it('should be an integer', function() {
			expect($('<div>1</div>').flatVal()).toEqual(1);
		});
		
		it('should be a float', function() {
			expect($('<div>1.1</div>').flatVal()).toEqual(1.1);
		});
		
		it('should be text', function() {
			expect($('<div>1 test</div>').flatVal()).toEqual('1 test');
		});
	});
	
	describe('from a nested structure', function() {
		it('should combine to number', function() {
			expect($('<div><div>1</div><div>.</div><div>1</div></div>').flatVal()).toEqual(1.1);
		});
	});
});