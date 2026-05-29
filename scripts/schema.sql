-- TalentAI — Supabase Schema
-- Correr en: Supabase Dashboard → SQL Editor → New query

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── TABLES ──────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS employees (
    id                 UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    name               TEXT        NOT NULL,
    email              TEXT        NOT NULL UNIQUE,
    phone              TEXT,
    preferred_channel  TEXT        DEFAULT 'email',
    avatar             TEXT,
    current_role       TEXT,
    department         TEXT,
    status             TEXT        DEFAULT 'PENDING',
    current_stage      TEXT        DEFAULT 'DATA_LOADED',
    potential_score    NUMERIC     DEFAULT 0,
    performance_score  NUMERIC     DEFAULT 0,
    skills             JSONB       DEFAULT '[]'::jsonb,
    recommendations    JSONB       DEFAULT '[]'::jsonb,
    age                INTEGER,
    gender             TEXT,
    created_at         TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS evaluations (
    id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id      UUID        REFERENCES employees(id) ON DELETE CASCADE,
    interviewer_id   UUID,
    transcript       TEXT,
    biometrics       JSONB       DEFAULT '{}'::jsonb,
    burnout_analysis JSONB       DEFAULT '{}'::jsonb,
    created_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_settings (
    user_id          UUID        PRIMARY KEY,
    ai_agent_name    TEXT,
    ai_agent_profile TEXT,
    ai_agent_focus   TEXT,
    language         TEXT        DEFAULT 'es',
    theme            TEXT        DEFAULT 'dark',
    updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ─── ROW LEVEL SECURITY ──────────────────────────────────────

ALTER TABLE employees     ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluations   ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- Employees: acceso completo para usuarios autenticados (org única)
CREATE POLICY "auth_select_employees" ON employees FOR SELECT TO authenticated USING (true);
CREATE POLICY "auth_insert_employees" ON employees FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "auth_update_employees" ON employees FOR UPDATE TO authenticated USING (true);
CREATE POLICY "auth_delete_employees" ON employees FOR DELETE TO authenticated USING (true);

-- Evaluations: acceso completo para usuarios autenticados
CREATE POLICY "auth_select_evaluations" ON evaluations FOR SELECT TO authenticated USING (true);
CREATE POLICY "auth_insert_evaluations" ON evaluations FOR INSERT TO authenticated WITH CHECK (true);

-- User settings: cada usuario solo ve y edita los suyos
CREATE POLICY "own_user_settings" ON user_settings FOR ALL TO authenticated USING (auth.uid() = user_id);
