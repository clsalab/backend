export interface Vendedor {
    id:string,
    tpDoc: "Tarjeta Identidad" | "Cedula Ciudadanía"|"Pasaporte"| "Otro"
    document: number;
    names:string,
    surnames:string,
    cel: string,
    email: string,
    address: string,
    images: string,
    
}