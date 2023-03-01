// const vertexShader = () => {
//   return `
//       varying float x;
//       varying float y;
//       varying float z;
//       varying vec3 vUv;
//
//       uniform float u_time;
//       uniform float u_amplitude;
//       uniform float[64] u_data_arr;
//
//       void main() {
//         // u_time: the time in uniforms of THREE.ShaderMaterial
//         float z = sin(abs(position.x) + abs(position.y) + u_time * .005);
//         gl_Position = projectionMatrix
//           * modelViewMatrix
//           * vec4(position.x, position.y, z, 1.0);
//       }
//     `;
// };

const vertexShader = () => {
  return `
      varying float x;
      varying float y;
      varying float z;
      varying vec3 vUv;

      uniform float u_time;
      uniform float u_amplitude;
      uniform float[64] u_data_arr;

      void main() {
        vUv = position;

        x = abs(position.x);
	      y = abs(position.y);

        float floor_x = round(x);
	      float floor_y = round(y);

        float x_multiplier = (32.0 - x) / 8.0;
        float y_multiplier = (32.0 - y) / 8.0;

        // z = position.z;
        // z = abs(position.x) + abs(position.y);
        // z = sin(abs(position.x) + abs(position.y));
        // z = sin(abs(position.x) + abs(position.y) + u_time * .005);
        z = sin(u_data_arr[int(floor_x)] / 25.0 + u_data_arr[int(floor_y)] / 25.0) * u_amplitude;
        // z = (u_data_arr[int(floor_x)] / 25.0 + u_data_arr[int(floor_y)] / 25.0) * 2.0;
        // gl_Position is the position of a specific vertex
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, position.y, z, 1.0);
      }
    `;
};

const fragmentShader = () => {
  return `
    varying float x;
    varying float y;
    varying float z;
    varying vec3 vUv;

    uniform float u_time;
    // uniform vec3 u_black;
    // uniform vec3 u_white;

    void main() {
      // old
      // gl_FragColor = vec4(mix(u_black, u_white, vUv.x), 1.0);
      // vec4() = rgba()
      gl_FragColor = vec4(1.0, 0.933, 0.372, 0.9);
      // ----quadrant
       // if (vUv.x > 0.0 && vUv.y > 0.0) {
       //   // I red
       //  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
       // } else if (vUv.x < 0.0 && vUv.y > 0.0) {
       //   // II green
       // gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
       // } else if (vUv.x < 0.0 && vUv.y < 0.0) {
       //   // III yellow
       //   gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
       // } else if (vUv.x > 0.0 && vUv.y < 0.0) {
       //   // VI purple
       //   gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
       // } else {
       //   gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
       // }
       // ---
       // if (vUv.y < 0.0) {
       //   gl_FragColor = vec4(9.0, 8.0, 244.0, 1.0);
       // } else {
       //   gl_FragColor = vec4(250.0, 255.0, 5.0, 1.0);
       // }
      // gl_FragColor = vec4(abs(sin(u_time * .001)), 0.0, 0.0, 1.0);
      // ---one rainbow
      // gl_FragColor = vec4((64.0 - abs(x)) / 64.0, (64.0 - abs(y)) / 64.0, (abs(x + y) / 1.0) / 64.0, 1.0);
      // ---
      // --- two raninbow
      // gl_FragColor = vec4((32.0 - abs(x)) / 32.0, (32.0 - abs(y)) / 32.0, (abs(x + y) / 2.0) / 32.0, 1.0);
      // ---
    }
  `;
};

export { vertexShader, fragmentShader };
