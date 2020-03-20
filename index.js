import Vector from 'javascript-algebra/Vector.js';

export {default as Scene}  from './library/Scene.js';
export {default as Camera} from './library/Camera.js';
import Program from './library/Program.js';

/** */
  export default class JSGL {
  /** */
    constructor(canvas = document.createElement('canvas')) {
      this.canvas = canvas;
      this.gl = this.canvas.getContext('webgl');
    }

  /** размеры области рисования / port
    * @param {Vector} size размер области рисования
    * @return {JSGL} @this
    */
    port(size = Vector.from(this.gl.canvas.clientWidth, this.gl.canvas.clientHeight)) {
      const gl = this.gl;

      gl.canvas.width  = size.x;
      gl.canvas.height = size.y;
      // gl.viewport(0, 0, gl.canvas.clientWidth, gl.canvas.clientHeight);
      // gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      return this;
    }

  /** */
    async init() {
      const program = await Program.create(this.gl, 'cube');
      const attribute = {
        points: 'aVertexPoint',
        colors: 'aVertexColor'
      };
      const uniform = {
        model:  'uMatrixModel',
        camera: 'uMatrixCamera'
      };
      program.info(this.gl, attribute, uniform);

      this.program = program;
      return this;
    }

  /** Отрисовка сцены
    * @param {Scene} scene объект сцены
    * @param {Camera} camera объект камеры
    * @return {JSGL} @this
    */
    render(scene, camera) {
      const gl = this.gl;

      // gl.enable(gl.CULL_FACE);
      gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
      gl.clearDepth(1.0);                 // Clear everything
      gl.enable(gl.DEPTH_TEST);           // Enable depth testing
      gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

      // eslint-disable-next-line no-bitwise
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Clear the canvas before we start drawing on it.

      scene.update().render(gl, this.program, {camera});

      return this;
    }
  }
