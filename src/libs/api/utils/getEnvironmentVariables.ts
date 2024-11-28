type EnvKey = keyof AppTypes.AppEnv;

export default function getEnvVariable(name: EnvKey) {
  const variable = process.env[name];
  if (!variable) {
    throw new Error("Missing environment variable for " + name);
  }
  return variable;
}
