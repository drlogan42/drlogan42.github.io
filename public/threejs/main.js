import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry.js';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { MathUtils } from 'three';

import { HDRLoader } from 'three/examples/jsm/loaders/HDRLoader.js';


/* Logan Shaffer CS335 Final Project

Textures used:
https://polyhaven.com/a/palm_bark
https://polyhaven.com/a/aerial_beach_01
https://polyhaven.com/a/autumn_field_puresky
https://3dtextures.me/2018/11/29/water-002/
*/

function start(){
    // =-= Scene Setup =-=
    let scene = new THREE.Scene();

    // HDRI Sky
    // FIX 2: Define your general image texture loader if it was missing
    const textureLoader = new THREE.TextureLoader();

    // FIX 3: Initialize HDRLoader instead of RGBELoader
    const hdrLoader = new HDRLoader();
    hdrLoader.load('/External/autumn_field_puresky_4k.hdr', function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    scene.environment = null;
    });

    // Camera
    let camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 5000);
    camera.position.set(0, 100, 100);
    camera.lookAt(new THREE.Vector3(0, 10, 0));

    // Renderer
    let renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.getElementById('webgl').appendChild(renderer.domElement);
    //Adjust for sky
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    // Add to scene
    renderer.render(scene,camera);
    scene.add(camera);

    //Orbit Controls
    let orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.target.set(0, 20, 0);

    // Pointer Lock Controls (First Person POV)
    let pointerControls = new PointerLockControls(camera, renderer.domElement);

    // Control switching variables
    let useOrbitControls = true;
    let controls = orbitControls;

    // Press Tab to switch between 1st person and orbit
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Tab') {
            event.preventDefault();
            switchControls();
        }
    });

    // In case user presses Esc to exit 1st person POV, switch back to orbit controls and drop flashlight
    document.addEventListener('pointerlockchange', function() {
        if (!document.pointerLockElement && !useOrbitControls) {
            orbitControls.enabled = true;
            controls = orbitControls;
            useOrbitControls = true;
            crosshair.style.display = 'none';
            dropFlashlight();
        }
    });

    // Movement for 1st person POV
    let moveSpeed = 500;
    let velocity = new THREE.Vector3();
    let direction = new THREE.Vector3();
    let moveForward = false;
    let moveBackward = false;
    let moveLeft = false;
    let moveRight = false;

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    // WASD for movement, G to drop, F to toggle light
    function onKeyDown(event) {
        switch (event.code) {
            case 'KeyW':
                moveForward = true;
                break;
            case 'KeyA':
                moveLeft = true;
                break;
            case 'KeyS':
                moveBackward = true;
                break;
            case 'KeyD':
                moveRight = true;
                break;
            case 'KeyG':
                dropFlashlight();
                break;
            case 'KeyF':
                if (flashlight.userData.spotLight) {
                    flashlight.userData.spotLight.visible = !flashlight.userData.spotLight.visible;
                }
                break;
        }
    }

    function onKeyUp(event) {
        switch (event.code) {
            case 'KeyW':
                moveForward = false;
                break;
            case 'KeyA':
                moveLeft = false;
                break;
            case 'KeyS':
                moveBackward = false;
                break;
            case 'KeyD':
                moveRight = false;
                break;
        }
    }

    // Switch between 1st person and orbit 
    function switchControls() {
        if (useOrbitControls) {
            // switch to 1st person, reset camera pos & rot, show crosshair
            orbitControls.enabled = false;            
            camera.position.set(0, 20, 50);
            camera.rotation.set(0, 0, 0);           
            pointerControls.lock();
            controls = pointerControls;
            useOrbitControls = false;
            crosshair.style.display = 'block';
        } else {
            // switch to orbit, hide crosshair
            dropFlashlight();
            crosshair.style.display = 'none';
            pointerControls.unlock();
            orbitControls.enabled = true;
            controls = orbitControls;
            useOrbitControls = true;
        }
    }

    // =-= Objects in Scene =-=

    // Tree
    let tree = getTree();
    tree.position.x = 30;
    tree.position.z = -40;
    scene.add(tree);

    //Land
    let land = getLand();
    land.position.y = -20;
    scene.add(land);

    //Water
    let water = getWater(4000, 4000);
    water.position.y = -13;
    water.rotation.x = -Math.PI/2;
    scene.add(water);

    // Firepit
    let firePit = getFirePit();
    firePit.position.x = 35;
    firePit.position.z = 45;
    firePit.position.y = 2;
    scene.add(firePit);

    // Fire Particles
    let particleCount = 500;        
    let particleSize = 5;           
    let fireWidth = 10;             
    let upwardSpeed = 2;            
    let driftAmount = 0.2;          
    let lifetimeMin = 1;            
    let lifetimeMax = 5;            
    let particleOpacity = 0.8;      
    let fireParticleAdd = fireParticles(particleCount, particleSize, fireWidth, upwardSpeed, driftAmount, lifetimeMin, lifetimeMax, particleOpacity);
    fireParticleAdd.position.copy(firePit.position);
    fireParticleAdd.position.y += 3;
    scene.add(fireParticleAdd);
    let fireClickCounter = 0;

    // Tent
    let tent = getTent();
    tent.position.x = 0;
    tent.position.z = 0;
    tent.position.y = 2.5;
    scene.add(tent);

    // Raft
    let raft = getRaft();
    raft.position.x = -90;
    raft.position.z = 40;
    raft.position.y = -5;
    raft.rotation.z = degToRad(10);
    raft.scale.set(2, 2, 2);
    scene.add(raft);

    // Flashlight
    let flashlight = getFlashlight();
    flashlight.position.y = 2;
    flashlight.position.x = 40;
    flashlight.rotation.z = degToRad(-90);
    scene.add(flashlight);
    let flashlightTarget = new THREE.Object3D();
    scene.add(flashlightTarget);

    function dropFlashlight() {
        if (flashlight.parent === camera) {
            // if held, drop by removing from camera and reset position, hide light
            camera.remove(flashlight);
            flashlight.position.set(40, 2, 0);
            flashlight.rotation.z = degToRad(-90);
            flashlight.userData.spotLight.visible = false;
            scene.add(flashlight);
        }
    }

    // =-= Raycaster for 1st person click detect =-=
    let raycaster = new THREE.Raycaster();
    let clickableObjects = [firePit, flashlight]; // only firepit and flashlight clickable

    // Crosshair dot (1st person view)
    let crosshair = document.createElement('div');
    crosshair.style.cssText = 'position:fixed;top:50%;left:50%;width:6px;height:6px;background:white;border-radius:50%;transform:translate(-50%,-50%);display:none;z-index:999;pointer-events:none;';
    document.body.appendChild(crosshair);

    // On click, if in 1st person, raycast to see if looking at firepit or flashlight and interact accordingly
    document.addEventListener('click', function() {
        if (!useOrbitControls && pointerControls.isLocked) {
            // raycast where crosshair is
            raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
            let intersects = raycaster.intersectObjects(clickableObjects, true);

            // if intersecting, find object
            if (intersects.length > 0) {
                let clickedObject = intersects[0].object;
                
                // travserse up heirarchy from mesh hit by raycast to find top level object (firepit or flashlight) to determine interaction
                // stops at scene to avoid infinite loop in case of error
                let parent = clickedObject;
                while (parent.parent && parent.parent !== scene) {
                    parent = parent.parent;
                }

                // if firepit, cycle through fire states. if flashlight, toggle pickup/drop
                if (parent === firePit) {
                    // Counter used to determine cycle of fire states: normal, incerased, or off
                    fireClickCounter += 1;
                    if (fireClickCounter > 2) fireClickCounter = 0;
                    fireClicked(fireClickCounter, fireParticleAdd, pointLight);
                } else if (parent === flashlight) {
                    // Toggle pickup/drop flashlight
                    if (flashlight.parent === scene) {
                        // Pick up flashlight by remove from scene and add to camera with offset
                        scene.remove(flashlight);
                        flashlight.position.set(1.5, -1, -2);
                        flashlight.rotation.set(0, 0, 0);
                        camera.add(flashlight);
                        flashlight.scale.set(0.5, 0.5, 0.5);
                        flashlight.rotation.z = degToRad(90);
                        flashlight.rotation.y = degToRad(-90);
                        // Point spotlight into scene
                        flashlight.userData.spotLight.target = flashlightTarget;

                    } else {
                        dropFlashlight();
                    }
                }
            }
        }
    });

    //Ambient Light (not pitch black)
    let ambientLight = getAmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);

    //Point Light (Fire)
    let pointLight = getPointLight(0xff6600, 2);
    pointLight.position.copy(firePit.position);
    pointLight.position.y += 10;
    scene.add(pointLight);

    //Directional Light (Sun)
    let directionalLight = getDirectionalLight(0xffffff, 1);
    scene.add(directionalLight);

    // Continuous render
    function render() {
        // Update flashlight target to follow camera direction
        if (flashlight.parent === camera) {
            let dir = new THREE.Vector3();
            camera.getWorldDirection(dir);
            let camPos = new THREE.Vector3();
            camera.getWorldPosition(camPos);
            flashlightTarget.position.copy(camPos).add(dir.multiplyScalar(50)); // point target infront of cam 
        }
        renderer.render(scene, camera);
        animateFire(fireParticleAdd, 0.016, fireWidth);
        // if in orbit update as normal, if 1st person handle movement 
        if (useOrbitControls) {
            orbitControls.update();
        } else {
            if (pointerControls.isLocked) {
                const delta = 0.01; // delta time for consistent movement speed on any machine
                
                // Slow down to 0 when not moving
                velocity.x -= velocity.x * 10.0 * delta;
                velocity.z -= velocity.z * 10.0 * delta;

                // Direction based on key presses, normalized to prevent faster diagonal movement
                direction.z = Number(moveForward) - Number(moveBackward);
                direction.x = Number(moveRight) - Number(moveLeft);
                direction.normalize();

                // Accelerate in direction of movement keys
                if (moveForward || moveBackward) velocity.z -= direction.z * moveSpeed * delta;
                if (moveLeft || moveRight) velocity.x -= direction.x * moveSpeed * delta;

                // Move camera based on velocity
                pointerControls.moveRight(-velocity.x * delta);
                pointerControls.moveForward(-velocity.z * delta);
            }
        }
        // Animate fire particles
        requestAnimationFrame(render);
    }
    // rendering loop
    render();
}

