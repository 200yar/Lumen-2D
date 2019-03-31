import { Scene } from "./scene.js";
import { Edge } from "./geometry/Edge.js";
import { Circle } from "./geometry/Circle.js";
import { Ray } from "./ray.js";
import { Pixel } from "./pixel.js";
import { LambertMaterial } from "./material/lambert.js";
import { MatteMaterial } from "./material/matte.js";
import { EmitterMaterial } from "./material/emitter.js";
import { BeamEmitterMaterial } from "./material/beamEmitter.js";
import { glMatrix, vec2 } from "./dependencies/gl-matrix-es6.js";
import { Utils } from "./utils.js";
import { MicrofacetMaterial } from "./material/microfacet.js";
import { DielectricMaterial } from "./material/dielectric.js";


function createScene(scene, workerData) {

    let edgeMaterial = new LambertMaterial({ opacity: 1 });
    let tbound = 11;
    let lbound = 19.5;
    let rbound = 19.5;
    let bbound = 11;
    let ledge  = new Edge(-lbound, -bbound, -lbound,  tbound);
    let redge  = new Edge( rbound, -bbound,  rbound,  tbound);
    let tedge  = new Edge(-lbound,  tbound,  rbound,  tbound);
    let bedge  = new Edge(-lbound, -bbound,  rbound, -bbound);


    scene.add(ledge, edgeMaterial);
    scene.add(redge, edgeMaterial);
    scene.add(tedge, edgeMaterial);
    scene.add(bedge, edgeMaterial);



    // Utils.setSeed("juice921");
    let seed = Math.floor(workerData.randomNumber * 1000000000);
    console.log(seed);
    Utils.setSeed(seed);
    let rand = Utils.rand;



    for(let i = 0; i < 3; i++) {
        let angle1 = (i / 3) * Math.PI * 2;
        let angle2 = ((i+1) / 3) * Math.PI * 2;

        angle1 += Math.PI / 2;
        angle2 += Math.PI / 2;

        let radius = 4;

        let tx1 = Math.cos(angle1) * radius;
        let ty1 = Math.sin(angle1) * radius;
        let tx2 = Math.cos(angle2) * radius;
        let ty2 = Math.sin(angle2) * radius;

        scene.add(
            new Edge(tx2, ty2, tx1, ty1), 
            new DielectricMaterial({
                opacity: 1,
                transmittance: 0.5,
                ior: 1.4,
                roughness: 0.15,
                dispersion: 0.125,
            })
        );
    }

    let edge = new Edge(-5, -3.1, -5, -3.2);

    scene.add(edge, new EmitterMaterial({ 
        color: function() {
            return {
                wavelength: Math.random() * 360 + 380,
                intensity: 1.5,
            }
        }, 
        samplePower: 150,
        // color: [3500, 3500, 3500],
        beamDirection: [1, 0.3] }));


    // scene.add( 
    //     new Circle(-3, 16, 5.5),
    //     new EmitterMaterial({ 
    //         color: [250, 225, 200], 
    //     }));
}

export { createScene };