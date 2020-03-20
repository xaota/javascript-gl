import {Vector, Matrix} from 'javascript-algebra/index.js';

/** Узел сцены */
  export default class Node {
  /** */
    constructor() {
      this.root = null;
      this.children = [];
      this.matrix = Matrix.identity(4); // local (projection?) matrix
      this.global = Matrix.identity(4); // world (projection?) matrix
    }

  /** / setParent */
    set parent(value) {
      if (this.root) { // Удалим текущую связь, если она есть
        const index = this.root.children.indexOf(this);
        if (index > -1) this.root.children.splice(index, 1);
      }

      if (value) value.children.push(this); // value !== null
      this.root = value;
    }

  /** Обновление матриц модели / update
    * @param {Matrix} matrix global-матрица родителя
    * @return {Node} @this
    */
    update(matrix) {
      this.global = matrix
        ? matrix.multiply(this.matrix)
        : this.matrix.copy();

      const global = this.global;
      this.children.forEach(node => node.update(global));
      return this;
    }

  /** */
    init(gl) { // @override
      return this;
    }

  /** */
    render(gl, program, {camera}) { // @override
      // console.log('node render origin');
      return this;
    }

  /** Перенос объекта / translate */
    translate(vector = Vector.ZERO) {
      this.matrix = this.matrix.translate(vector);
      return this;
    }

  /** / rotateX */
    rotateX(angle) {
      this.matrix = this.matrix.rotateX(angle);
      return this;
    }

  /** / rotateY */
    rotateY(angle) {
      this.matrix = this.matrix.rotateY(angle);
      return this;
    }

  /** / rotateZ */
    rotateZ(angle) {
      this.matrix = this.matrix.rotateZ(angle);
      return this;
    }
  }
