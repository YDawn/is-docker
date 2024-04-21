'use strict';
var fs = require('fs');

var isDocker;

function hasDockerEnv() {
	try {
		fs.statSync('/.dockerenv');
		return true;
	} catch (err) {
		return false;
	}
}

function hasDockerCGroup() {
    var DOCKER_GROUPS = ['docker', '/ecs/', '/eks/'];
    try {
        var cgroup = fs.readFileSync('/proc/self/cgroup', 'utf8');
		return DOCKER_GROUPS.some(s => cgroup.includes(s));
	} catch {
		return false;
	}
}


function check() {
	return hasDockerEnv() || hasDockerCGroup();
}

module.exports = function () {
	if (isDocker === undefined) {
		isDocker = check();
	}

	return isDocker;
};
