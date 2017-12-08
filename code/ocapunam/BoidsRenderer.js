
import * as THREE from '../lib/module.js'

import {Boid, Swarm} from '../ocapunam/boids.js'

export default class BoidsRenderer {
    constructor({
            width = 1024,
            height = 1024,
            update = (time) => { },
            boidCount = 100,
            }={}) {

        let clock = new THREE.Clock()

        let renderer = new THREE.WebGLRenderer( { preserveDrawingBuffer: true } )
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize(width, height)
            renderer.autoClear = false;

        // document.body.appendChild(renderer.domElement)

        let scene = new THREE.Scene()

        let camera = new THREE.OrthographicCamera( 0, this.width, 0, this.height, -1000, 10000 )
        camera.position.z = 1000
        scene.add(camera)

        var geometry = new THREE.SphereGeometry(100, 32, 16);
        var material = new THREE.MeshBasicMaterial({wireframe:true, wireframeLinewidth: 3, color: 0xFF0000 });
        var mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh)
        

        this.swarm  = new Swarm(width, height)
        this.swarm.createBoids(scene, boidCount)

        this.texture = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter});
        
        const render = () => {        
            requestAnimationFrame(render.bind(this))
            update(clock.getDelta())
            this.swarm.animate()
            renderer.render(scene,camera)
            renderer.render(scene, camera, this.texture, true)
            // console.log(scene.children[0].position)
            // console.log(this.swarm)
        }

        this.init = () => render()
    }
}