window.onload = start;

// =-= Functions called from within start() =-=

// Ambient Light
function getAmbientLight(color, intensity) {
    let light = new THREE.AmbientLight(color, intensity);
    return light;
}

// Cycle through fire states on click: normal, bigger, off
function fireClicked(fireClickCounter, particles, pointLight) {
    if (fireClickCounter === 0) {        // Click 1: Normal fire
        particles.visible = true;
        particles.material.size = 5;
        particles.material.opacity = 0.8;
        pointLight.intensity = 2;
    } else if (fireClickCounter === 1) { // Click 2: Bigger fire
        particles.visible = true;
        particles.material.size = 8;
        particles.material.upwardSpeed = 10;
        particles.material.fireWidth = 20;
        particles.material.opacity = 1.0;
        pointLight.intensity = 5;
    } else if (fireClickCounter === 2) { // Click 3: Fire off
        particles.visible = false;
        pointLight.intensity = 0;
    }
}

// Particles systsem for fire, adapted from threejs website and textbook
function fireParticles(particleCount, particleSize, fireWidth, upwardSpeed, driftAmount, lifetimeMin, lifetimeMax, particleOpacity) {
    // array for particles
    let pos = new Float32Array(particleCount * 3);
    let col = new Float32Array(particleCount * 3);
    let vel = [];
    let life = [];

    // Init each particle
    for (let i = 0; i < particleCount; i++){
        let index = i * 3;

        // start position
        pos[index] = (Math.random() - 0.5) * fireWidth;      
        pos[index + 1] = Math.random() * 2;          
        pos[index + 2] = (Math.random() - 0.5) * fireWidth;
        
        // fire colors
        col[index] = 1;
        col[index + 1] = Math.random() * 0.5;
        col[index + 2] = 0;

        //velocity
        vel.push({
            x: (Math.random() - 0.5) * driftAmount,
            y: Math.random() * upwardSpeed + 0.3,             
            z: (Math.random() - 0.5) * driftAmount
        });

        // lifetime per particle
        life.push(Math.random() * (lifetimeMax - lifetimeMin) + lifetimeMin);
    }

    //geometry and material
    let geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(col, 3));

    let material = new THREE.PointsMaterial({
        size: particleSize,         
        vertexColors: true,
        transparent: true,
        opacity: particleOpacity, 
        blending: THREE.AdditiveBlending 
    });

    let particles = new THREE.Points(geometry, material);

    //store anim data
    particles.userData = {
        velocities: vel,
        lifetimes: life,
        maxLifetime: life.slice()
    };
    
    return particles;
}

