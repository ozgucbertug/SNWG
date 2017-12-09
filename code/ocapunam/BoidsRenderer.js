import * as THREE from '../ocapunam/module.js'

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
            scene.background = new THREE.Color(0xFF00FF)

        let camera = new THREE.OrthographicCamera( 0, this.width, 0, this.height, -1000, 10000 )
        camera.position.z = 1000
        scene.add(camera)

        // Test Geo
        var geometry = new THREE.SphereGeometry(100, 32, 16);
        var material = new THREE.MeshBasicMaterial({wireframe:true, wireframeLinewidth: 3, color: 0xFFFFFF });
        var mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh)
        

        this.swarm  = new Swarm(width, height)
        this.swarm.createBoids(scene, boidCount)

        this.texture = new THREE.WebGLRenderTarget( width, height, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat });
        
        const render = () => {        
            requestAnimationFrame(render.bind(this))
            update(clock.getDelta())
            this.swarm.animate()

            //console.log(this.texture)

            renderer.render(scene, camera, this.texture, true)
            renderer.render(scene, camera)
        }

        this.init = () => render()
    }
}

