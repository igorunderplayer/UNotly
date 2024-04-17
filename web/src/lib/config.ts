const env = import.meta.env;

const configSchema = {
  VITE_FIREBASE_API_KEY: "string",
  VITE_FIREBASE_AUTH_DOMAIN: "string",
  VITE_FIREBASE_PROJECT_ID: "string",
  VITE_FIREBASE_STORAGE_BUCKET: "string",
  VITE_FIREBASE_MESSAGING_SENDER_ID: "string",
  VITE_FIREBASE_APP_ID: "string",
  VITE_FIREBASE_MEASUREMENT_ID: "string",
};

type configSchemaKey = keyof typeof configSchema;

const config = new Map();

for (const key in configSchema) {
  const type = configSchema[key as configSchemaKey];

  const value = env[key];

  if (typeof value != type) {
    throw new Error(`Enviroment missing ${key} <${type}> value`);
  }

  config.set(key, value);
}

export { config };
