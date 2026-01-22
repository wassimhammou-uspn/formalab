from typing import List, Optional
from sqlalchemy import String, ForeignKey
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

class Lab(DeclarativeBase):
    __tablename__ = "labs"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True, unique=True)
    nom: Mapped[str] = mapped_column(String(50), nullable=False, unique=True)
    salle: Mapped[str] = mapped_column(String(50), nullable=False)
    
    # Relations inverses : Un Lab peut avoir plusieurs Machines
    machines: Mapped[List["Machine"]] = relationship(back_populates="lab")

class Machine(DeclarativeBase):
    __tablename__ = "machines"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True, unique=True)
    model: Mapped[str] = mapped_column(String(50))

    # Liaison vers le Lab (Parent)
    lab_id: Mapped[int] = mapped_column(ForeignKey("labs.id"))
    lab: Mapped["Lab"] = relationship(back_populates="machines")

    # Liaison vers le Type de machine
    type_id: Mapped[int] = mapped_column(ForeignKey("types_machine.id"))
    type_machine: Mapped["TypeMachine"] = relationship(back_populates="machines") # Nommage explicite

class Projet(DeclarativeBase):
    __tablename__ = "projets"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True, unique=True)
    nom: Mapped[str] = mapped_column(String(100), nullable=False, unique=True)
    desc: Mapped[str] = mapped_column(String(100), nullable=False)
    github: Mapped[str] = mapped_column(String(100), nullable=False, unique=True)
    
    # Liaison vers le Type de projet
    type_projet_id: Mapped[int] = mapped_column(ForeignKey("types_projet.id")) 
    type_projet: Mapped["TypeProjet"] = relationship(back_populates="projets")

class Media(DeclarativeBase):
    __tablename__ = "medias"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True, unique=True)
    nom: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    chemin: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)

    # Liaison vers le Projet
    projet_id: Mapped[int] = mapped_column(ForeignKey("projets.id")) 
    projet: Mapped["Projet"] = relationship(back_populates="medias")

    # Liaison vers le Type de média
    type_media_id: Mapped[int] = mapped_column(ForeignKey("types_media.id"))
    type_media: Mapped["TypeMedia"] = relationship(back_populates="medias")

# ---------------- Types -----------------

class TypeProjet(DeclarativeBase):
    __tablename__ = "types_projet"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True, unique=True)
    label: Mapped[str] = mapped_column(String(50), nullable=False, unique=True) 
    
    projets: Mapped[List["Projet"]] = relationship(back_populates="type_projet")

class TypeMachine(DeclarativeBase):
    __tablename__ = "types_machine"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True, unique=True)
    label: Mapped[str] = mapped_column(String(50), nullable=False, unique=True)
    
    machines: Mapped[List["Machine"]] = relationship(back_populates="type_machine")

class TypeMedia(DeclarativeBase):
    __tablename__ = "types_media"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True, unique=True)
    label: Mapped[str] = mapped_column(String(50), nullable=False, unique=True)
    
    medias: Mapped[List["Media"]] = relationship(back_populates="type_media")