// utils.ts

// Función para filtrar las fichas por nombre de sede
export function filtrarFichasPorSede(fichas: any[], nombreSede: string) {
    // Array para almacenar las fichas que cumplen con el criterio de búsqueda
    const fichasFiltradas = [];

    // Iterar sobre cada ficha
    for (const ficha of fichas) {
        // Verificar si la ficha tiene una sede asociada y si alguna de las sedes tiene el nombre deseado
        if (ficha.sede && ficha.sede.length > 0) {
            for (const sede of ficha.sede) {
                if (sede.nombreSede === nombreSede) {
                    fichasFiltradas.push(ficha);
                    break; // Romper el ciclo interno una vez que se encuentra la sede deseada
                }
            }
        }
    }

    return fichasFiltradas;
}
