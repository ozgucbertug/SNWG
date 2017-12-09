---
layout: full
title: Final Development
permalink: /code/ocapunam-boidsTest/
author: Ozguc
---
<script deferred type="module">

import * as THREE from '../ocapunam/module.js'
import BoidsRenderer from '../ocapunam/BoidsRenderer.js'

let dt = 0


function update(time) {
    dt += time
    console.log(boids.texture)
}

let boids = new BoidsRenderer({
    boidCount: 50,
    width: 500,
    height: 500,
    update: (dt) => update(dt),
})

boids.init()

