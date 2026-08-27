import type {
  FluidWebGLResult,
  WebGLContext,
} from "@/types/fluid";

export function getWebGLContext(
  canvas: HTMLCanvasElement
): FluidWebGLResult | null {
  const params = {
    alpha: true,
    depth: false,
    stencil: false,
    antialias: false,
    preserveDrawingBuffer: false,
  };

  let gl = canvas.getContext(
    "webgl2",
    params
  ) as WebGL2RenderingContext | null;

  const isWebGL2 = !!gl;

  if (!isWebGL2) {
    gl = (
      canvas.getContext("webgl", params) ||
      canvas.getContext("experimental-webgl", params)
    ) as WebGL2RenderingContext | null;
  }

  if (!gl) return null;

  let halfFloat: OES_texture_half_float | null = null;

  let supportLinearFiltering:
    | OES_texture_half_float_linear
    | OES_texture_float_linear
    | null = null;

  let halfFloatTexType: number;

  if (isWebGL2) {
    const gl2 = gl as WebGL2RenderingContext;

    gl2.getExtension("EXT_color_buffer_float");

    supportLinearFiltering =
      gl2.getExtension("OES_texture_float_linear");

    halfFloatTexType = gl2.HALF_FLOAT;
  } else {
    const gl1 = gl as WebGLRenderingContext;

    halfFloat =
      gl1.getExtension("OES_texture_half_float");

    supportLinearFiltering =
      gl1.getExtension("OES_texture_half_float_linear");

    halfFloatTexType = halfFloat
      ? halfFloat.HALF_FLOAT_OES
      : 0;
  }

  gl.clearColor(0, 0, 0, 1);

  const gl2 = gl as WebGL2RenderingContext;

  const formatRGBA = getSupportedFormat(
    gl,
    isWebGL2 ? gl2.RGBA16F : gl.RGBA,
    gl.RGBA,
    halfFloatTexType
  );

  const formatRG = getSupportedFormat(
    gl,
    isWebGL2
      ? gl2.RG16F ?? gl.RGBA
      : gl.RGBA,
    isWebGL2
      ? gl2.RG ?? gl.RGBA
      : gl.RGBA,
    halfFloatTexType
  );

  const formatR = getSupportedFormat(
    gl,
    isWebGL2
      ? gl2.R16F ?? gl.RGBA
      : gl.RGBA,
    isWebGL2
      ? gl2.RED ?? gl.RGBA
      : gl.RGBA,
    halfFloatTexType
  );

  return {
    gl,
    ext: {
      formatRGBA,
      formatRG,
      formatR,
      halfFloatTexType,
      supportLinearFiltering,
    },
  };
}

export function getSupportedFormat(
  gl: WebGLContext,
  internalFormat: number,
  format: number,
  type: number
): {
  internalFormat: number;
  format: number;
} | null {
  if (
    !supportRenderTextureFormat(
      gl,
      internalFormat,
      format,
      type
    )
  ) {
    const gl2 = gl as WebGL2RenderingContext;

    if (internalFormat === gl2.R16F) {
      return getSupportedFormat(
        gl,
        gl2.RG16F,
        gl2.RG,
        type
      );
    }

    if (internalFormat === gl2.RG16F) {
      return getSupportedFormat(
        gl,
        gl2.RGBA16F,
        gl.RGBA,
        type
      );
    }

    return null;
  }

  return {
    internalFormat,
    format,
  };
}

export function supportRenderTextureFormat(
  gl: WebGLContext,
  internalFormat: number,
  format: number,
  type: number
): boolean {
  const texture = gl.createTexture();

  if (!texture) return false;

  gl.bindTexture(gl.TEXTURE_2D, texture);

  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_MIN_FILTER,
    gl.NEAREST
  );

  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_MAG_FILTER,
    gl.NEAREST
  );

  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_WRAP_S,
    gl.CLAMP_TO_EDGE
  );

  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_WRAP_T,
    gl.CLAMP_TO_EDGE
  );

  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    internalFormat,
    4,
    4,
    0,
    format,
    type,
    null
  );

  const fbo = gl.createFramebuffer();

  if (!fbo) return false;

  gl.bindFramebuffer(
    gl.FRAMEBUFFER,
    fbo
  );

  gl.framebufferTexture2D(
    gl.FRAMEBUFFER,
    gl.COLOR_ATTACHMENT0,
    gl.TEXTURE_2D,
    texture,
    0
  );

  return (
    gl.checkFramebufferStatus(
      gl.FRAMEBUFFER
    ) === gl.FRAMEBUFFER_COMPLETE
  );
}