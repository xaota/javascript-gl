/** */
  export default class Mesh {
  /** */
    constructor(points, colors, indices) {
      this.points  = points;
      this.colors  = colors;
      this.indices = indices;

      this.buffer = {};
    }

  /** */
    buffers(gl) {
      this.buffer.points  = Mesh.buffer(gl, this.points, 3);
      this.buffer.colors  = Mesh.buffer(gl, this.colors, 4);
      this.buffer.indices = Mesh.buffer(gl, this.indices, 0, gl.ELEMENT_ARRAY_BUFFER);

      return this;
    }

  /** */
    render(gl, program) {
      Mesh.render(gl, this.buffer.points, program.attribute('points'));
      Mesh.render(gl, this.buffer.colors, program.attribute('colors'));

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer.indices.buffer);
      return this;
    }

  /** */
    static render(gl, buffer, location = null, stride = 0, offset = 0) {
      const normalize = false;
      gl.bindBuffer(buffer.type, buffer.buffer);
      gl.vertexAttribPointer(location, buffer.count, gl.FLOAT, normalize, stride, offset);
      gl.enableVertexAttribArray(location);
    }

  /** */
    static buffer(gl, array, count = 0, type = gl.ARRAY_BUFFER) { // ELEMENT_ARRAY_BUFFER
      const data = type === gl.ARRAY_BUFFER
        ? new Float32Array(array)
        : new Uint16Array(array);
      const length = data.length;

      const buffer = gl.createBuffer();
      gl.bindBuffer(type, buffer);
      gl.bufferData(type, data, gl.STATIC_DRAW);

      return {buffer, type, array, length, count}
    }
  }
