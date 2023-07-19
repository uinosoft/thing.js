class Campus extends THING.Object3D {
    get buildings() {
        return this.children.query('tags:or(Building');
    }
	showOutside() {
		this.visible = true;
		this.buildings.forEach(building => {
			building.showOutside();
		});
	}
	hasGround(object){
		if(object.tags.has('Ground')){
			return true;
		}
		return false;
	}
    get isCampus() { return true; }
}

class Building extends THING.Object3D {
    get facade() {
        return this.children.query('tags:or(Facade');
    }
    showOutside() {
        this.visible = false;
        this.facade.visible = true;        
    }
    showInside() {
		this.parent.visible = false
		this.visible = true;
		this.facade.visible = false;
    }
    get isBuilding() { return true; }
}

class Floor extends THING.Object3D {
    get isFloor() { return true; }
}

THING.Utils.registerClass('Campus', Campus);
THING.Utils.registerClass('Building', Building);
THING.Utils.registerClass('Floor', Floor);

//  extends THING.BaseLevelControl
class StandardControl extends THING.BaseLevelControl {
	constructor(param = {}) {
		super(param);
		this.outlineColor = param['outlineColor'] || '#cc6600';
		this.duration = param['flyTime'] || 1000;
		this.eventTag = this.constructor.name;
	}

	onEnter(param) {
		const object = param.object;
		this._current = object;
		let app = this.app;

		// Register mouse move in and out events.
		app.on('mouseenter', (e) => {
			if (e.object) {
				let object = this.supportOutline(e.object);
				if (object) {
					object.style.outlineColor = this.outlineColor;
					this._outlineObject = object;
				}
			}
		}, this.eventTag);

		app.on('mouseleave', (e) => {
			if (e.object) {
				let object = this.supportOutline(e.object);
				if (object) {
					object.style.outlineColor = null;
					this._outlineObject = null;
				}
			}
		}, this.eventTag);

		app.on('dblclick', (e) => {
			if (e.button === 0) {
				if (e.object) {
					let object = this.supportOutline(e.object);
					if (object && this.supportChange(object)) {
						app.levelManager.change(object);
					}
				}
			} else if (e.button == 2) {
				const current = this.current;
				if (!current) {
					return;
				}
				const parent = current.parent;
				if (!parent || parent == app.root) {
					return;
				}
				app.levelManager.change(parent);
			}
		}, this.eventTag);

		app.camera.flyTo({
			target: object,
			duration: this.duration,
		});
	}

	onLeave() {
		let app = this.app;

		app.off('mouseenter', this.eventTag);
		app.off('mouseleave', this.eventTag);
		app.off('dblclick', this.eventTag);

		if (this._outlineObject) {
			this._outlineObject.style.outlineColor = null;
		}

		app.camera.stopFlying();
	}

	supportChange(object) {
		let tags = object.tags;
		if (tags.has('Campus') || tags.has('Building') || tags.has('Floor')) {
			return true;
		}

		return false;
	}

	supportOutline(object) {
		const parents = object.parents;
		const index = parents.indexOf(this.current);
		if (index > 0) {
			return parents[index - 1];
		}
		return object;
	}

	get current() {
		return this._current
	}
}


class CampusControl extends StandardControl {
	onEnter(param) {
		let campus = param.object;
		campus.showOutside();
		super.onEnter(param);
	}
	supportOutline(object) {
		if (this.current.hasGround(object)) {
			return null;
		}
		return super.supportOutline(object);
	}
}

class BuildingControl extends StandardControl {
	onEnter(param) {
		let building = param.object;
		building.showInside();
		super.onEnter(param);
	}
}

class FloorControl extends StandardControl {
	onEnter(param) {
		let floor = param.object;
		floor.parent.visible = false;
		floor.visible = true;
		super.onEnter(param);
	}
	supportOutline(object) {
		if (object == this.current) {
			return null;
		}
		return super.supportOutline(object);
	}
}

window.CampusControl = CampusControl;
window.BuildingControl = BuildingControl;
window.FloorControl = FloorControl;