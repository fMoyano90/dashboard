
export class Usuario {
    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public role?: string,
        public empresa_id?: object,
        public img?: string,
        public google?: boolean,
        public _id?: string,
        ) { }
}