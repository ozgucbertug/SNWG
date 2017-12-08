---
layout: full
title: Final Development
permalink: /code/ocapunam-finalDev2/
author: Ozguc
---


<canvas id="Boids" width="640" height="640" style="position: absolute; left: 0; top: 0;"></canvas>

<script deferred type="module">


import * as T from '../lib/module.js'
import {Boid, Swarm} from '../ocapunam/boids.js'
import OzRenderer from '../ocapunam/OzRenderer-finalDev.js'

let dt = 0

let terrain = new T.Object3D(), sky = new T.Object3D()

let subDiv = 64
let dim = 1e1


let ground = new T.Mesh(
    new T.PlaneGeometry(dim, dim, subDiv, subDiv),
    new T.MeshPhongMaterial({ color: 0xbea9de}))
    ground.rotation.set(-Math.PI/2,0,0)
    ground.castShadow = true
    ground.receiveShadow = true
    terrain.add(ground)

let starsGeometry = new T.Geometry();

for ( let i = 0; i < 10000; i ++ ) {

    let star = new T.Vector3();
    star.x = T.Math.randFloatSpread( 2000 );
    star.y = T.Math.randFloatSpread( 2000 );
    star.z = T.Math.randFloatSpread( 2000 );

    starsGeometry.vertices.push( star );

}

let starsMaterial = new T.PointsMaterial( { color: 0x888888 } );

let starField = new T.Points( starsGeometry, starsMaterial );

sky.add( starField );

let renderer = new OzRenderer({
    position: { x: 0, y: 10, z: 0 },
    background: 0x2e4482,
    ambient: 0x546bab,
    update: (t) => update(t),
    })

renderer.add(terrain, sky)

/// Boids ///

let bufferScene, bufferCamera
let rtTexture 
let swarm

let boidCount = 100

let bufferRenderer = new THREE.WebGLRenderer( { preserveDrawingBuffer: true } )
    bufferRenderer.setPixelRatio( window.devicePixelRatio );
    bufferRenderer.setSize(dim*100, dim*100)
    bufferRenderer.autoClear = false;


    document.body.appendChild(bufferRenderer.domElement)
    
    bufferScene = new THREE.Scene()

    bufferCamera = new THREE.OrthographicCamera( 0, sWidth, 0, sHeight, -10000, 10000 )
    bufferCamera.position.z = 1000

    swarm = new Swarm(sWidth, sHeight)
    swarm.createBoids(bufferScene, boidCount)
    // swarm.id = setInterval(swarm.animate, 100)

    rtTexture = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, {minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat })

function render() { 
    bufferRenderer.render(bufferScene, bufferCamera)
} 

function update(time) {
    dt += time
    starField.rotation.x = dt/500
    starField.rotation.y = dt/500
    // swarm.animate()
    render()
}



</script>

