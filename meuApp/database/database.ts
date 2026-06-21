import { SQLiteDatabase } from "expo-sqlite";

export async function inicializarBanco(db: SQLiteDatabase) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS memorias (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pais TEXT NOT NULL,
      cidade TEXT NOT NULL,
      data TEXT NOT NULL,
      descricao TEXT NOT NULL,
      foto TEXT
    );
  `);
}
