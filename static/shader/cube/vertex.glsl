attribute vec4 aVertexPoint;
attribute vec4 aVertexColor;

uniform mat4 uMatrixModel;  // View;
uniform mat4 uMatrixCamera; //Projection;

varying lowp vec4 vColor;

void main() {
  gl_Position = uMatrixCamera * uMatrixModel * aVertexPoint;
  vColor = aVertexColor;
}
