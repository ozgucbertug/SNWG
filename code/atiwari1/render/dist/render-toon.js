var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import * as THREE from '../../../lib/module.js';
/* aman's dumb toon renderer
 * adapted from evan-erdos' boilerplate
 */
var curvatureVertShader = "precision mediump float;\n uniform float curvature;\n \n float PI = 3.14159265358979323846264;\n\n void main() {\n     // world pos\n   vec3 w_pos = position;\n   float y = w_pos.y;\n   float z = w_pos.z;\n   float om = curvature*sin(((w_pos.z) / 256.0));\n   w_pos.y = z*sin(om)+y*cos(om);\n   w_pos.z = z*cos(om)+y*sin(om);\n     // model view pos\n   vec4 mv_pos = modelViewMatrix * vec4(w_pos, 1.0);\n   fPosition = mv_pos.xyz;\n   gl_Position = projectionMatrix * mv_pos;\n }";
var ToonRender = (function () {
    function ToonRender(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.path, path = _c === void 0 ? '../../data/' : _c, _d = _b.width, width = _d === void 0 ? window.innerWidth : _d, _e = _b.height, height = _e === void 0 ? window.innerHeight : _e, _f = _b.background, background = _f === void 0 ? 0xFF0000 : _f, _g = _b.worldCurvature, worldCurvature = _g === void 0 ? -0.3 : _g, _h = _b.ambient, ambient = _h === void 0 ? 0xFFBB00 : _h, _j = _b.light, light = _j === void 0 ? 0x0000FF : _j, _k = _b.ground, ground = _k === void 0 ? 0x000000 : _k, _l = _b.webgl, webgl = _l === void 0 ? { antialias: true, shadowMapEnabled: true } : _l, _m = _b.position, position = _m === void 0 ? { x: 0, y: 0, z: 0 } : _m, _o = _b.fog, fog = _o === void 0 ? { color: 0x0000FF, near: 1, far: 1e3 } : _o, _p = _b.cam, cam = _p === void 0 ? { fov: 120, aspect: undefined, near: 0.1, far: 2e4 } : _p, _q = _b.elt, elt = _q === void 0 ? "body" : _q, _r = _b.update, update = _r === void 0 ? function (t) { } : _r;
        var _this = this;
        cam = __assign({ fov: 120, aspect: width / height, near: 0.1, far: 2e4 }, cam);
        var clock = new THREE.Clock();
        var renderer = new THREE.WebGLRenderer(webgl);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);
        renderer.setClearColor(ambient, 0);
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.shadowMap.enabled = true;
        var scene = new THREE.Scene();
        this.scene = scene;
        scene.fog = new THREE.Fog(fog.color, fog.near, fog.far);
        scene.background = new THREE.Color(background);
        scene.add(new THREE.AmbientLight(ambient)); //@ts-ignore
        var camera = new THREE.PerspectiveCamera(cam.fov, cam.aspect, cam.near, cam.far);
        camera.position.set(position.x, position.y, position.z);
        scene.add(camera);
        var controls = new THREE.OrbitControls(camera, renderer.domElement);
        //let controls = new PointerLockControls(camera);
        controls.enabled = true;
        var sun = new THREE.HemisphereLight(ambient, ground, 1.0);
        sun.position.set(1, 2, 0);
        scene.add(sun);
        var render = function () {
            requestAnimationFrame(render.bind(_this));
            controls.update();
            update(clock.getDelta());
            renderer.render(scene, camera);
        };
        var resize = function () {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', resize, false);
        window.addEventListener('load', function () { return render(); }, false);
        document.querySelector(elt).appendChild(renderer.domElement);
    }
    ToonRender.prototype.add = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
            var arg = args_1[_a];
            this.scene.add(arg);
        }
    };
    return ToonRender;
}());
export default ToonRender;
//# sourceMappingURL=render-toon.js.map