// Animate fire particles
function animateFire(particles, delta, fireWidth) {
    // Update position, lifetime, and color of each particle
    let pos = particles.geometry.attributes.position.array;
    let col = particles.geometry.attributes.color.array;
    let vel = particles.userData.velocities;
    let life = particles.userData.lifetimes;
    let maxLifetime = particles.userData.maxLifetime;

    // for each particle, update position based on velocity, decrease lifetime, fade color based on lifetime, and reset if life ended
    for (let i = 0; i < pos.length / 3; i++) {
    let index = i * 3;  // index for x, y, z of particle i
    // Update position
    pos[index] += vel[i].x * delta;
    pos[index + 1] += vel[i].y * delta;
    pos[index + 2] += vel[i].z * delta;

    // Update lifetime
    life[i] -= delta;

    // fade color based on lifetime
    let lifeRatio = life[i] / maxLifetime[i];
    col[index + 1] = lifeRatio * 0.5;

    // Reset particle if life ended
    if (life[i] <= 0) {
            pos[index] = (Math.random() - 0.5) * fireWidth;  
            pos[index + 1] = 0;
            pos[index + 2] = (Math.random() - 0.5) * fireWidth;
            life[i] = maxLifetime[i];
            col[index + 1] = Math.random() * 0.6;
        }
    } 
    // attributes needing update
    particles.geometry.attributes.position.needsUpdate = true;
    particles.geometry.attributes.color.needsUpdate = true;
}

// Directional light (Mock Sun in place of HDRI for shadows)
function getDirectionalLight(color, intensity) {
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(100, 200, 100);
    light.castShadow = true;
    light.shadow.mapSize.width = 4096;
    light.shadow.mapSize.height = 4096;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 5000;
    light.shadow.camera.left = -300;
    light.shadow.camera.right = 300;
    light.shadow.camera.top = 300;
    light.shadow.camera.bottom = -300;
    light.shadow.bias = -0.001;
    return light;
}

