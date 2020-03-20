/** */
  export default class Program {
  /** */
    constructor(program) {
      this.program = program;
      this.location = {
        attribute: {},
        uniform:   {}
      }
    }

  /** */
    info(gl, attribute, uniform) {
      const program = this.program;

      Object
        .entries(attribute)
        .forEach(([k, v]) => this.location.attribute[k] = gl.getAttribLocation(program, v));


      Object
        .entries(uniform)
        .forEach(([k, v]) => this.location.uniform[k] = gl.getUniformLocation(program, v));

      return this;
    }

  /** */
    attribute(name) {
      return this.location.attribute[name];
    }

  /** */
    uniform(name) {
      return this.location.uniform[name];
    }

  /** */
    use(gl) {
      gl.useProgram(this.program);
      return this;
    }

  /** */
    static async create(gl, name) {
      const vertex   = await load(gl, name, 'vertex');
      const fragment = await load(gl, name, 'fragment');

      const program = gl.createProgram();
      gl.attachShader(program, vertex);
      gl.attachShader(program, fragment);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const trace = gl.getProgramInfoLog(program)
        console.error('initialize program error', name, trace);
        gl.deleteProgram(program);
        return null;
      }

      return new Program(program);
    }
  }

// #region [Private]
/** / load */
  async function load(gl, name, type) { // gl.VERTEX_SHADER, gl.FRAGMENT_SHADER
    const path   = '/javascript-gl/static/shader/' + name + '/' + type + '.glsl';
    const source = await fetch(path).then(r => r.text());
    const shader = gl.createShader(gl[(type + '_shader').toUpperCase()]);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const trace = gl.getShaderInfoLog(shader);
      console.error('compile shader error', name, type, trace); // !
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }
// #endregion
