---
layout: full
title: Final Development
permalink: /code/ocapunam-boids2/
author: Ozguc
---
<script deferred type="module">

import * as THREE from '../lib/module.js'
import {Boid, Swarm} from '../ocapunam/boids.js'


let scene, camera
let rtTexture 
let swarm

let sWidth = window.innerWidth
let sHeight = window.innerHeight

let boidCount = 500

let renderer = new THREE.WebGLRenderer( { preserveDrawingBuffer: true } )
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(sWidth, sHeight)
    renderer.autoClear = false;


    document.body.appendChild(renderer.domElement)

function init(){
    
    scene = new THREE.Scene()

    camera = new THREE.OrthographicCamera( 0, sWidth, 0, sHeight, -10000, 10000 )
    camera.position.z = 1000

    var geometry = new THREE.SphereGeometry(100, 32, 16);
    var material = new THREE.MeshBasicMaterial({wireframe:true, wireframeLinewidth: 3, color: 0xFF0000 });
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh)


    swarm = new Swarm(sWidth, sHeight)
    swarm.createBoids(scene, boidCount)
    swarm.id = setInterval(swarm.animate, 10000)

    rtTexture = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat } )
    material = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0.0 } }
    })

}
    
function animate(){
    requestAnimationFrame(animate)
    swarm.animate()
    render()
}

function render() { 
    renderer.render(scene, camera)
} 
    
    init()
    animate()

</script>

