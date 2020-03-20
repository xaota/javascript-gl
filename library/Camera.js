import {Matrix} from 'javascript-algebra/index.js';
/** */
  export default class Camera {
  /** */
    constructor(matrix) {
      this.matrix = matrix;
    }

  /** Камера перспективной проекции
    * @param {number} fieldOfView угол обзора (в градусах)
    * @param {number} aspect соотношение сторон области рисования
    * @param {number} zNear ближняя плоскость отсечения
    * @param {number} zFar дальняя плоскость отсечения
    * @return {Camera} объект камеры
    */
    static perspective(fieldOfView, aspect, zNear, zFar) {
      const matrix = Matrix.perspective(fieldOfView, aspect, zNear, zFar);
      return new Camera(matrix);
    }
  }
