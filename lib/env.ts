const requiredEnvVariables = ['NPS_API_KEY'] as const;

export function validateEnv() {
  const missingVars = requiredEnvVariables.filter(
    (name) => !process.env[name]
  );

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`
    );
  }
}

export const env = {
  NPS_API_KEY: process.env.NPS_API_KEY as string,
} as const;