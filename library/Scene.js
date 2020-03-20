// import Node from './Node.js';

/** */
  export default class Scene {
  /** */
    constructor() {
      // super();
      this.options = {};
      this.children = [];
    }

  /** Обновление матриц объектов сцены / update */
    update() {
      this.children.forEach(node => node.update());
      return this;
    }

  /** */
    init(gl) {
      this.children.forEach(node => node.init(gl));
      return this;
    }

  /** */
    render(gl, program, {camera}) {
      program.use(gl);
      gl.uniformMatrix4fv(program.uniform('camera'), false, camera.matrix.data);
      this.children.forEach(node => node.render(gl, program, {camera}));
      return this;
    }
  }
