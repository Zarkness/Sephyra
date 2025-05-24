import { client } from "../core/client"; // usar el mismo cliente
import { readdirSync } from "fs";
import path from "path";

export async function registerEvents() {
  const eventsPath = __dirname;
  const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith(".ts") || file.endsWith(".js"));

  for (const file of eventFiles) {
    const ignoredFiles = ["eventHandler.ts", "ready.ts", "deployCommands.ts"];
    if (ignoredFiles.includes(file)) continue;

    const { name, once, execute } = await import(`${eventsPath}/${file}`);

    if (!name || !execute) {
      console.warn(`[Evento] ❌ El archivo ${file} no tiene las propiedades necesarias`);
      continue;
    }

    if (once) {
      client.once(name, (...args) => execute(...args));
    } else {
      client.on(name, (...args) => execute(...args));
    }

    console.log(`[Evento] ✅ Cargado: ${name}`);
  }
}
