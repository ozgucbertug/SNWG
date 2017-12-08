---
layout: full
title: Final Development
permalink: /code/ocapunam-boids/
author: Ozguc
---
<script deferred type="module">

import * as THREE from '../lib/module.js'
import {Boid, Swarm} from '../ocapunam/boids.js'

	
	let sWidth = window.innerWidth;
    let sHeight = window.innerHeight;

    let boidCount = 100

    var scene = new THREE.Scene( { preserveDrawingBuffer: true } );

    var camera = new THREE.OrthographicCamera( 0, sWidth, 0, sHeight, -10000, 10000 );

    var renderer = new THREE.WebGLRenderer();

    renderer.setSize(sWidth, sHeight);
    document.body.appendChild(renderer.domElement);
	
	let swarm = new Swarm(sWidth, sHeight)
        swarm.createBoids(scene, boidCount)
        swarm.id = setInterval(swarm.animate, 100)


    camera.position.z = 1000;

    function render() { 
        requestAnimationFrame(render);
        swarm.animate()
        console.log(swarm)
        renderer.render(scene, camera);
} 

    render();

</script>

