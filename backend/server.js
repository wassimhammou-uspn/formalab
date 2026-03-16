// ============================================================
//  FormaLabs — Backend API (Express + MySQL)
//  Démarrage : node server.js
// ============================================================

import express  from 'express';
import mysql    from 'mysql2/promise';
import cors     from 'cors';
import dotenv   from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join  } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });

const app  = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ───────────────────────────────────────────────
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json());

// ── Config BDD ───────────────────────────────────────────────
const dbConfig = {
  host    : process.env.DB_HOST     || 'localhost',
  port    : parseInt(process.env.DB_PORT || '3306'),
  user    : process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME     || 'formalabs',
  charset : 'utf8mb4',
};

async function getConn() {
  return mysql.createConnection(dbConfig);
}

function handleError(res, err) {
  console.error('[DB Error]', err.message);
  res.status(500).json({ error: 'Erreur base de données', detail: err.message });
}

// ============================================================
//  GET /api/activities
// ============================================================
app.get('/api/activities', async (_req, res) => {
  let conn;
  try {
    conn = await getConn();
    const [rows] = await conn.query(
      `SELECT id, label AS title, description FROM type_projet ORDER BY id`
    );
    res.json(rows.map(r => ({ ...r, id: String(r.id) })));
  } catch (err) { handleError(res, err); }
  finally { if (conn) await conn.end(); }
});

// ============================================================
//  GET /api/equipments
// ============================================================
app.get('/api/equipments', async (_req, res) => {
  let conn;
  try {
    conn = await getConn();
    const [types] = await conn.query(
      `SELECT tm.id, tm.label AS name, tm.description
       FROM types_machine tm
       INNER JOIN machine m ON m.type = tm.id
       GROUP BY tm.id, tm.label, tm.description
       ORDER BY tm.id`
    );
    const result = await Promise.all(types.map(async (type) => {
      const [labs] = await conn.query(
        `SELECT DISTINCT l.nom AS name, l.salle AS room
         FROM machine m JOIN labs l ON m.Lab = l.id
         WHERE m.type = ? ORDER BY l.nom`,
        [type.id]
      );
      return { id: `EQ-${String(type.id).padStart(2, '0')}`, name: type.name, description: type.description || '', labs };
    }));
    res.json(result);
  } catch (err) { handleError(res, err); }
  finally { if (conn) await conn.end(); }
});

// ============================================================
//  GET /api/labs
// ============================================================
app.get('/api/labs', async (_req, res) => {
  let conn;
  try {
    conn = await getConn();
    const [rows] = await conn.query(
      `SELECT id, nom AS name, salle AS room, category, mission FROM labs ORDER BY id`
    );
    res.json(rows);
  } catch (err) { handleError(res, err); }
  finally { if (conn) await conn.end(); }
});

// ============================================================
//  GET /api/labs/:id
// ============================================================
app.get('/api/labs/:id', async (req, res) => {
  let conn;
  try {
    conn = await getConn();
    const { id } = req.params;
    const [[lab]] = await conn.query(
      `SELECT id, nom AS name, salle AS room, category, mission FROM labs WHERE id = ?`, [id]
    );
    if (!lab) return res.status(404).json({ error: 'Lab introuvable' });

    const [objectives] = await conn.query(
      `SELECT objectif FROM lab_objectives WHERE lab_id = ? ORDER BY id`, [id]
    );
    const [projects] = await conn.query(
      `SELECT p.id, p.nom AS title, p.description, p.github, p.date
       FROM Projets p WHERE p.lab_id = ? ORDER BY p.id`, [id]
    );
    res.json({
      ...lab,
      objectives: objectives.map(o => o.objectif),
      projects  : projects.map(p => ({ ...p, id: String(p.id) })),
    });
  } catch (err) { handleError(res, err); }
  finally { if (conn) await conn.end(); }
});

// ── Démarrage ────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅  FormaLabs API  →  http://localhost:${PORT}`);
  console.log(`    BDD            →  ${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`);
});