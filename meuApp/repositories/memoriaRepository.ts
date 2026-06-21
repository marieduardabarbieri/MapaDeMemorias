//O Repository é a camada responsável por centralizar todas as operações de acesso
// ao banco de dados, como inserção, listagem, atualização e exclusão.
//  Isso mantém a tela desacoplada da lógica SQL.

import { SQLiteDatabase } from "expo-sqlite";
import { Memoria, NovaMemoria } from "../types/memoria";

export async function listarMemorias(db: SQLiteDatabase): Promise<Memoria[]> {
  const resultado = await db.getAllAsync<Memoria>(
    "SELECT * FROM memorias ORDER BY id DESC;",
  );

  return resultado;
}

export async function inserirMemoria(
  db: SQLiteDatabase,
  memoria: NovaMemoria,
): Promise<void> {
  await db.runAsync(
    `INSERT INTO memorias
     (pais,cidade,data,descricao, foto)
     VALUES (?,?,?,?,?)`,
    [
      memoria.pais,
      memoria.cidade,
      memoria.data,
      memoria.descricao,
      memoria.foto,
    ],
  );
}

export async function excluirMemoria(
  db: SQLiteDatabase,
  id: number,
): Promise<void> {
  await db.runAsync("DELETE FROM memorias WHERE id = ?", [id]);
}

export async function atualizarMemoria(
  db: SQLiteDatabase,
  memoria: Memoria,
): Promise<void> {
  await db.runAsync(
    `
    UPDATE memorias
    SET
      pais = ?,
      cidade = ?,
      data = ?,
      descricao = ?,
      foto = ?
    WHERE id = ?
    `,
    [
      memoria.pais,
      memoria.cidade,
      memoria.data,
      memoria.descricao,
      memoria.foto,
      memoria.id,
    ],
  );
}