// Flashlight object with spotlight as child with toggle
function getFlashlight(){
    // colors
    let baseColor = 0x262b32;
    let coreColor = 0xc09f2f;
    let topColor = 0xbbc5ce;

    // Geometry and materials
    let baseRadius = 1;
    let baseHeight = 1;
    let baseSegments = 5;
    let baseGeometry = new THREE.CylinderGeometry(baseRadius, baseRadius, baseHeight, baseSegments);
    let baseMaterial = new THREE.MeshPhongMaterial({color: baseColor, side: THREE.DoubleSide});
    let coreMaterial = new THREE.MeshPhongMaterial({color: coreColor, side: THREE.DoubleSide});
    let topMaterial = new THREE.MeshPhongMaterial({color: topColor, side: THREE.DoubleSide});
    let base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.castShadow = true;
    base.receiveShadow = true;
    let group = new THREE.Group();

    // Construct full geometry
    let base2 = base.clone();
    base2.scale.set(2, 1, 2);
    base2.position.y = 6;
    base2.castShadow = true;
    base2.receiveShadow = true;

    let top = base.clone();
    top.scale.set(1.7, 0.5, 1.7);
    top.position.y = 6.5;
    top.material = topMaterial;
    top.castShadow = true;
    top.receiveShadow = true;

    let core = base.clone();
    core.scale.set(1, 4, 1);
    core.position.y = 2.5;
    core.material = coreMaterial;
    core.castShadow = true;
    core.receiveShadow = true;

    group.add(core);
    group.add(base);
    group.add(base2);
    group.add(top);


    // Cone for top of flashlight 
    let coneRadius = 1.5;
    let coneHeight = 5;
    let coneRadialSeg = 32;
    let coneGeometry = new THREE.ConeGeometry(coneRadius, coneHeight, coneRadialSeg);
    let cone = new THREE.Mesh(coneGeometry, topMaterial);
    cone.position.y = 3.5;
    cone.scale.set(1, 1, 1);
    cone.rotation.x = degToRad(180);
    cone.material = coreMaterial;
    cone.castShadow = true;
    cone.receiveShadow = true;
    group.add(cone);

    //Button for turning on off (visual only)
    let buttonColor = 0x000000;
    let buttonWidth = 0.4;
    let buttonHeight = 0.8;
    let buttonDepth = 0.4;
    let buttonGeometry = new THREE.BoxGeometry(buttonWidth, buttonHeight, buttonDepth);
    let buttonMaterial = new THREE.MeshPhongMaterial({color: buttonColor, side: THREE.DoubleSide});
    let button = new THREE.Mesh(buttonGeometry, buttonMaterial);
    button.position.y = 2.5;
    button.position.z = 1;
    button.castShadow = true;
    button.receiveShadow = true;
    group.add(button);

    // Flashlight SpotLight (starts off)
    let spotLight = new THREE.SpotLight(0xffffff, 5);
    spotLight.angle = Math.PI / 6;
    spotLight.penumbra = 0.3;
    spotLight.decay = 0.5;
    spotLight.distance = 200;
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.bias = -0.0005;
    spotLight.visible = false;
    spotLight.position.set(0, 7, 0); // At tip of flashlight
    group.add(spotLight);
    group.add(spotLight.target);
    spotLight.target.position.set(0, 15, 0); // Point along flashlight axis
    group.userData.spotLight = spotLight;

    return group;
}

// Raft made of logs with rope to tie together, with mast and sail
function getRaft(){
    let woodColor = 0xbb6e50;
    let ropeColor = 0xefbf8a;

    //cylinders for logs
    let logRadius = 1;
    let logHeight = 50;
    let logSegments = 6;
    let logGeometry = new THREE.CylinderGeometry( logRadius, logRadius, logHeight, logSegments);
    let logMaterial = new THREE.MeshPhongMaterial({color: woodColor,side: THREE.DoubleSide});
    let log = new THREE.Mesh( logGeometry, logMaterial );
    log.castShadow = true;
    log.receiveShadow = true;
    let group = new THREE.Group();
    group.castShadow = true;
    group.receiveShadow = true;

    // Logs in raft
    let log1 = log.clone();
    log1.position.x = -5;
    log1.position.y = 0;
    log1.position.z = 0;
    log1.rotation.z = degToRad(90);

    let log2 = log.clone();
    log2.position.x = -7;
    log2.position.y = 0;
    log2.position.z = 2;
    log2.rotation.z = degToRad(90);

    let log3 = log1.clone();
    log3.position.z = 4;

    let log4 = log2.clone();
    log4.position.z = 6;
    log4.position.x = -2;

    let log5 = log1.clone();
    log5.position.x = -4;
    log5.position.z = 8;

    let log6 = log2.clone();
    log6.position.x = -4;
    log6.position.z = 10;

    let log7 = log1.clone();
    log7.position.x = -2;
    log7.position.z = 12;

    let log8 = log2.clone();
    log8.position.x = -6;
    log8.position.z = 14;

    let log9 = log1.clone();
    log9.position.x = -3;
    log9.position.z = 16;

    let log10 = log2.clone();
    log10.position.x = 0;
    log10.position.z = 18;

    let log11 = log1.clone();
    log11.position.x = -2;
    log11.position.z = 20;
    
    let log12 = log2.clone();
    log12.position.x = -5;
    log12.position.z = 22;

    group.add(log1);
    group.add(log2);
    group.add(log3);
    group.add(log4);
    group.add(log5);
    group.add(log6);
    group.add(log7);
    group.add(log8);
    group.add(log9);
    group.add(log10);
    group.add(log11);
    group.add(log12);

    // Log Ropes
    let ropeRadius = 1.2;
    let ropeHeight = 1;
    let ropeSegments = 5;
    let ropeGeometry = new THREE.CylinderGeometry( ropeRadius, ropeRadius, ropeHeight, ropeSegments);
    let ropeMaterial = new THREE.MeshPhongMaterial({color: ropeColor,side: THREE.DoubleSide});
    let rope = new THREE.Mesh( ropeGeometry, ropeMaterial );
    rope.castShadow = true;
    rope.receiveShadow = true;

    let rope1 = rope.clone();
    rope1.position.x = -24;
    rope1.position.y = 0;
    rope1.position.z = 0;
    rope1.rotation.z = degToRad(90);
    rope1.rotation.x = degToRad(90);
    group.add(rope1);

    let rope2 = rope.clone();
    rope2.position.x = 16;
    rope2.position.y = 0;
    rope2.position.z = 0;
    rope2.rotation.z = degToRad(90);
    rope2.rotation.x = degToRad(90);
    group.add(rope2);

    // loops to add rope segments easily 
    for (let i = 0; i < 12; i++){
        let rope = rope1.clone();
        rope.position.z = i*2;
        group.add(rope);
    }

    for (let i = 0; i < 12; i++){
        let rope = rope2.clone();
        rope.position.z = i*2;
        group.add(rope);
    }

    // Mast
    let mastColor = 0xbb6e50;
    let mastRadius = 1;
    let mastHeight = 30;
    let mastSegments = 5;
    let mastGeometry = new THREE.CylinderGeometry( mastRadius, mastRadius, mastHeight, mastSegments);
    let mastMaterial = new THREE.MeshPhongMaterial({color: mastColor,side: THREE.DoubleSide});
    let mast = new THREE.Mesh( mastGeometry, mastMaterial );
    mast.castShadow = true;
    mast.receiveShadow = true;
    mast.position.y = mastHeight / 2;
    mast.position.z = 11;
    group.add(mast);

    let mast2 = mast.clone();
    mast2.position.y = 25;
    mast2.rotation.x = degToRad(90);
    mast2.scale.y = 0.75;
    mast2.castShadow = true;
    mast2.receiveShadow = true;
    group.add(mast2);


    // Sail
    let sailColor = 0xffffff;
    let sailGeometry = new THREE.PlaneGeometry(15, 20, 8, 10);
    let sailMaterial = new THREE.MeshPhongMaterial({color: sailColor,side: THREE.DoubleSide});

    // Curve the sail by manipulating vertices (adapted from threejs parametric geometry example)
    let position = sailGeometry.attributes.position;
    for (let i = 0; i < position.count; i++) {
        let x = position.getX(i);
        let y = position.getY(i);
        let curveStrength = 5;
        let z = Math.sin((x + 7.5) / 15 * Math.PI) * curveStrength * (y + 10) / 10;
        position.setZ(i, z);
    }

    let sail = new THREE.Mesh(sailGeometry, sailMaterial);
    sail.castShadow = true;
    sail.receiveShadow = true;

    sail.rotation.y = degToRad(90);
    sail.position.y = 20;
    sail.position.z = 11;
    sail.scale.x = 1.5;
    group.add(sail);
    return group;
}

