-- ============================================================
--  FormaLabs — Provisioning SQL
--  Initialise la base de données et insère les données de base
-- ============================================================

CREATE DATABASE IF NOT EXISTS formalabs
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE formalabs;

-- ------------------------------------------------------------
-- Référentiel : types de machine (équipements)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS types_machine (
  id          INT          NOT NULL AUTO_INCREMENT,
  label       VARCHAR(255) NOT NULL,
  description TEXT,
  PRIMARY KEY (id),
  UNIQUE KEY uq_tm_label (label)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Labs (salles)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS labs (
  id       INT          NOT NULL AUTO_INCREMENT,
  nom      VARCHAR(255) NOT NULL,
  salle    VARCHAR(100) NOT NULL,
  category VARCHAR(255),
  mission  TEXT,
  PRIMARY KEY (id),
  UNIQUE KEY uq_labs_nom   (nom),
  UNIQUE KEY uq_labs_salle (salle)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Objectifs d'un lab (1 → N)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS lab_objectives (
  id      INT  NOT NULL AUTO_INCREMENT,
  lab_id  INT  NOT NULL,
  objectif TEXT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_lo_lab FOREIGN KEY (lab_id) REFERENCES labs(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Instances de machines dans les labs
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS machine (
  id    INT          NOT NULL AUTO_INCREMENT,
  model VARCHAR(255),
  Lab   INT          NOT NULL,
  type  INT          NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_machine_lab  FOREIGN KEY (Lab)  REFERENCES labs(id),
  CONSTRAINT fk_machine_type FOREIGN KEY (type) REFERENCES types_machine(id)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Référentiel : types de projet (activités)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS type_projet (
  id          INT          NOT NULL AUTO_INCREMENT,
  label       VARCHAR(255) NOT NULL,
  description TEXT,
  PRIMARY KEY (id),
  UNIQUE KEY uq_tp_label (label)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Référentiel : types de médias
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS type_media (
  id    INT          NOT NULL AUTO_INCREMENT,
  label VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_tmed_label (label)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Projets
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Projets (
  id          INT          NOT NULL AUTO_INCREMENT,
  type        INT,
  nom         VARCHAR(255) NOT NULL,
  description TEXT,
  github      VARCHAR(500),
  date        VARCHAR(50),
  lab_id      INT,
  PRIMARY KEY (id),
  UNIQUE KEY uq_proj_nom (nom),
  CONSTRAINT fk_proj_type FOREIGN KEY (type)   REFERENCES type_projet(id),
  CONSTRAINT fk_proj_lab  FOREIGN KEY (lab_id) REFERENCES labs(id)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Médias liés à un projet
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS media (
  id     INT  NOT NULL AUTO_INCREMENT,
  projet INT  NOT NULL,
  type   INT  NOT NULL,
  media  TEXT,
  PRIMARY KEY (id),
  CONSTRAINT fk_media_projet FOREIGN KEY (projet) REFERENCES Projets(id) ON DELETE CASCADE,
  CONSTRAINT fk_media_type   FOREIGN KEY (type)   REFERENCES type_media(id)
) ENGINE=InnoDB;

-- ============================================================
--  DONNÉES DE BASE
-- ============================================================

-- Labs
INSERT INTO labs (nom, salle, category, mission) VALUES
('MakerLab',   'A101', 'Fabrication Numérique',
 'Le MakerLab est un espace dédié à la concrétisation d''idées par le prototypage rapide. Nous fournissons les outils et l''expertise nécessaires pour transformer des concepts abstraits en objets tangibles.'),
('FabLab',     'A103', 'Fabrication & Design',
 'Le FabLab offre un espace de création collaborative pour réaliser des prototypes et mener des projets de design numérique.'),
('ProtoLab',   'B205', 'Prototypage Électronique',
 'Le ProtoLab est dédié au prototypage rapide de systèmes électroniques et embarqués pour les étudiants ingénieurs.'),
('ElectroLab', 'C301', 'Électronique & Signaux',
 'Le ElectroLab met à disposition des équipements de mesure et d''analyse pour les travaux pratiques en électronique.'),
('MediaLab',   'D102', 'Médias & Communication',
 'Le MediaLab est un espace de création audiovisuelle, outillé pour la production de contenus numériques et scientifiques.');

-- Objectifs des labs
INSERT INTO lab_objectives (lab_id, objectif) VALUES
(1, 'Formation aux machines à commande numérique'),
(1, 'Soutien aux projets de fin d''études'),
(1, 'Promotion de la culture Maker sur le campus'),
(1, 'Collaboration interdisciplinaire'),
(2, 'Initiation à la découpe laser et à la gravure'),
(2, 'Accompagnement de projets de design'),
(2, 'Mutualisation des ressources de fabrication'),
(3, 'Prototypage de systèmes embarqués'),
(3, 'Formation aux microcontrôleurs et capteurs'),
(3, 'Support technique pour les projets IoT'),
(4, 'Analyse de signaux et mesures électroniques'),
(4, 'Formation pratique en soudure et câblage'),
(4, 'Réalisation de PCB et montages expérimentaux'),
(5, 'Production vidéo et podcasts scientifiques'),
(5, 'Ateliers de médiation numérique'),
(5, 'Création de supports de communication innovants');

-- Types de machines (équipements)
INSERT INTO types_machine (label, description) VALUES
('Imprimante 3D',        'Impression FDM haute précision pour prototypage rapide.'),
('Découpeuse Laser',     'Découpe et gravure sur bois, acrylique et carton.'),
('Fraiseuse CNC',        'Usinage numérique pour matériaux tendres et bois.'),
('Oscilloscope',         'Analyse de signaux électroniques 4 canaux.'),
('Poste de soudure',     'Station de soudage précision avec extraction de fumée.'),
('Caméra haute vitesse', 'Capture de mouvements rapides pour analyse physique.');

-- Instances de machines (Lab 1=MakerLab, 2=FabLab, 3=ProtoLab, 4=ElectroLab, 5=MediaLab)
INSERT INTO machine (model, Lab, type) VALUES
('Prusa MK4',        1, 1),
('Bambu Lab X1',     3, 1),
('Trotec Speedy 360',2, 2),
('Shapeoko 4',       1, 3),
('Rigol DS1054Z',    4, 4),
('Keysight DSOX1204',3, 4),
('Hakko FX-951',     4, 5),
('Photron FASTCAM',  5, 6);

-- Activités (types de projet)
INSERT INTO type_projet (label, description) VALUES
('Projets Étudiants',
 'Accompagnement complet pour vos projets académiques tutorés, de la conception à la réalisation finale.'),
('Projets Libres',
 'Un espace ouvert pour vos projets personnels, le prototypage rapide et l''expérimentation DIY en autonomie.'),
('Partenariats & Territoire',
 'Co-création avec les acteurs locaux, associations et entreprises pour ancrer l''innovation dans le territoire.'),
('Transition Écologique & Sociale',
 'Innovation durable, éco-conception et solutions à impact social pour répondre aux défis environnementaux.'),
('Narration Scientifique',
 'Ateliers de médiation et événements pour partager la culture scientifique et technique avec le plus grand nombre.');

-- Types de médias
INSERT INTO type_media (label) VALUES ('image'), ('video'), ('document');

-- Projets
INSERT INTO Projets (type, nom, description, github, date, lab_id) VALUES
(1, 'Prothèse de main imprimée 3D',
 'Conception et fabrication d''une prothèse mécanique open-source à faible coût pour enfants.',
 'https://github.com/formalabs/prosthetic-hand', 'OCT 2023', 1),
(2, 'Station Météo Connectée',
 'Boîtier résistant aux intempéries usiné par CNC pour abriter des capteurs environnementaux.',
 'https://github.com/formalabs/weather-station', 'DEC 2023', 1),
(1, 'Mobilier Modulaire',
 'Système d''étagères paramétriques découpées au laser pour l''aménagement des espaces étudiants.',
 NULL, 'JAN 2024', 1),
(2, 'Robot Line Follower',
 'Robot autonome à base de microcontrôleur pour compétition étudiante nationale.',
 'https://github.com/formalabs/line-follower', 'NOV 2023', 3),
(4, 'Capteur qualité de l''air',
 'Réseau de capteurs IoT pour monitorer la qualité de l''air dans les bâtiments universitaires.',
 'https://github.com/formalabs/air-quality', 'FEB 2024', 3),
(5, 'Mini-documentaire FabLab',
 'Court-métrage de 8 minutes présentant les activités du FabLab pour les journées portes ouvertes.',
 NULL, 'MAR 2024', 5);