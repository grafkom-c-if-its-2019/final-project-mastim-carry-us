(function() {
    const loader = new THREE.TextureLoader();
    var arrow = ['UP', 'BOTTOM', 'RIGHT', 'LEFT'];
    var notNot = ['NOT'];
    var bgTexture = loader.load('Image/2738574.jpg');
    var scene = new THREE.Scene();
    scene.background = bgTexture;
    var posPerintah = Math.floor(Math.random() * 4);
    var perintah = arrow[posPerintah];
    var text = perintah;
    var numOfNot = 0;
    var score = 0;
    var textMaterial;
    var mesh;
    var gameplay = new Audio('assets/gameplay.mp3');
    var chicken = new Audio('assets/chicken.wav');
    var laugh = new Audio('assets/title_laugh.mp3');
    // var secs = 3;
    console.log(text);

    gameplay.play();

    var loader4 = new THREE.GLTFLoader();
    var mixer;
    var mesh3;
    // var mesh4;

    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    scene.add(camera);

    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(1, 1, 0));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;

    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    camera.position.x = 0;
    camera.position.y = 35;
    camera.position.z = 20;
    camera.lookAt(scene.position);

    function load_font(textCube) {
        var loader2 = new THREE.FontLoader();
        loader2.load('fonts/helvetiker_regular.typeface.json', function( res ) {
            font = res;
            createText(textCube);
        });
    }

    function createText(textCube) {
        var textGeometry = new THREE.TextGeometry(textCube, {
            font : font,
            size : 1,
            height: 0.1,
            curveSegments: 0,
            bevelThickness: 0,
            bevelSize: 0,
            bevelEnabled: false
        });
        textGeometry.computeBoundingBox();
        textGeometry.center();

        textMaterial = new THREE.MeshLambertMaterial( 
            { color: 0x006fff, specular: 0xffffff }
        );

        mesh = new THREE.Mesh( textGeometry, textMaterial );

        // mesh.position.x = -3.5;
        mesh.position.z = 1;
        mesh.position.y = 7;

        mesh.rotation.x -= Math.PI / 2;

        scene.add( mesh );
    }

    load_font(text);

    function removeText(object) {
        scene.remove(object);
        object.geometry.dispose();
        object.material.dispose();
        object = undefined;
    }
    function updateText(textCube) {
        // removeText(mesh);
        createText(textCube);
    }
    var cubeGeometry = new THREE.BoxGeometry(12, 12, 12);
    var meshMaterial = new THREE.MeshLambertMaterial({color: 0x171717});
    // var cubeMaterials = [
    //     new THREE.MeshLambertMaterial({color: 000000}), // Right
    //     new THREE.MeshLambertMaterial({color: 0x0f0f0f}), // Left
    //     new THREE.MeshLambertMaterial({color: 0xff00ff}), // Top
    //     new THREE.MeshLambertMaterial({color: 000000}), // Bottom
    //     new THREE.MeshLambertMaterial({color: 0xffffff}), // Front
    //     new THREE.MeshLambertMaterial({color: 0x00ff00}), // Back
    // ]
    // var cubeMaterial = new THREE.MeshFaceMaterial(cubeMaterials);
    var cube = new THREE.Mesh(cubeGeometry, meshMaterial);

    cube.position.x = 0;
    cube.position.y = 0;
    cube.position.z = 0;

    scene.add(cube);

    function updateScore() {
        scoreboard();
    }

    function load_font2() {
        var loader2 = new THREE.FontLoader();
        loader2.load('fonts/helvetiker_regular.typeface.json', function( res ) {
            font = res;
            scoreboard();
        });
    }

    function scoreboard() {
        var textGeometry2 = new THREE.TextGeometry('Score: '+ score, {
            font : font,
            size : 1,
            height: 0.1,
            curveSegments: 0,
            bevelThickness: 0,
            bevelSize: 0,
            bevelEnabled: false
        });
        textGeometry2.computeBoundingBox();
        textGeometry2.center();

        textMaterial2 = new THREE.MeshLambertMaterial( 
            { color: 0xffffff, specular: 0xffffff }
        );

        mesh2 = new THREE.Mesh( textGeometry2, textMaterial2 );

        // mesh.position.x = -3.5;
        mesh2.position.z = 13;
        mesh2.position.y = 8;
        // mesh2.position.x = -4;

        mesh2.rotation.x -= Math.PI / 2;

        scene.add( mesh2 );
    }

    load_font2();

    
    function resetTimer() {
        timer();
    }

    function load_font3() {
        var loader3 = new THREE.FontLoader();
        loader3.load('fonts/helvetiker_regular.typeface.json', function( res ) {
            font = res;
            console.log(res)
            timer();
        });
    }

    function timer() {
        countdown();
        // var textGeometry3 = new THREE.TextGeometry('Time: '+ dispsec, {
        //     font : font,
        //     size : 1,
        //     height: 0.1,
        //     curveSegments: 0,
        //     bevelThickness: 0,
        //     bevelSize: 0,
        //     bevelEnabled: false
        // });
        // textGeometry3.computeBoundingBox();
        // textGeometry3.center();

        // textMaterial3 = new THREE.MeshLambertMaterial( 
        //     { color: 0xffffff, specular: 0xffffff }
        // );

        // mesh4 = new THREE.Mesh( textGeometry3, textMaterial3 );

        // // mesh.position.x = -3.5;
        // mesh4.position.z = 13;
        // mesh4.position.y = 8;
        // mesh4.position.x = 4;

        // mesh4.rotation.x -= Math.PI / 2;

        // scene.add( mesh4 );
    }

    // load_font3();

    loader4.load('assets/scene.gltf', function (gltf){
       
        mesh3 = gltf.scene;
        // mesh.name = this.body.id.toString();
        mesh3.scale.set(4,4,4);
        mesh3.position.y=6.5;
        mesh3.position.z = 5;
        mesh3.rotation.y += Math.PI;
        scene.add(mesh3);
        mixer = new THREE.AnimationMixer(mesh3);
        mixer.clipAction( gltf.animations[0] ).play();

    }, undefined, function (e) {
        console.error(e);
    });

    // var geometry = new THREE.BoxBufferGeometry( 10, 10, 10 );
    // var edges = new THREE.EdgesGeometry( geometry );
    // var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
    // scene.add( line );

    var spotLight = new THREE.SpotLight( 0xFFFFFF, 2);
    spotLight.position.set( 0, 12.3, 12.3 );
    spotLight.target.position.set(0, 12, 12 );
    spotLight.castShadow = true;
    scene.add( spotLight.target );
    scene.add( spotLight );

    var spotLight2 = new THREE.SpotLight( 0xFFFFFF, 2);
    spotLight2.position.set( 12.3, 12.3, 12.3 );
    spotLight2.target.position.set(12, 12, 12 );
    spotLight2.castShadow = true;
    scene.add( spotLight2.target );
    scene.add( spotLight2 );

    var spotLight3 = new THREE.SpotLight( 0xFFFFFF, 2);
    spotLight3.position.set( -12.3, 12.3, 12.3 );
    spotLight3.target.position.set(-12, 12, 12 );
    spotLight3.castShadow = true;
    scene.add( spotLight3.target );
    scene.add( spotLight3 );

    document.addEventListener("keydown", onDocumentKeyDown, false);
    document.addEventListener("keyup", onDocumentKeyUp, false);
    var rotateLeft = false, rotateRight, rotateTop, rotateBottom;
    var clicked = 0;
    var degree = 0;
    var coba = document.getElementById("divTimeLeft");
    var prev;

    function onDocumentKeyUp(event) {
        clicked = 0;
    }
    function onDocumentKeyDown(event) {
        var keyCode = event.which;
        clicked += 1
        // console.log(clicked);
        if(clicked == 1) {
            prev = coba.style.width;
            if(numOfNot % 2 == 0) {
                if (keyCode == 37 && degree == 0 && perintah[0] == 'L') {
                    mesh3.rotation.y += Math.PI / 2;
                    rotateLeft = true;
                    score += 1;
                    removeText(mesh);
                    //resetTimer();
                }
                else if(keyCode == 39 && degree == 0 && perintah[0] == 'R') {
                    mesh3.rotation.y -= Math.PI / 2;
                    rotateRight = true;
                    score += 1;
                    removeText(mesh);
                    //resetTimer();
                }
                else if(keyCode == 38 && degree == 0 && perintah[0] == 'U') {
                    rotateTop = true;
                    score += 1;
                    removeText(mesh);
                    //resetTimer();
                }
                else if(keyCode == 40 && degree == 0 && perintah[0] == 'B') {
                    mesh3.rotation.y += Math.PI;
                    rotateBottom = true;
                    score += 1;
                    removeText(mesh);
                    //resetTimer();
                }
                else {
                    laugh.play();
                    alert("Lain kali lebih hati-hati. Kesempatan tidak datang dua kali");
                    document.location.reload();
                    // clearInterval(interval);
                    score = 0;
                }
            }
            else {
                if (keyCode == 37 && degree == 0 && perintah[0] != 'L') {
                    mesh3.rotation.y += Math.PI / 2;
                    rotateLeft = true;
                    score += 1;
                    removeText(mesh);
                    //resetTimer();
                }
                else if(keyCode == 39 && degree == 0 && perintah[0] != 'R') {
                    mesh3.rotation.y -= Math.PI / 2;
                    rotateRight = true;
                    score += 1;
                    removeText(mesh);
                    //resetTimer();
                }
                else if(keyCode == 38 && degree == 0 && perintah[0] != 'U') {
                    rotateTop = true;
                    score += 1;
                    removeText(mesh);
                    //resetTimer();
                }
                else if(keyCode == 40 && degree == 0 && perintah[0] != 'B') {
                    mesh3.rotation.y += Math.PI;
                    rotateBottom = true;
                    score += 1;
                    removeText(mesh);
                    //resetTimer();
                }
                else {
                    laugh.play();
                    alert("Awas Sekitarmu. Dunia itu luas, tidak semua berpihak padamu");
                    document.location.reload();
                    // clearInterval(interval);
                    score = 0;
                }
            }
            console.log(score);
        }
        event.preventDefault();
    };

    var puter = 0, jalan = 0, masuk = 0;
  
    render();
    function render() {
        requestAnimationFrame(render);
        console.log(coba.style.width);
        if(coba.style.width == "236px" && masuk == 0) {
            masuk = 1;
            alert("SKOR ANDA " + score + "\nSELAMAT YA!");
            laugh.play();
            document.location.reload();
        }
        if(rotateTop && degree < Math.PI / 2) {
            coba.style.width = prev;
            if(puter == 1) {
                jalan = 0;
                var deltaRotationQuaternion = new THREE.Quaternion()
                .setFromEuler(new THREE.Euler(
                    Math.PI / 2 / 25,
                    0,
                    0,
                    'XYZ'
                ));
            
                cube.quaternion.multiplyQuaternions(deltaRotationQuaternion, cube.quaternion);
                degree += Math.PI / 2 / 25;
            }
            else if(puter == 0) {
                if(jalan < 25) {
                    mesh3.position.z -= 11 / 25;
                    jalan += 1;
                }
                else {
                    mesh3.position.z = 6;
                    puter = 1;
                    mesh3.visible = false;
                }
            }
        }
        else if(rotateBottom && degree < Math.PI / 2) {
            coba.style.width = prev;
            if(puter == 1) {
                jalan = 0;
                var deltaRotationQuaternion = new THREE.Quaternion()
                .setFromEuler(new THREE.Euler(
                    -Math.PI / 2 / 25,
                    0,
                    0,
                    'XYZ'
                ));
            
                cube.quaternion.multiplyQuaternions(deltaRotationQuaternion, cube.quaternion);
                degree += Math.PI / 2 / 25;
            }
            else if(puter == 0) {
                if(jalan < 25) {
                    mesh3.position.z += 1 / 25;
                    jalan += 1;
                }
                else {
                    mesh3.position.z = -6;
                    puter = 1;
                    mesh3.visible = false;
                }
            }
            
        }
        else if(rotateLeft && degree < Math.PI / 2) {
            coba.style.width = prev;
            if(puter == 1) {
                jalan = 0;
                var deltaRotationQuaternion = new THREE.Quaternion()
                .setFromEuler(new THREE.Euler(
                    0,
                    0,
                    -Math.PI / 2 / 25,
                    'XYZ'
                ));
            
                cube.quaternion.multiplyQuaternions(deltaRotationQuaternion, cube.quaternion);
                degree += Math.PI / 2 / 25;
            }
            else if(puter == 0) {
                if(jalan < 25) {
                    jalan += 1;
                    mesh3.position.x -= 6 / 25;
                }
                else {
                    mesh3.position.x = 6;
                    puter = 1;
                    mesh3.visible = false;
                }
            }
            
        }
        else if(rotateRight && degree < Math.PI / 2) {
            coba.style.width = prev;
            if(puter == 1) {
                jalan = 0;
                var deltaRotationQuaternion = new THREE.Quaternion()
                .setFromEuler(new THREE.Euler(
                    0,
                    0,
                    Math.PI / 2 / 25,
                    'XYZ'
                ));
            
                cube.quaternion.multiplyQuaternions(deltaRotationQuaternion, cube.quaternion);
                degree += Math.PI / 2 / 25;
            }
            else if(puter == 0) {
                if(jalan < 25) {
                    jalan += 1;
                    mesh3.position.x += 6 / 25;
                }
                else {
                    mesh3.position.x = -6;
                    puter = 1;
                    mesh3.visible = false;
                }
            }
            
        }
        if(degree >= Math.PI / 2) {
            coba.style.width = "0px";
            if(puter == 0) {
                if(rotateBottom) {
                    mesh3.rotation.y += Math.PI;
                }
                else if(rotateLeft) {
                    mesh3.rotation.y -= Math.PI / 2;
                }
                else if(rotateRight) {
                    mesh3.rotation.y += Math.PI / 2;
                }
                rotateLeft = false;
                rotateRight = false;
                rotateTop = false;
                rotateBottom = false;
                degree = 0;
                posPerintah = Math.floor(Math.random() * 4);
                numOfNot = Math.floor(Math.random() * 4);
                text = "";
                var now = 0;
                while(now < numOfNot) {
                    text += notNot[0];
                    now += 1;
                    text += "\n";
                }
                console.log(numOfNot);
                perintah = arrow[posPerintah];
                text += arrow[posPerintah];
                console.log(text);
                updateText(text);
                removeText(mesh2);
                // removeText(mesh4);
                updateScore();
                resetTimer();
                chicken.play();
            }
            else if(puter == 1) {
                mesh3.visible = true;
                if(jalan < 25) {
                    if(rotateTop) {
                        mesh3.position.z -= 1 / 25;
                        jalan += 1;
                    }
                    else if(rotateBottom) {
                        mesh3.position.z += 11 / 25;
                        jalan += 1;
                    }
                    else if(rotateLeft) {
                        mesh3.position.x -= 6 / 25;
                        jalan += 1;
                    }
                    else if(rotateRight) {
                        mesh3.position.x += 6 / 25;
                        jalan += 1;
                    }
                }
                else {
                    puter = 0;
                    jalan = 0;
                }
            }
            // scene.remove(mesh);
            // text.
        }
        renderer.render(scene, camera);
    }

})();