// Tent made of planes, poles, and stakes with rope connecting stakes to poles 
function getTent(){
    let tentColor = 0xc25244;
    let group = new THREE.Group();

    // Base
    let tentBase = getPlane(30, 50, tentColor);
    tentBase.rotation.x = -Math.PI/2;
    tentBase.receiveShadow = true;

    // Tent Sides
    let tentSide1 = getPlane(5, 50, tentColor);
    tentSide1.castShadow = true;
    tentSide1.receiveShadow = true;
    tentSide1.rotation.y = degToRad(60);
    tentSide1.rotation.x = degToRad(90);
    tentSide1.position.x = 16.25;
    tentSide1.position.y = 2.15;

    let tentSide2 = getPlane(5, 50, tentColor);
    tentSide2.castShadow = true;
    tentSide2.receiveShadow = true;
    tentSide2.rotation.y = degToRad(-60);
    tentSide2.rotation.x = degToRad(90);
    tentSide2.position.x = -16.25;
    tentSide2.position.y = 2.15;

    let tentSide3 = getPlane(35.2, 50, tentColor);
    tentSide3.castShadow = true;
    tentSide3.receiveShadow = true;
    tentSide3.rotation.y = degToRad(120);
    tentSide3.rotation.x = degToRad(90);
    tentSide3.position.x = 8.75;
    tentSide3.position.y = 19.5;    

    let tentSide4 = getPlane(35.2, 50, tentColor);
    tentSide4.castShadow = true;
    tentSide4.receiveShadow = true;
    tentSide4.rotation.y = degToRad(-120);
    tentSide4.rotation.x = degToRad(90);
    tentSide4.position.x = -8.75;
    tentSide4.position.y = 19.5;

    // Tent Poles
    let poleColor = 0x71341a;
    let poleRadius = 0.5;
    let poleHeight = 40;
    let poleSegments = 8;
    let geometry = new THREE.CylinderGeometry( poleRadius, poleRadius, poleHeight, poleSegments);
    let poleMaterial = new THREE.MeshPhongMaterial({color: poleColor,side: THREE.DoubleSide});
    let cylinder = new THREE.Mesh( geometry, poleMaterial );
    cylinder.castShadow = true;
    cylinder.receiveShadow = true;

    let pole1 = cylinder.clone();
    pole1.position.y = 17;
    pole1.position.z = 25;

    let pole2 = cylinder.clone();
    pole2.position.y = 17;
    pole2.position.z = -25;

    let pole3 = cylinder.clone();
    pole3.scale.y = 1.25;
    pole3.position.y = 33;
    pole3.rotation.x = degToRad(90);

    // Stakes
    let stakeColor = 0x808080;
    let stakeRadius = 0.5;
    let stakeHeight = 5;
    let stakeRadialSeg = 8;
    let stakeGeometry = new THREE.ConeGeometry(stakeRadius, stakeHeight, stakeRadialSeg);
    let stakeMaterial = new THREE.MeshPhongMaterial({color: stakeColor,side: THREE.DoubleSide});
    let stake = new THREE.Mesh(stakeGeometry, stakeMaterial);
    stake.castShadow = true;

    let stake1 = stake.clone();
    stake1.position.y = -2;
    stake1.position.z = 40;
    stake1.rotation.x = degToRad(180);

    let stake2 = stake.clone();
    stake2.position.y = -2;
    stake2.position.z = -40;
    stake2.rotation.x = degToRad(180);

    let stake3 = stake.clone();
    stake3.position.y = -2;
    stake3.position.x = -30;
    stake3.position.z = -25;
    stake3.rotation.x = degToRad(180);

    let stake4 = stake.clone();
    stake4.position.y = -2;
    stake4.position.x = 30;
    stake4.position.z = -25;
    stake4.rotation.x = degToRad(180);

    let stake5 = stake.clone();
    stake5.position.y = -2;
    stake5.position.x = -30;
    stake5.position.z = 25;
    stake5.rotation.x = degToRad(180);

    let stake6 = stake.clone();
    stake6.position.y = -2;
    stake6.position.x = 30;
    stake6.position.z = 25;
    stake6.rotation.x = degToRad(180);

    // Connecting stake to pole with rope
    let ropeColor = 0x000000; 
    let ropeRadius = 0.1;
    let ropeHeight = 13.5;
    let ropeSegments = 8;
    let ropeGeometry = new THREE.CylinderGeometry( ropeRadius, ropeRadius, ropeHeight, ropeSegments);
    let ropeMaterial = new THREE.MeshPhongMaterial({color: ropeColor,side: THREE.DoubleSide});
    let rope = new THREE.Mesh( ropeGeometry, ropeMaterial );
    rope.castShadow = true;

    let rope1 = rope.clone();
    rope1.position.y = 2;
    rope1.position.z = 25;
    rope1.position.x = 23.8;
    rope1.rotation.z = degToRad(70);

    let rope2 = rope.clone();
    rope2.position.y = 2;
    rope2.position.z = -25;
    rope2.position.x = 23.8;
    rope2.rotation.z = degToRad(70);

    let rope3 = rope.clone();
    rope3.position.y = 2;
    rope3.position.z = 25;
    rope3.position.x = -23.8;
    rope3.rotation.z = degToRad(-70);

    let rope4 = rope.clone();
    rope4.position.y = 2;
    rope4.position.z = -25;
    rope4.position.x = -23.8;
    rope4.rotation.z = degToRad(-70);

    // Longer ropes
    let rope5 = rope.clone();
    rope5.position.y = 14;
    rope5.position.z = 34;
    rope5.rotation.x = degToRad(-21);
    rope5.scale.y = 3.5;

    let rope6 = rope.clone();
    rope6.position.y = 14;
    rope6.position.z = -34;
    rope6.rotation.x = degToRad(21);
    rope6.scale.y = 3.5;

    //tent cover front and back
    let cover1 = getCustomPlane(tentColor);
    cover1.position.z = 25;
    
    let cover2 = getCustomPlane(tentColor);
    cover2.position.z = -25;

    let cover3 = getCustomPlane(tentColor);
    cover3.position.z = 25;
    cover3.rotation.y = degToRad(180);

    let cover4 = getCustomPlane(tentColor);
    cover4.position.z = -25;
    cover4.rotation.y = degToRad(180);

    // Sleeping Bag
    let bagColor = 0x3b5eae;
    let pillowColor = 0x1ca3ec;
    let bagWidth = 15;
    let bagHeight = 1;
    let bagDepth = 25;

    let pillowWidth = 14;
    let pillowHeight = 0.5;
    let pillowDepth = 5;
    let bagGeometry = new THREE.BoxGeometry(bagWidth, bagHeight, bagDepth);
    let bagMaterial = new THREE.MeshPhongMaterial({color: bagColor,side: THREE.DoubleSide});
    let bag = new THREE.Mesh(bagGeometry, bagMaterial);

    let pillowGeometry = new THREE.BoxGeometry(pillowWidth, pillowHeight, pillowDepth);
    let pillowMaterial = new THREE.MeshPhongMaterial({color: pillowColor,side: THREE.DoubleSide});
    let pillow = new THREE.Mesh(pillowGeometry, pillowMaterial);

    bag.position.y = 1.5;
    bag.position.z = -7.5;

    pillow.position.y = 2.5;
    pillow.position.z = -18;

    group.add(bag);
    group.add(pillow);
    group.add(cover1);
    group.add(cover2);
    group.add(cover3);
    group.add(cover4);
    group.add(rope1);
    group.add(rope2);
    group.add(rope3);
    group.add(rope4);
    group.add(rope5);
    group.add(rope6);
    group.add(stake1);
    group.add(stake2);
    group.add(stake3);
    group.add(stake4);
    group.add(stake5);
    group.add(stake6);
    group.add(pole1);
    group.add(pole2);
    group.add(pole3);
    group.add(tentBase);
    group.add(tentSide1);
    group.add(tentSide2);
    group.add(tentSide3);
    group.add(tentSide4);
    return group;
}

