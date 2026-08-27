export type WebGLContext =
    | WebGL2RenderingContext
    | WebGLRenderingContext;

export interface FluidExtensions {
    formatRGBA: {
        internalFormat: number;
        format: number;
    } | null;

    formatRG: {
        internalFormat: number;
        format: number;
    } | null;

    formatR: {
        internalFormat: number;
        format: number;
    } | null;

    halfFloatTexType: number;

    supportLinearFiltering:
    | OES_texture_half_float_linear
    | OES_texture_float_linear
    | null;
}

export interface FluidWebGLResult {
    gl: WebGLContext;

    ext: FluidExtensions;
}

export type FBO = {
    texture: WebGLTexture;
    fbo: WebGLFramebuffer;

    width: number;
    height: number;

    texelSizeX: number;
    texelSizeY: number;

    attach: (id: number) => number;
};

export type DoubleFBO = {
    width: number;
    height: number;

    texelSizeX: number;
    texelSizeY: number;

    read: FBO;
    write: FBO;

    swap: () => void;
};

export interface FluidPointer {
    id: number;

    texcoordX: number;
    texcoordY: number;

    prevTexcoordX: number;
    prevTexcoordY: number;

    deltaX: number;
    deltaY: number;

    down: boolean;
    moved: boolean;

    color: number[];
}

export interface FluidProgram {
    program: WebGLProgram;
    uniforms: Record<string, WebGLUniformLocation | null>;
}