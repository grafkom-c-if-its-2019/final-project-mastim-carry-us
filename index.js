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
    console.log(text);

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
            { color: 0xffffff, specular: 0xffffff }
        );

        mesh = new THREE.Mesh( textGeometry, textMaterial );

        // mesh.position.x = -3.5;
        mesh.position.z = 0.5;
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

        mesh2.rotation.x -= Math.PI / 2;

        scene.add( mesh2 );
    }

    load_font2();

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

    var circleGeometry = new THREE.CircleGeometry(0.4, 32);
    var circleMaterial = new THREE.MeshBasicMaterial({color: 0xffff00, transparent: true, opacity: 0.3});
    var circle = new THREE.Mesh(circleGeometry, circleMaterial);
    circle.position.y = 6.5;
    circle.position.z = 0.25;
    circle.rotation.x -= Math.PI / 2;
    scene.add(circle);

    document.addEventListener("keydown", onDocumentKeyDown, false);
    document.addEventListener("keyup", onDocumentKeyUp, false);
    var rotateLeft = false, rotateRight, rotateTop, rotateBottom;
    var clicked = 0;
    var degree = 0;

    function onDocumentKeyUp(event) {
        clicked = 0;
    }
    function onDocumentKeyDown(event) {
        var keyCode = event.which;
        clicked += 1
        // console.log(clicked);
        if(clicked == 1) {
            if(numOfNot % 2 == 0) {
                if (keyCode == 37 && degree == 0 && perintah[0] == 'L') {
                    rotateLeft = true;
                    score += 1;
                    removeText(mesh);
                }
                else if(keyCode == 39 && degree == 0 && perintah[0] == 'R') {
                    rotateRight = true;
                    score += 1;
                    removeText(mesh);
                }
                else if(keyCode == 38 && degree == 0 && perintah[0] == 'U') {
                    rotateTop = true;
                    score += 1;
                    removeText(mesh);
                }
                else if(keyCode == 40 && degree == 0 && perintah[0] == 'B') {
                    rotateBottom = true;
                    score += 1;
                    removeText(mesh);
                }
                else {
                    alert("CUPU");
                    document.location.reload();
                    // clearInterval(interval);
                    score = 0;
                }
            }
            else {
                if (keyCode == 37 && degree == 0 && perintah[0] != 'L') {
                    rotateLeft = true;
                    score += 1;
                    removeText(mesh);
                }
                else if(keyCode == 39 && degree == 0 && perintah[0] != 'R') {
                    rotateRight = true;
                    score += 1;
                    removeText(mesh);
                }
                else if(keyCode == 38 && degree == 0 && perintah[0] != 'U') {
                    rotateTop = true;
                    score += 1;
                    removeText(mesh);
                }
                else if(keyCode == 40 && degree == 0 && perintah[0] != 'B') {
                    rotateBottom = true;
                    score += 1;
                    removeText(mesh);
                }
                else {
                    alert("CUPU");
                    document.location.reload();
                    // clearInterval(interval);
                    score = 0;
                }
            }
            console.log(score);
        }
        event.preventDefault();
    };

    var puter = 0, jalan = 0;
  
    render();
    function render() {
        requestAnimationFrame(render);
        if(rotateTop && degree < Math.PI / 2) {
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
                    circle.position.z -= 6 / 25;
                    jalan += 1;
                }
                else {
                    circle.position.z = 6;
                    puter = 1;
                    circle.visible = false;
                }
            }
        }
        else if(rotateBottom && degree < Math.PI / 2) {
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
                    circle.position.z += 6 / 25;
                    jalan += 1;
                }
                else {
                    circle.position.z = -6;
                    puter = 1;
                    circle.visible = false;
                }
            }
            
        }
        else if(rotateLeft && degree < Math.PI / 2) {
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
                    circle.position.x -= 6 / 25;
                }
                else {
                    circle.position.x = 6;
                    puter = 1;
                    circle.visible = false;
                }
            }
            
        }
        else if(rotateRight && degree < Math.PI / 2) {
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
                    circle.position.x += 6 / 25;
                }
                else {
                    circle.position.x = -6;
                    puter = 1;
                    circle.visible = false;
                }
            }
            
        }
        if(degree >= Math.PI / 2) {
            if(puter == 0) {
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
                updateScore();
            }
            else if(puter == 1) {
                circle.visible = true;
                if(jalan < 25) {
                    if(rotateTop) {
                        circle.position.z -= 6 / 25;
                        jalan += 1;
                    }
                    else if(rotateBottom) {
                        circle.position.z += 6 / 25;
                        jalan += 1;
                    }
                    else if(rotateLeft) {
                        circle.position.x -= 6 / 25;
                        jalan += 1;
                    }
                    else if(rotateRight) {
                        circle.position.x += 6 / 25;
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