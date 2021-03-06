function LineColliderController(a, b, type) {
	this.model = new LineColliderModel(a, b, TILE_TYPES[type].name);
	this.view = new LineColliderView(this.model);
	GameEvents.emit('registerCollider', this, 'level');
}

LineColliderController.prototype = {
	checkIntersection: function(otherA, otherB) {
		return this.model.checkIntersection(otherA, otherB);
	},
	getDirection: function() {
		return this.model.getDirection();
	},
	getType: function() {
		return this.model.type;
	},
	setAsInternal: function(shouldSet) {
		this.model.isInternal = shouldSet;
	},
	setA: function(newA) {
		this.model.a = newA;
	},
	setB: function(newB) {
		this.model.b = newB;
	},
	destroy: function() {
		this.view.destroy();
		GameEvents.emit("deregisterCollider", this, "level");
	}
}