// Shape for front and back of tent to cover the faces
function getCustomPlane(color) {
    let shape = new THREE.Shape();
    shape.moveTo(-15,0);
    shape.lineTo(-17.49, 4.37);
    shape.lineTo(0, 35);
    shape.lineTo(0, 25);
    shape.lineTo(-10, 0);
    shape.lineTo(-15, 0);
    let geometry = new THREE.ShapeGeometry(shape);
    let material = new THREE.MeshPhongMaterial({color: color, side: THREE.DoubleSide});
    let mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
}

// Simple plane
function getPlane(sizeX, sizeY, color) {
    let geometry = new THREE.PlaneGeometry(sizeX, sizeY);
    let material = new THREE.MeshPhongMaterial({color: color,side: THREE.DoubleSide});
    let mesh = new THREE.Mesh(geometry, material);
    mesh.receiveShadow = true;
    return mesh;
}

// Firepit made of rocks in a ring and logs in middle
function getFirePit(){
    let rockColor = 0x808080;
    let rockRadius = 3;
    let rockDetail = 0;
    let rockGeometry = new THREE.DodecahedronGeometry(rockRadius, rockDetail);
    let rockMaterial = new THREE.MeshPhongMaterial({color: rockColor,side: THREE.DoubleSide});    
    let dodecahedron = new THREE.Mesh( rockGeometry, rockMaterial );
    dodecahedron.castShadow = true;
    dodecahedron.receiveShadow = true;
    let group = new THREE.Group();

    //Rocks in Ring
    let rockRingRadius = 8;
    let numRocks = 12;
    for (let i = 0; i < numRocks; i++) {
        let angle = (i / numRocks) * Math.PI * 2;
        let rock = dodecahedron.clone();
        rock.position.x = rockRingRadius * Math.cos(angle);
        rock.position.z = rockRingRadius * Math.sin(angle);
        // each rock has a random rotation
        rock.rotation.y = THREE.MathUtils.seededRandom() * Math.PI;
        rock.rotation.z = THREE.MathUtils.seededRandom() * Math.PI;
        rock.rotation.x = THREE.MathUtils.seededRandom() * Math.PI;
        group.add(rock);
    }

    // Logs inside pit
    let logColor = 0x71341a;
    let logRadius = 1;
    let logHeight = 12;
    let logSegments = 5;
    let geometry = new THREE.CylinderGeometry( logRadius, logRadius, logHeight, logSegments);
    let LogMaterial = new THREE.MeshPhongMaterial({color: logColor,side: THREE.DoubleSide});
    let cylinder = new THREE.Mesh( geometry, LogMaterial );
    cylinder.castShadow = true;
    cylinder.receiveShadow = true;
    
    // Logs in Ring
    let logRingRadius = 4;
    let numLogs = 5;
    for (let i = 0; i < numLogs; i++) {
        let angle = (i / numLogs) * Math.PI * 2;
        let log = cylinder.clone();
        log.position.x = logRingRadius * Math.cos(angle);
        log.position.z = logRingRadius * Math.sin(angle);
        log.position.y = 2;
        log.lookAt(0, 0, 0);
        group.add(log);
    }
    return group;
}

