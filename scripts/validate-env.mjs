const requiredInBuild = ["GEMINI_API_KEY"];

const missing = requiredInBuild.filter((name) => !process.env[name]);

if (missing.length > 0) {
  console.error(`Missing required environment variables: ${missing.join(", ")}`);
  process.exit(1);
}

if (process.env.DATABASE_URL && !/^postgres(ql)?:\/\//.test(process.env.DATABASE_URL)) {
  console.error("DATABASE_URL is set but is not a valid postgres connection string.");
  process.exit(1);
}

console.log("Environment variables validated.");
