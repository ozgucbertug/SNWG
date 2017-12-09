---
layout: full
title: Final Development
permalink: /code/ocapunam-finalDev/
author: Ozguc
---


<canvas id="Boids" width="640" height="640" style="position: absolute; left: 0; top: 0;"></canvas>

<script deferred type="module">


import * as T from '../ocapunam/module.js   '

import OzRenderer from '../ocapunam/OzRenderer-finalDev.js'
import BoidsRenderer from '../ocapunam/BoidsRenderer.js'

let dt = 0

let terrain = new T.Object3D(), sky = new T.Object3D()

let subDiv = 256
let dim = 1e3

let boids = new BoidsRenderer({
    boidCount: 50,
    width: subDiv,
    height: subDiv,
    update: (dt) => update(dt),
})

// let rtMaterial = new T.MeshPhongMaterial({ color: 0xbea9de, map: boids.texture})
let rtMaterial = new T.MeshPhongMaterial({ color: 0xbea9de})
console.log(rtMaterial, boids.texture);

let ground = new T.Mesh(
    new T.PlaneGeometry(dim, dim, subDiv, subDiv), rtMaterial)
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


// boids.init()

function update(time) {
    dt += time
    starField.rotation.x = dt/500
    starField.rotation.y = dt/500
    // rtMaterial.map.needsUpdate = true
}

let renderer = new OzRenderer({
    position: { x: 0, y: 10, z: dim/2 },
    background: 0x2e4482,
    ambient: 0x546bab,
    update: (t) => update(t),
    })



renderer.add(terrain, sky)

</script>

