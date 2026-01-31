---
description: Configuración de GitHub con autenticación SSH y HTTPS
---

# Configuración de GitHub

Esta configuración ya está aplicada globalmente en tu sistema. Este documento sirve como referencia.

## Estado Actual

### Configuración Git Global
```bash
git config --global user.name "Matias Zabaljauregui"
git config --global user.email "zabaljauregui@gmail.com"
```

### Autenticación HTTPS (GitHub CLI)
- **Usuario GitHub**: matiaszabal
- **Método**: GitHub CLI (`gh`) con token
- **Status**: ✓ Activo
- **Scopes**: admin:public_key

### Autenticación SSH
- **Clave privada**: `~/.ssh/id_ed25519`
- **Clave pública**: `~/.ssh/id_ed25519.pub`
- **Agregada a**: GitHub account @matiaszabal
- **Status**: ✓ Verificado

## Cómo Usar

### Clonar con SSH
```bash
git clone git@github.com:username/repo.git
```

### Clonar con HTTPS
```bash
git clone https://github.com/username/repo.git
```

### Verificar Configuración

```bash
# Verificar configuración Git
git config --global --list

# Verificar GitHub CLI
gh auth status

# Verificar SSH
ssh -T git@github.com
```

## Configuración Aplicable en Nuevos Sistemas

Si necesitas replicar esta configuración en otro sistema:

### 1. Configurar Git
```bash
git config --global user.name "Matias Zabaljauregui"
git config --global user.email "zabaljauregui@gmail.com"
```

### 2. Instalar y Configurar GitHub CLI
```bash
# Instalar gh (si no está instalado)
# Autenticar
gh auth login

# Agregar scope para SSH keys
gh auth refresh -h github.com -s admin:public_key
```

### 3. Generar y Agregar SSH Key
```bash
# Generar clave SSH
ssh-keygen -t ed25519 -C "zabaljauregui@gmail.com" -f ~/.ssh/id_ed25519

# Agregar a ssh-agent
ssh-add ~/.ssh/id_ed25519

# Agregar a GitHub
gh ssh-key add ~/.ssh/id_ed25519.pub --title "Workstation - $(hostname) - $(date +%Y-%m-%d)"

# Verificar conexión
ssh -T git@github.com
```

## Notas Importantes

- La configuración de Git (`user.name`, `user.email`) es **global** y se aplica a todos los repositorios
- Las claves SSH se almacenan en `~/.ssh/` y son válidas para todos los proyectos
- La autenticación de GitHub CLI es global y funciona en todos los workspaces
- Chrome es tu navegador predeterminado para operaciones de autenticación