// Palm tree made of stacked upside down cones for trunk and extruded shape for leaves, with bark texture on trunk 
function getTree(){
    // Tree Cone Param
    let coneRadius = 5;
    let coneHeight = 20;
    let coneRadialSeg = 8;
    let coneColor = 0x937747;
    let coneHeightSeg = 8;
    
    // texture mapped
    const textureLoader = new THREE.TextureLoader();
    const exrLoader = new EXRLoader();
    const aoMap = textureLoader.load('/External/TreeTextures/palm_bark_ao_1k.jpg');
    const armMap = textureLoader.load('/External/TreeTextures/palm_bark_arm_1k.jpg');
    const diffMap = textureLoader.load('/External/TreeTextures/palm_bark_diff_1k.jpg');
    const dispMap = textureLoader.load('/External/TreeTextures/palm_bark_disp_1k.png');
    const normalMap = exrLoader.load('/External/TreeTextures/palm_bark_nor_gl_1k.exr');
    const roughMap = exrLoader.load('/External/TreeTextures/palm_bark_rough_1k.exr');
    let geometry = new THREE.ConeGeometry(coneRadius, coneHeight, coneRadialSeg, coneHeightSeg);
    //geometry.scale(scalesize.x, scalesize.y, scalesize.z);
    const material = new THREE.MeshStandardMaterial({
        aoMap: aoMap,                
        map: diffMap,                
        normalMap: normalMap,        
        roughnessMap: roughMap,      
        metalnessMap: armMap,        
        displacementScale: 0       
    });    
    let group = new THREE.Group();
    for (let i = 1; i <= 20; i++){
        let cone = new THREE.Mesh(geometry, material);
        cone.castShadow = true;
        cone.receiveShadow = true;
        cone.position.y = coneHeight/4 * i;
        cone.rotation.x = Math.PI;
        group.add(cone);
    }
    group.position.y = -coneHeight/2;
    
    // Leaf
    let leaf = getLeaf();
    leaf.position.y = 107;
    leaf.position.z -= 5;
    leaf.rotation.z = degToRad(-45);
   
    let leaf2 = leaf.clone();
    leaf2.position.x -= 5;
    leaf2.position.z += 5;
    leaf2.rotation.y = degToRad(90);
  
    let leaf3 = leaf.clone();
    leaf3.position.x += 5;
    leaf3.position.z += 5;
    leaf3.rotation.y = degToRad(-90);

    let leaf4 = leaf.clone();
    leaf4.position.z += 10;
    leaf4.rotation.y = degToRad(180);

    let leaf5 = leaf.clone();
    leaf5.rotation.y = degToRad(45);
    leaf5.rotation.z = degToRad(-35);

    let leaf6 = leaf.clone();
    leaf6.rotation.y = degToRad(-45);
    leaf6.rotation.z = degToRad(-30);
    leaf6.position.z += 2;
    leaf6.position.x += 6;

    let leaf7 = leaf.clone();
    leaf7.rotation.y = degToRad(135);
    leaf7.rotation.z = degToRad(-30);
    leaf7.position.z += 10;
    leaf7.position.x -= 3;

    let leaf8 = leaf.clone();
    leaf8.rotation.y = degToRad(-135);
    leaf8.rotation.z = degToRad(-30);
    leaf8.position.z += 10;
    leaf8.position.x += 3;

    group.add(leaf);
    group.add(leaf2);
    group.add(leaf3);
    group.add(leaf4);
    group.add(leaf5);
    group.add(leaf6);
    group.add(leaf7);
    group.add(leaf8);
    return group;
}

