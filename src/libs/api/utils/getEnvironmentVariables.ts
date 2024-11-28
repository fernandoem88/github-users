export default function getEnvVariable(name: string) {
  const variable = process.env[name];
  if (!variable) {
    throw new Error("Missing environment variable for " + name);
  }
  return variable;
}
