export const fluidConfig = {
    SIM_RESOLUTION: 128,
    DYE_RESOLUTION: 1024,

    DENSITY_DISSIPATION: 3.5,
    VELOCITY_DISSIPATION: 2.5,

    PRESSURE: 0.43,
    PRESSURE_ITERATIONS: 20,

    CURL: 0,

    SPLAT_RADIUS: 0.28,
    SPLAT_FORCE: 5000,

    SHADING: true,
    COLORFUL: true,
    COLOR_UPDATE_SPEED: 10,

    PAUSED: false,

    BACK_COLOR: {
        r: 0,
        g: 0,
        b: 0,
    },

    TRANSPARENT: false,

    BLOOM: true,
    BLOOM_ITERATIONS: 8,
    BLOOM_RESOLUTION: 256,
    BLOOM_INTENSITY: 0.1,
    BLOOM_THRESHOLD: 0.6,
    BLOOM_SOFT_KNEE: 0.7,

    SUNRAYS: true,
    SUNRAYS_RESOLUTION: 196,
    SUNRAYS_WEIGHT: 0.7,
} as const;