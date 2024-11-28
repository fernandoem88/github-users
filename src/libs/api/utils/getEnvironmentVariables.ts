import { unstable_noStore as noStore } from "next/cache";

export default function getEnvVariable(name: string) {
  // Using noStore prevents this function from being rendered statically
  noStore();
  const variable = process.env[name];
  if (!variable) {
    throw new Error("Missing environment variable for " + name);
  }
  return variable;
}
