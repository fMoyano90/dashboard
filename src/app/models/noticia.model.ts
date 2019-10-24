export class Noticia{

    constructor (
        public titulo: string,
        public descripcion: string,
        public body: string,
        public tipo: string,
        public img?: string,
        public _id?: string,
        public created_at?: Date,

    ) { }

}
