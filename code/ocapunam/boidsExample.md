---
layout: full
title: Final Development
permalink: /code/ocapunam-boids2/
author: Ozguc
---
<script deferred type="module">

import * as THREE from '../lib/module.js'
import {Boid, Swarm} from '../ocapunam/boids.js'

export default class BoidsRenderer {
    constructor({
            width = 1024,
            height = 1024,
            update = (time) => { },
            boidCount = 100,
            }={}) {

let scene, camera
let swarm

let boidCount = 100

let renderer = new THREE.WebGLRenderer( { preserveDrawingBuffer: true } )
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(width, height)
    renderer.autoClear = false;


    document.body.appendChild(renderer.domElement)

    scene = new THREE.Scene()

    camera = new THREE.OrthographicCamera( 0, sWidth, 0, sHeight, -10000, 10000 )
    camera.position.z = 1000

    swarm = new Swarm(sWidth, sHeight)
    swarm.createBoids(scene, boidCount)
    swarm.id = setInterval(swarm.animate, 10000)

    this.texture = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, {minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat })

    
const render = () => {        
            requestAnimationFrame(render.bind(this))
            update(clock.getDelta())
            this.swarm.animate()
            renderer.render(scene, camera, this.texture, true)
}
     this.init = () => render()
}

let boids = new BoidsRenderer({
    boidCount: 100,
    width: dim*10,
    height: dim*10,
    update: (dt) => update(dt),
})

boids.init()
</script>

