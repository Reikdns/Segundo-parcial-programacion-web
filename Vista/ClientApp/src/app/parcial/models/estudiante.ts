import { Vacuna } from "./vacuna";

export class Estudiante {
    tipoDeDocumento: string;
    identificacion: string;
    nombre: string
    fechaDeNacimiento: Date;
    institucionEducativa: string;
    nombreDelAcudiente: string;
    vacunas: Vacuna[];
}