// Leaf shape extruded geometry to look like palm leaf
function getLeaf(){
    let shape = new THREE.Shape();
    let scalesize = new THREE.Vector3(2, 1, 1);

    shape.moveTo(0, 0);
    shape.lineTo(3, 5);
    shape.lineTo(7, 8);
    shape.lineTo(13, 11);
    shape.lineTo(22, 13);
    shape.lineTo(20, 14);
    shape.lineTo(10, 12);
    shape.lineTo(5, 9);
    shape.lineTo(1, 6);
    shape.lineTo(-2, 1);

    let extrudeSettings = {
        steps: 1,
        depth: 10,
        bevelEnabled: true,
        bevelThickness: 0.5,
        bevelSize: 0.5,
        bevelSegments: 1
    };
    let geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geometry.scale(scalesize.x, scalesize.y, scalesize.z);
    let material = new THREE.MeshPhongMaterial({ color: 0x38d760, side: THREE.DoubleSide });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
}

// Land is scaled sphere with sand texture mapped to look like small island beach 
function getLand(){
    let scalesize = new THREE.Vector3(9, 1.5, 9);
    let radius = 15;
    let widthSegments = 32;
    let heightSegments = 16;

    //Texture Map
    const textureLoader = new THREE.TextureLoader();
    const exrLoader = new EXRLoader();
    const aoMap = textureLoader.load('/External/SandTextures/aerial_beach_01_ao_1k.jpg');
    const armMap = textureLoader.load('/External/SandTextures/aerial_beach_01_arm_1k.jpg');
    const diffMap = textureLoader.load('/External/SandTextures/aerial_beach_01_diff_1k.jpg');
    const dispMap = textureLoader.load('/External/SandTextures/aerial_beach_01_disp_1k.png');
    const normalMap = exrLoader.load('/External/SandTextures/aerial_beach_01_nor_gl_1k.exr');
    const roughMap = exrLoader.load('/External/SandTextures/aerial_beach_01_rough_1k.exr');
    const geometry = new THREE.SphereGeometry( radius, widthSegments, heightSegments );
    geometry.scale(scalesize.x, scalesize.y, scalesize.z);
    const material = new THREE.MeshStandardMaterial({
        aoMap: aoMap,                
        map: diffMap,                
        normalMap: normalMap,        
        roughnessMap: roughMap,      
        metalnessMap: armMap,        
        displacementMap: dispMap,    
        displacementScale: 0.1       
    });    
    const mesh = new THREE.Mesh( geometry, material );
    mesh.castShadow = false;
    mesh.receiveShadow = true;
    return mesh;
}

// Water is plane with texture map to look like ocean water
function getWater(sizeX, sizeY) {
    const textureLoader = new THREE.TextureLoader();
    const diffMap = textureLoader.load('/External/WaterTextures/Water_002_COLOR.jpg');
    const normalMap = textureLoader.load('/External/WaterTextures/Water_002_NORM.jpg');
    const dispMap = textureLoader.load('/External/WaterTextures/Water_002_DISP.png');
    const occMap = textureLoader.load('/External/WaterTextures/Water_002_OCC.jpg');
    const roughMap = textureLoader.load('/External/WaterTextures/Water_002_ROUGH.jpg');
    // texture wrapped for tiling
    [diffMap, normalMap, dispMap, occMap, roughMap].forEach(t => {
        t.wrapS = t.wrapT = THREE.RepeatWrapping;
        t.repeat.set(50, 50);
    });
    let geometry = new THREE.PlaneGeometry(sizeX, sizeY);
    let material = new THREE.MeshStandardMaterial({
        map: diffMap,
        normalMap: normalMap,
        displacementMap: dispMap,
        displacementScale: 0.1,
        aoMap: occMap,
        roughnessMap: roughMap,
        side: THREE.DoubleSide
    });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.receiveShadow = true;
    return mesh;
}

// Point light for fire
function getPointLight(color, intensity) {
    let light = new THREE.PointLight(color, intensity, 200);
    light.decay = 0.1;
    light.castShadow = true;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 100;
    light.shadow.bias = -0.0005;
    return light;
}

// Helper conversion function
function degToRad(degrees) {
    return THREE.MathUtils.degToRad(degrees);
}