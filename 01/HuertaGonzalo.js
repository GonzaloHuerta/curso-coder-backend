class Usuario{
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }
    
    getFullName(){
        return `${this.nombre} ${this.apellido}`
    }

    addMascota(mascota){
        this.mascotas.push(mascota);
    }

    countMascotas(){
        return this,this.mascotas.length;
    }

    addBook(nombre, autor){
        this.libros.push({nombre: nombre, autor: autor})
    }

    getBookNames(){
        let arrayNombres = [];

        this.libros.forEach(item => {
            arrayNombres.push(item.nombre);
        });

        return arrayNombres;
    }
}

const usuario = new Usuario("Gonzalo", "Huerta", [{nombre: 'Fahrenheit 451', autor: 'Ray Bradbury'}], ['Gato']);

usuario.addMascota('Pez');
usuario.addMascota('Perro');

usuario.addBook('El nombre de la rosa', 'Umberto Eco');
usuario.addBook('1984', 'George Orwell');

console.log("Libros: ", usuario.libros);
console.log("Mascotas: ", usuario.mascotas);

console.log("\n**************************************************************\n")

console.log("getFullName: ", usuario.getFullName());
console.log("countMascotas: ", usuario.countMascotas());
console.log("getBookNames: ", usuario.getBookNames());