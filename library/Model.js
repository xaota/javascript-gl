import Node from './Node.js';
// import Mesh from './Mesh.js';

/** */
  export default class Model extends Node {
  /** @constructor
    * @param {Mesh} mesh геомметрия объекта
    */
    constructor(mesh) {
      super();
      this.mesh = mesh;
    }

  /** */
    init(jsgl) {
      this.mesh.buffers(jsgl.gl);
      return this;
    }

  /** */
    render(gl, program, {camera}) {
      super.render(gl, program, {camera});

      this.mesh.render(gl, program);

      const matrix = this.global;
      gl.uniformMatrix4fv(program.uniform('model'), false, matrix.data);

      {
        const vertexCount = this.mesh.buffer.indices.length;
        const type = gl.UNSIGNED_SHORT;
        const offset = 0;
        gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
      }

      return this;
    }
  }
