var CollisionHandler = {
	init: function() {
		GameEvents.on("registerCollider", this.onRegisterCollider, this);
		GameEvents.on("deregisterCollider", this.onDeregisterCollider, this);
		GameEvents.on("detectCollisionAtPoint", this.getCollision, this);
		this.collisionLayers = {};
	},
	onRegisterCollider: function(collider, layer) {
		if (!collider.getBounds) {
			throw new Error("Error: Can't register a collider that has no getBounds function.");
		}
		if (this.collisionLayers[layer]) {
			this.collisionLayers[layer].push(collider);
		} else {
			this.collisionLayers[layer] = [collider];
		}
	},
	onDeregisterCollider: function(collider, layer) {
		var collisionLayer = this.collisionLayers[layer];
		for (var i = 0; i < collisionLayer.length; i++) {
			var currentCollider = collisionLayer[i];
			if (currentCollider == collider) {
				this.collisionLayers[layer].splice(i, 1);
				break;
			}
		}
	},
	getCollision(collider, point, layer) {
		var collisionLayer = this.collisionLayers[layer];
		for (var i = 0; i < collisionLayer.length; i++) {
			var currentCollidee = collisionLayer[i];
			if (currentCollidee == collider) continue;
			var collideeBounds = currentCollidee.getBounds();

			var isInsideVertically = point.y > collideeBounds.top && point.y < collideeBounds.bottom;
			var isInsideHorizontally = point.x > collideeBounds.left && point.x < collideeBounds.right;
			if (isInsideHorizontally && isInsideVertically) {
				GameEvents.emit('collision', collider, currentCollidee);
			}
		}
	}
}