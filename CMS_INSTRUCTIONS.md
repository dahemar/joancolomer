# 🎬 CMS INSTRUCCIONES - JOAN COLOMER WEBSITE

## 📋 CONFIGURACIÓN INICIAL

### **1. Subir archivos CSV a Google Sheets**

Ve a tu Google Sheet: https://docs.google.com/spreadsheets/d/1CGGPnz1xQt4Bc6SBHPU_7lOKSU8v-DzdVvCL8ipVF4Q/edit?gid=0#gid=0

**Crear las siguientes hojas:**

#### **Hoja "videos"**
- Sube el archivo `csv/videos.csv`
- Esta hoja contiene todos los videos con sus metadatos

#### **Hoja "projects"**
- Sube el archivo `csv/projects.csv`
- Esta hoja contiene los proyectos (edits/directed)

#### **Hoja "categories"**
- Sube el archivo `csv/categories.csv`
- Esta hoja contiene las categorías de filtrado

#### **Hoja "settings"**
- Sube el archivo `csv/settings.csv`
- Esta hoja contiene configuraciones generales del sitio

## 🎯 CÓMO GESTIONAR CONTENIDO

### **📹 GESTIONAR VIDEOS**

#### **Añadir un nuevo video:**
1. Ve a la hoja "videos"
2. Añade una nueva fila con:
   - `id`: Identificador único (ej: video30)
   - `title`: Título del video
   - `description`: Descripción del video
   - `poster_url`: URL de la imagen (Imgur, Dropbox, etc.)
   - `video_url`: URL del video (Dropbox, Vimeo, etc.)
   - `project_id`: ID del proyecto al que pertenece
   - `category`: "music" o "commercial"
   - `order`: Número para ordenar (1, 2, 3...)
   - `is_active`: "x" para mostrar, vacío para ocultar
   - `credits`: Créditos del video
   - `created_date`: Fecha de creación (YYYY-MM-DD)
   - `updated_date`: Fecha de actualización (YYYY-MM-DD)

#### **Modificar un video existente:**
1. Busca el video por su ID
2. Modifica cualquier campo
3. Actualiza `updated_date`
4. Los cambios se reflejan automáticamente en la web

#### **Archivar un video:**
1. Encuentra el video en la hoja "videos"
2. Borra la "x" de la columna `is_active`
3. El video desaparecerá de la web (como en Instagram)

#### **Cambiar el orden de los videos:**
1. Modifica la columna `order`
2. Los videos se reordenarán automáticamente

### **🎨 GESTIONAR PROYECTOS**

#### **Añadir un nuevo proyecto:**
1. Ve a la hoja "projects"
2. Añade una nueva fila con:
   - `id`: Identificador único (ej: project15)
   - `title`: Título del proyecto
   - `description`: Descripción del proyecto
   - `type`: "music" o "commercial"
   - `order`: Número para ordenar
   - `is_active`: "x" para mostrar, vacío para ocultar
   - `created_date`: Fecha de creación
   - `updated_date`: Fecha de actualización

### **🏷️ GESTIONAR CATEGORÍAS**

#### **Modificar categorías:**
1. Ve a la hoja "categories"
2. Modifica `display_name` para cambiar cómo se muestra
3. Modifica `order` para cambiar el orden
4. Borra "x" de `is_active` para ocultar una categoría

### **⚙️ CONFIGURAR SITIO**

#### **Modificar configuraciones:**
1. Ve a la hoja "settings"
2. Modifica cualquier valor en la columna `value`
3. Los cambios se aplican automáticamente

## 🔗 ENLACES ÚTILES

### **Para subir imágenes:**
- **Imgur**: https://imgur.com/upload
- **Dropbox**: https://www.dropbox.com/
- **Google Drive**: https://drive.google.com/

### **Para subir videos:**
- **Dropbox**: https://www.dropbox.com/
- **Vimeo**: https://vimeo.com/
- **Google Drive**: https://drive.google.com/

## 📱 FUNCIONALIDADES IMPLEMENTADAS

### **✅ Gestión de Videos:**
- Añadir/editar/eliminar videos
- Cambiar títulos, descripciones, créditos
- Subir thumbnails desde cualquier URL
- Subir videos desde cualquier URL
- Ordenar videos
- Archivar videos (ocultar sin eliminar)

### **✅ Gestión de Proyectos:**
- Añadir/editar/eliminar proyectos
- Organizar por tipo (edits/directed)
- Ordenar proyectos

### **✅ Sistema de Archivo:**
- Ocultar videos sin eliminarlos
- Control total sobre qué se muestra
- Como los feeds de Instagram

### **✅ Actualización en Tiempo Real:**
- Los cambios se reflejan automáticamente
- No necesitas tocar código
- Gestión 100% desde Google Sheets

## 🚨 IMPORTANTE

### **Formato de URLs:**
- **Imágenes**: Usa URLs directas (que terminen en .jpg, .png, etc.)
- **Videos**: Usa URLs directas o de Vimeo/YouTube
- **Dropbox**: Usa enlaces compartidos con "?dl=1" al final

### **Ejemplo de URL de Dropbox:**
```
https://www.dropbox.com/s/abc123/video.mp4?dl=1
```

### **Ejemplo de URL de Imgur:**
```
https://i.imgur.com/abc123.jpg
```

## 🔧 SOLUCIÓN DE PROBLEMAS

### **Video no aparece:**
1. Verifica que `is_active` tiene "x"
2. Verifica que `project_id` existe en la hoja "projects"
3. Verifica que la URL del video es correcta

### **Imagen no carga:**
1. Verifica que la URL de la imagen es directa
2. Verifica que la imagen es accesible públicamente

### **Cambios no se reflejan:**
1. Espera 1-2 minutos (hay caché)
2. Recarga la página
3. Verifica que no hay errores en la consola (F12)

## 📞 SOPORTE

Para cualquier problema:
1. Revisa la consola del navegador (F12)
2. Verifica que las URLs son correctas
3. Verifica que los IDs coinciden entre hojas
4. Contacta al desarrollador si persiste el problema

**¡Tu web ahora es completamente gestionable desde Google Sheets!** 🚀
