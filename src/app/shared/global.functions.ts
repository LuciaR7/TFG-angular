import { MatPaginatorIntl } from "@angular/material/paginator";

export function getTablasPaginatorIntl() {
    const paginatorIntl = new MatPaginatorIntl();
    paginatorIntl.itemsPerPageLabel ="Elementos por página";
    paginatorIntl.nextPageLabel = "Siguiente página";
    paginatorIntl.previousPageLabel = "Página anterior";
    paginatorIntl.firstPageLabel = "Primera página";
    paginatorIntl.lastPageLabel = "Última página";
    paginatorIntl.getRangeLabel = rangeLabel;
    return paginatorIntl;
}
/**
 * Constante paa contruir la cadena de resultados que se estan mostrando
 *
 * @param page pagina seleccionada
 * @param pageSize tamaño de pagina en elementos
 * @param length numero total de elementos
 *
 * @returns Cadena (string) con elementos que se estan visualizando
 */
const rangeLabel = (page: number, pageSize: number, length: number) => {
    const mostrando = "Mostrando del";
    const  al = "al";
    const de = "de";
    //if (length == 0 || pageSize == 0) { return `0 van ${length}`; }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;
    return `${mostrando} ${startIndex + 1} ${al} ${endIndex} ${de} ${length}`;
  }