"use client";

import { useEffect, useRef } from "react";

import { fluidConfig as config } from "@/data/fluid.config";

import {
    getWebGLContext,
} from "@/libs/fluid/fluidWebGL";

import type {
    FBO,
    DoubleFBO,
    FluidPointer,
    FluidProgram,
} from "@/types/fluid";

import {
    baseVertexShader,
    blurVertexShader,
    blurShader,
    copyShader,
    clearShader,
    colorShader,
    displayShaderSource,
    bloomPrefilterShader,
    bloomBlurShader,
    bloomFinalShader,
    sunraysMaskShader,
    sunraysShader,
    splatShader,
    advectionShader,
    divergenceShader,
    curlShader,
    vorticityShader,
    pressureShader,
    gradientSubtractShader,
} from "@/libs/fluid/fluidShaders";

export default function useFluidCanvas(
    canvasRef: React.RefObject<HTMLCanvasElement | null>
) {
    const animFrameRef = useRef<number>(0);

    useEffect(() => {
        const canvasEl = canvasRef.current;
        if (!canvasEl) return;

        const canvas: HTMLCanvasElement = canvasEl;
        const result = getWebGLContext(canvas);
        if (!result) return;

        const { gl, ext } = result;

        function compileShader(
            type: number,
            source: string,
            keywords?: string[]
        ): WebGLShader {
            let src = source;

            if (keywords) {
                let kw = "";
                keywords.forEach((k) => {
                    kw += `#define ${k}\n`;
                });
                src = kw + src;
            }

            const shader = gl.createShader(type);
            if (!shader) {
                throw new Error("Failed to create shader.");
            }

            gl.shaderSource(shader, src);
            gl.compileShader(shader);

            return shader;
        }

        function createProgram(
            vs: WebGLShader,
            fs: WebGLShader
        ): WebGLProgram {
            const program = gl.createProgram();
            if (!program) {
                throw new Error("Failed to create WebGL program.");
            }

            gl.attachShader(program, vs);
            gl.attachShader(program, fs);
            gl.linkProgram(program);

            return program;
        }

        function getUniforms(
            program: WebGLProgram
        ): Record<string, WebGLUniformLocation | null> {
            const uniforms: Record<string, WebGLUniformLocation | null> = {};
            const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);

            for (let i = 0; i < count; i++) {
                const active = gl.getActiveUniform(program, i);
                if (!active) continue;
                const name = active.name;
                uniforms[name] = gl.getUniformLocation(program, name);
            }

            return uniforms;
        }

        /* SHADERS */
        const baseVertex = compileShader(gl.VERTEX_SHADER, baseVertexShader);
        const blurVertex = compileShader(gl.VERTEX_SHADER, blurVertexShader);

        const blurFrag = compileShader(gl.FRAGMENT_SHADER, blurShader);
        const copyFrag = compileShader(gl.FRAGMENT_SHADER, copyShader);
        const clearFrag = compileShader(gl.FRAGMENT_SHADER, clearShader);
        const colorFrag = compileShader(gl.FRAGMENT_SHADER, colorShader);
        const bloomPrefilterFrag = compileShader(gl.FRAGMENT_SHADER, bloomPrefilterShader);
        const bloomBlurFrag = compileShader(gl.FRAGMENT_SHADER, bloomBlurShader);
        const bloomFinalFrag = compileShader(gl.FRAGMENT_SHADER, bloomFinalShader);
        const sunraysMaskFrag = compileShader(gl.FRAGMENT_SHADER, sunraysMaskShader);
        const sunraysFrag = compileShader(gl.FRAGMENT_SHADER, sunraysShader);
        const splatFrag = compileShader(gl.FRAGMENT_SHADER, splatShader);
        const advectionFrag = compileShader(
            gl.FRAGMENT_SHADER,
            advectionShader,
            ext.supportLinearFiltering ? undefined : ["MANUAL_FILTERING"]
        );
        const divergenceFrag = compileShader(gl.FRAGMENT_SHADER, divergenceShader);
        const curlFrag = compileShader(gl.FRAGMENT_SHADER, curlShader);
        const vorticityFrag = compileShader(gl.FRAGMENT_SHADER, vorticityShader);
        const pressureFrag = compileShader(gl.FRAGMENT_SHADER, pressureShader);
        const gradientSubtractFrag = compileShader(gl.FRAGMENT_SHADER, gradientSubtractShader);

        /* PROGRAM FACTORY */
        function makeProgram(vertex: WebGLShader, fragment: WebGLShader): FluidProgram {
            const program = createProgram(vertex, fragment);
            return {
                program,
                uniforms: getUniforms(program),
            };
        }

        const blurProgram = makeProgram(blurVertex, blurFrag);
        const copyProgram = makeProgram(baseVertex, copyFrag);
        const clearProgram = makeProgram(baseVertex, clearFrag);
        const colorProgram = makeProgram(baseVertex, colorFrag);
        const bloomPrefilterProgram = makeProgram(baseVertex, bloomPrefilterFrag);
        const bloomBlurProgram = makeProgram(baseVertex, bloomBlurFrag);
        const bloomFinalProgram = makeProgram(baseVertex, bloomFinalFrag);
        const sunraysMaskProgram = makeProgram(baseVertex, sunraysMaskFrag);
        const sunraysProgram = makeProgram(baseVertex, sunraysFrag);
        const splatProgram = makeProgram(baseVertex, splatFrag);
        const advectionProgram = makeProgram(baseVertex, advectionFrag);
        const divergenceProgram = makeProgram(baseVertex, divergenceFrag);
        const curlProgram = makeProgram(baseVertex, curlFrag);
        const vorticityProgram = makeProgram(baseVertex, vorticityFrag);
        const pressureProgram = makeProgram(baseVertex, pressureFrag);
        const gradientSubtractProgram = makeProgram(baseVertex, gradientSubtractFrag);

        /* DISPLAY PROGRAM */
        let displayProgram: FluidProgram | null = null;

        function getDisplayProgram() {
            const keywords: string[] = [];
            if (config.SHADING) keywords.push("SHADING");
            if (config.BLOOM) keywords.push("BLOOM");
            if (config.SUNRAYS) keywords.push("SUNRAYS");

            const fs = compileShader(gl.FRAGMENT_SHADER, displayShaderSource, keywords);
            const program = createProgram(baseVertex, fs);
            return {
                program,
                uniforms: getUniforms(program),
            };
        }

        displayProgram = getDisplayProgram();

        /* BUFFER HELPERS */
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);

        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(0);

        function blit(target: FBO | null, clear = false) {
            if (target == null) {
                gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
                gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            } else {
                gl.viewport(0, 0, target.width, target.height);
                gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
            }

            if (clear) {
                gl.clearColor(0, 0, 0, 1);
                gl.clear(gl.COLOR_BUFFER_BIT);
            }

            gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
        }

        function createFBO(
            w: number,
            h: number,
            internalFormat: number,
            format: number,
            type: number,
            param: number
        ): FBO {
            gl.activeTexture(gl.TEXTURE0);
            const texture = gl.createTexture();
            if (!texture) throw new Error("Failed to create texture.");

            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

            const fbo = gl.createFramebuffer();
            if (!fbo) throw new Error("Failed to create framebuffer.");

            gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
            gl.viewport(0, 0, w, h);
            gl.clear(gl.COLOR_BUFFER_BIT);

            return {
                texture,
                fbo,
                width: w,
                height: h,
                texelSizeX: 1 / w,
                texelSizeY: 1 / h,
                attach: (id: number) => {
                    gl.activeTexture(gl.TEXTURE0 + id);
                    gl.bindTexture(gl.TEXTURE_2D, texture);
                    return id;
                },
            };
        }

        function createDoubleFBO(
            w: number,
            h: number,
            internalFormat: number,
            format: number,
            type: number,
            param: number
        ): DoubleFBO {
            let fbo1 = createFBO(w, h, internalFormat, format, type, param);
            let fbo2 = createFBO(w, h, internalFormat, format, type, param);

            return {
                width: w,
                height: h,
                texelSizeX: fbo1.texelSizeX,
                texelSizeY: fbo1.texelSizeY,
                get read() { return fbo1; },
                set read(value) { fbo1 = value; },
                get write() { return fbo2; },
                set write(value) { fbo2 = value; },
                swap() {
                    const temp = fbo1;
                    fbo1 = fbo2;
                    fbo2 = temp;
                },
            };
        }

        function getResolution(resolution: number) {
            let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
            if (aspectRatio < 1) aspectRatio = 1 / aspectRatio;

            const min = Math.round(resolution);
            const max = Math.round(resolution * aspectRatio);

            return gl.drawingBufferWidth > gl.drawingBufferHeight
                ? { width: max, height: min }
                : { width: min, height: max };
        }

        function scaleByPixelRatio(input: number) {
            const pixelRatio = window.devicePixelRatio || 1;
            return Math.floor(input * pixelRatio);
        }

        function resizeCanvas() {
            const w = scaleByPixelRatio(canvas.clientWidth);
            const h = scaleByPixelRatio(canvas.clientHeight);

            if (canvas.width !== w || canvas.height !== h) {
                canvas.width = w;
                canvas.height = h;
                return true;
            }
            return false;
        }

        /* FBO INITS */
        let dye!: DoubleFBO;
        let velocity!: DoubleFBO;
        let divergenceFBO!: FBO;
        let curlFBO!: FBO;
        let pressure!: DoubleFBO;
        let bloom!: FBO;
        let sunrays!: FBO;
        let sunraysTemp!: FBO;

        const bloomFramebuffers: FBO[] = [];

        const ditheringTexture = (() => {
            const texture = gl.createTexture();
            if (!texture) throw new Error("Failed to create dithering texture.");

            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 1, 1, 0, gl.RGB, gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255]));

            return {
                texture,
                width: 1,
                height: 1,
                attach: (id: number) => {
                    gl.activeTexture(gl.TEXTURE0 + id);
                    gl.bindTexture(gl.TEXTURE_2D, texture);
                    return id;
                },
            };
        })();

        function initFramebuffers() {
            const simRes = getResolution(config.SIM_RESOLUTION);
            const dyeRes = getResolution(config.DYE_RESOLUTION);
            const texType = ext.halfFloatTexType;
            const rgba = ext.formatRGBA;
            const rg = ext.formatRG;
            const r = ext.formatR;

            if (!rgba || !rg || !r) return;

            const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

            gl.disable(gl.BLEND);

            dye = createDoubleFBO(dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);
            velocity = createDoubleFBO(simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);
            divergenceFBO = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
            curlFBO = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
            pressure = createDoubleFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);

            initBloomFramebuffers();
            initSunraysFramebuffers();
        }

        function initBloomFramebuffers() {
            const res = getResolution(config.BLOOM_RESOLUTION);
            const texType = ext.halfFloatTexType;
            const rgba = ext.formatRGBA;
            if (!rgba) return;

            const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;
            bloom = createFBO(res.width, res.height, rgba.internalFormat, rgba.format, texType, filtering);

            bloomFramebuffers.length = 0;
            for (let i = 0; i < config.BLOOM_ITERATIONS; i++) {
                const w = res.width >> (i + 1);
                const h = res.height >> (i + 1);
                if (w < 2 || h < 2) break;
                bloomFramebuffers.push(createFBO(w, h, rgba.internalFormat, rgba.format, texType, filtering));
            }
        }

        function initSunraysFramebuffers() {
            const res = getResolution(config.SUNRAYS_RESOLUTION);
            const texType = ext.halfFloatTexType;
            const r = ext.formatR;
            if (!r) return;

            const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;
            sunrays = createFBO(res.width, res.height, r.internalFormat, r.format, texType, filtering);
            sunraysTemp = createFBO(res.width, res.height, r.internalFormat, r.format, texType, filtering);
        }

        initFramebuffers();

        /* POINTER LOGIC */
        const pointers: FluidPointer[] = [
            {
                id: -1,
                texcoordX: 0,
                texcoordY: 0,
                prevTexcoordX: 0,
                prevTexcoordY: 0,
                deltaX: 0,
                deltaY: 0,
                down: false,
                moved: false,
                color: [30, 0, 300],
            },
        ];

        function generateColor() {
            const colors = [
                { r: 0.8, g: 0.05, b: 0.05 },
                { r: 0.9, g: 0.1, b: 0.1 },
                { r: 0.6, g: 0.02, b: 0.02 },
                { r: 1.0, g: 0.15, b: 0.05 },
                { r: 0.7, g: 0.0, b: 0.1 },
            ];

            const c = colors[Math.floor(Math.random() * colors.length)];
            return {
                r: c.r * 0.15,
                g: c.g * 0.15,
                b: c.b * 0.15,
            };
        }

        function correctRadius(radius: number) {
            const aspectRatio = canvas.width / canvas.height;
            if (aspectRatio > 1) radius *= aspectRatio;
            return radius;
        }

        function correctDeltaX(delta: number) {
            const aspectRatio = canvas.width / canvas.height;
            if (aspectRatio < 1) delta *= aspectRatio;
            return delta;
        }

        function correctDeltaY(delta: number) {
            const aspectRatio = canvas.width / canvas.height;
            if (aspectRatio > 1) delta /= aspectRatio;
            return delta;
        }

        /* SPLAT & STEP & RENDER HELPER LOGIC */
        function splat(x: number, y: number, dx: number, dy: number, color: { r: number; g: number; b: number }) {
            gl.useProgram(splatProgram.program);
            gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));
            gl.uniform1f(splatProgram.uniforms.aspectRatio, canvas.width / canvas.height);
            gl.uniform2f(splatProgram.uniforms.point, x, y);
            gl.uniform3f(splatProgram.uniforms.color, dx, dy, 0);
            gl.uniform1f(splatProgram.uniforms.radius, correctRadius(config.SPLAT_RADIUS / 100));

            blit(velocity.write);
            velocity.swap();

            gl.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0));
            gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b);

            blit(dye.write);
            dye.swap();
        }

        function multipleSplats(amount: number) {
            for (let i = 0; i < amount; i++) {
                const color = generateColor();
                color.r *= 10;
                color.g *= 10;
                color.b *= 10;
                splat(Math.random(), Math.random(), 1000 * (Math.random() - 0.5), 1000 * (Math.random() - 0.5), color);
            }
        }

        function step(dt: number) {
            gl.disable(gl.BLEND);
            gl.useProgram(curlProgram.program);
            gl.uniform2f(curlProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
            gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0));
            blit(curlFBO);

            gl.useProgram(vorticityProgram.program);
            gl.uniform2f(vorticityProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
            gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0));
            gl.uniform1i(vorticityProgram.uniforms.uCurl, curlFBO.attach(1));
            gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
            gl.uniform1f(vorticityProgram.uniforms.dt, dt);
            blit(velocity.write);
            velocity.swap();

            gl.useProgram(divergenceProgram.program);
            gl.uniform2f(divergenceProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
            gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0));
            blit(divergenceFBO);

            gl.useProgram(clearProgram.program);
            gl.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0));
            gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE);
            blit(pressure.write);
            pressure.swap();

            gl.useProgram(pressureProgram.program);
            gl.uniform2f(pressureProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
            gl.uniform1i(pressureProgram.uniforms.uDivergence, divergenceFBO.attach(0));
            for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
                gl.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.attach(1));
                blit(pressure.write);
                pressure.swap();
            }

            gl.useProgram(gradientSubtractProgram.program);
            gl.uniform2f(gradientSubtractProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
            gl.uniform1i(gradientSubtractProgram.uniforms.uPressure, pressure.read.attach(0));
            gl.uniform1i(gradientSubtractProgram.uniforms.uVelocity, velocity.read.attach(1));
            blit(velocity.write);
            velocity.swap();

            gl.useProgram(advectionProgram.program);
            gl.uniform2f(advectionProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
            if (!ext.supportLinearFiltering) {
                gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY);
            }

            const velId = velocity.read.attach(0);
            gl.uniform1i(advectionProgram.uniforms.uVelocity, velId);
            gl.uniform1i(advectionProgram.uniforms.uSource, velId);
            gl.uniform1f(advectionProgram.uniforms.dt, dt);
            gl.uniform1f(advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION);
            blit(velocity.write);
            velocity.swap();

            if (!ext.supportLinearFiltering) {
                gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY);
            }
            gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0));
            gl.uniform1i(advectionProgram.uniforms.uSource, dye.read.attach(1));
            gl.uniform1f(advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION);
            blit(dye.write);
            dye.swap();
        }

        function applyBloom(source: FBO, destination: FBO) {
            if (bloomFramebuffers.length < 2) return;
            let last = destination;

            gl.disable(gl.BLEND);
            gl.useProgram(bloomPrefilterProgram.program);

            const knee = config.BLOOM_THRESHOLD * config.BLOOM_SOFT_KNEE + 1e-4;
            const curve0 = config.BLOOM_THRESHOLD - knee;
            const curve1 = knee * 2;
            const curve2 = 0.25 / knee;

            gl.uniform3f(bloomPrefilterProgram.uniforms.curve, curve0, curve1, curve2);
            gl.uniform1f(bloomPrefilterProgram.uniforms.threshold, config.BLOOM_THRESHOLD);
            gl.uniform1i(bloomPrefilterProgram.uniforms.uTexture, source.attach(0));
            blit(last);

            gl.useProgram(bloomBlurProgram.program);
            for (let i = 0; i < bloomFramebuffers.length; i++) {
                const dest = bloomFramebuffers[i];
                gl.uniform2f(bloomBlurProgram.uniforms.texelSize, last.texelSizeX, last.texelSizeY);
                gl.uniform1i(bloomBlurProgram.uniforms.uTexture, last.attach(0));
                blit(dest);
                last = dest;
            }

            gl.blendFunc(gl.ONE, gl.ONE);
            gl.enable(gl.BLEND);

            for (let i = bloomFramebuffers.length - 2; i >= 0; i--) {
                const baseTex = bloomFramebuffers[i];
                gl.uniform2f(bloomBlurProgram.uniforms.texelSize, last.texelSizeX, last.texelSizeY);
                gl.uniform1i(bloomBlurProgram.uniforms.uTexture, last.attach(0));
                gl.viewport(0, 0, baseTex.width, baseTex.height);
                blit(baseTex);
                last = baseTex;
            }

            gl.disable(gl.BLEND);
            gl.useProgram(bloomFinalProgram.program);
            gl.uniform2f(bloomFinalProgram.uniforms.texelSize, last.texelSizeX, last.texelSizeY);
            gl.uniform1i(bloomFinalProgram.uniforms.uTexture, last.attach(0));
            gl.uniform1f(bloomFinalProgram.uniforms.intensity, config.BLOOM_INTENSITY);
            blit(destination);
        }

        function applySunrays(source: FBO, mask: FBO, destination: FBO) {
            gl.disable(gl.BLEND);
            gl.useProgram(sunraysMaskProgram.program);
            gl.uniform1i(sunraysMaskProgram.uniforms.uTexture, source.attach(0));
            blit(mask);

            gl.useProgram(sunraysProgram.program);
            gl.uniform1f(sunraysProgram.uniforms.weight, config.SUNRAYS_WEIGHT);
            gl.uniform1i(sunraysProgram.uniforms.uTexture, mask.attach(0));
            blit(destination);
        }

        function blur(target: FBO, temp: FBO, iterations: number) {
            gl.useProgram(blurProgram.program);
            for (let i = 0; i < iterations; i++) {
                gl.uniform2f(blurProgram.uniforms.texelSize, target.texelSizeX, 0);
                gl.uniform1i(blurProgram.uniforms.uTexture, target.attach(0));
                blit(temp);

                gl.uniform2f(blurProgram.uniforms.texelSize, 0, target.texelSizeY);
                gl.uniform1i(blurProgram.uniforms.uTexture, temp.attach(0));
                blit(target);
            }
        }

        function render(target: FBO | null) {
            if (config.BLOOM) applyBloom(dye.read, bloom);
            if (config.SUNRAYS) {
                applySunrays(dye.read, dye.write, sunrays);
                blur(sunrays, sunraysTemp, 1);
            }

            if (target == null || !config.TRANSPARENT) {
                gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
                gl.enable(gl.BLEND);
            } else {
                gl.disable(gl.BLEND);
            }

            if (!config.TRANSPARENT) {
                gl.useProgram(colorProgram.program);
                const bc = config.BACK_COLOR;
                gl.uniform4f(colorProgram.uniforms.color, bc.r / 255, bc.g / 255, bc.b / 255, 1);
                blit(target);
            }

            if (!displayProgram) return;

            gl.useProgram(displayProgram.program);
            if (config.SHADING) {
                gl.uniform2f(
                    displayProgram.uniforms.texelSize,
                    1 / (target == null ? gl.drawingBufferWidth : target.width),
                    1 / (target == null ? gl.drawingBufferHeight : target.height)
                );
            }

            gl.uniform1i(displayProgram.uniforms.uTexture, dye.read.attach(0));

            if (config.BLOOM) {
                gl.uniform1i(displayProgram.uniforms.uBloom, bloom.attach(1));
                gl.uniform1i(displayProgram.uniforms.uDithering, ditheringTexture.attach(2));

                const scale = {
                    x: (target == null ? gl.drawingBufferWidth : target.width) / ditheringTexture.width,
                    y: (target == null ? gl.drawingBufferHeight : target.height) / ditheringTexture.height,
                };
                gl.uniform2f(displayProgram.uniforms.ditherScale, scale.x, scale.y);
            }

            if (config.SUNRAYS) {
                gl.uniform1i(displayProgram.uniforms.uSunrays, sunrays.attach(3));
            }

            blit(target);
        }

        multipleSplats(Math.floor(20 * Math.random()) + 5);

        let lastUpdateTime = Date.now();
        let colorUpdateTimer = 0;

        function update() {
            const now = Date.now();
            let dt = (now - lastUpdateTime) / 1000;
            dt = Math.min(dt, 0.016666);
            lastUpdateTime = now;

            if (resizeCanvas()) {
                initFramebuffers();
            }

            if (config.COLORFUL) {
                colorUpdateTimer += dt * config.COLOR_UPDATE_SPEED;
                if (colorUpdateTimer >= 1) {
                    colorUpdateTimer = colorUpdateTimer % 1;
                    pointers.forEach((p) => {
                        const color = generateColor();
                        p.color = [color.r * 255, color.g * 255, color.b * 255];
                    });
                }
            }

            pointers.forEach((p) => {
                if (p.moved) {
                    p.moved = false;
                    splat(
                        p.texcoordX,
                        p.texcoordY,
                        p.deltaX * config.SPLAT_FORCE,
                        p.deltaY * config.SPLAT_FORCE,
                        {
                            r: p.color[0] / 255,
                            g: p.color[1] / 255,
                            b: p.color[2] / 255,
                        }
                    );
                }
            });

            if (!config.PAUSED) {
                step(dt);
            }

            render(null);

            animFrameRef.current = requestAnimationFrame(update);
        }

        update();

        /*
         * --------------------------------
         * FIXED EVENTS (SCROLL FIX & TOUCH FIX)
         * --------------------------------
         */

        const handleMouseMove = (e: MouseEvent) => {
            const p = pointers[0];
            const prevX = p.texcoordX;
            const prevY = p.texcoordY;

            p.texcoordX = scaleByPixelRatio(e.clientX) / canvas.width;
            p.texcoordY = 1 - scaleByPixelRatio(e.clientY) / canvas.height;

            p.deltaX = correctDeltaX(p.texcoordX - prevX);
            p.deltaY = correctDeltaY(p.texcoordY - prevY);
            p.moved = Math.abs(p.deltaX) > 0 || Math.abs(p.deltaY) > 0;
            p.down = true;

            const c = generateColor();
            p.color = [c.r * 255, c.g * 255, c.b * 255];
        };

        const handleMouseUp = () => {
            pointers[0].down = false;
        };

        const handleTouchStart = (e: TouchEvent) => {
            const touches = e.targetTouches;

            for (let i = 0; i < touches.length; i++) {
                if (i >= pointers.length) {
                    pointers.push({
                        id: -1,
                        texcoordX: 0,
                        texcoordY: 0,
                        prevTexcoordX: 0,
                        prevTexcoordY: 0,
                        deltaX: 0,
                        deltaY: 0,
                        down: false,
                        moved: false,
                        color: [30, 0, 300],
                    });
                }

                const p = pointers[i];
                p.id = touches[i].identifier;
                p.down = true;
                p.moved = false;

                p.texcoordX = scaleByPixelRatio(touches[i].clientX) / canvas.width;
                p.texcoordY = 1 - scaleByPixelRatio(touches[i].clientY) / canvas.height;
                p.prevTexcoordX = p.texcoordX;
                p.prevTexcoordY = p.texcoordY;
                p.deltaX = 0;
                p.deltaY = 0;

                const c = generateColor();
                p.color = [c.r * 255, c.g * 255, c.b * 255];
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            const touches = e.targetTouches;

            for (let i = 0; i < touches.length; i++) {
                const p = pointers[i];
                if (!p || !p.down) continue;

                const prevX = p.texcoordX;
                const prevY = p.texcoordY;

                p.texcoordX = scaleByPixelRatio(touches[i].clientX) / canvas.width;
                p.texcoordY = 1 - scaleByPixelRatio(touches[i].clientY) / canvas.height;

                p.deltaX = correctDeltaX(p.texcoordX - prevX);
                p.deltaY = correctDeltaY(p.texcoordY - prevY);
                p.moved = Math.abs(p.deltaX) > 0 || Math.abs(p.deltaY) > 0;
            }
        };

        const handleTouchEnd = (e: TouchEvent) => {
            const touches = e.changedTouches;

            for (let i = 0; i < touches.length; i++) {
                const p = pointers.find((pointer) => pointer.id === touches[i].identifier);
                if (p) {
                    p.down = false;
                }
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("touchstart", handleTouchStart, { passive: true });
        window.addEventListener("touchmove", handleTouchMove, { passive: true });
        window.addEventListener("touchend", handleTouchEnd, { passive: true });

        /* CLEANUP */
        return () => {
            cancelAnimationFrame(animFrameRef.current);

            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);

            gl.deleteProgram(blurProgram.program);
            gl.deleteProgram(copyProgram.program);
            gl.deleteProgram(clearProgram.program);
            gl.deleteProgram(colorProgram.program);
            gl.deleteProgram(bloomPrefilterProgram.program);
            gl.deleteProgram(bloomBlurProgram.program);
            gl.deleteProgram(bloomFinalProgram.program);
            gl.deleteProgram(sunraysMaskProgram.program);
            gl.deleteProgram(sunraysProgram.program);
            gl.deleteProgram(splatProgram.program);
            gl.deleteProgram(advectionProgram.program);
            gl.deleteProgram(divergenceProgram.program);
            gl.deleteProgram(curlProgram.program);
            gl.deleteProgram(vorticityProgram.program);
            gl.deleteProgram(pressureProgram.program);
            gl.deleteProgram(gradientSubtractProgram.program);

            if (displayProgram) {
                gl.deleteProgram(displayProgram.program);
            }
        };
    }, [canvasRef]);
}