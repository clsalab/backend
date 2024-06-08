import  teacherModel  from "../models/nosql/teacher"; // Importa tu teacherModel
import { Teacher } from "../interfaces/teacher.interface";
import { encrypt } from "../utils/bcrypt.handle";

// Función para obtener los roles del usuario por correo electrónico
async function getUserRolesByEmail(email: string): Promise<string[] | null> {
    try {
        // Buscar el usuario en la base de datos por su correo electrónico
        const user = await teacherModel.findOne({ useremail: email });
        if (user) {
            // Si se encuentra el usuario, devolver sus roles
            return user.userroles;
        } else {
            // Si no se encuentra el usuario, devolver null
            return null;
        }
    } catch (error) {
        console.error("Error al obtener los roles del usuario:", error);
        // Si ocurre un error, devolver null
        return null;
    }
    
}

const registerNewTeacher = async ({ 
    useremail,
    userpassword,
    username,
    tipoDocumento,
    fechaNacimiento,
    numeroDocumento,
    documentoIdentidad,
    paisExpedicion,
    departamentoExpedicion,
    municipioExpedicion,
    fechaExpedicion,
    nombres,
    apellidos,
    sexo,
    direccion,
    celular,
    paisNacimiento,
    departamentoNacimiento,
    municipioNacimiento,
    estrato,
    cargo,
    tituloAcademico,
    perfilLaboral,
    anoExperiencia,
    asignaturas,
}: Teacher) => {
    try {
        console.log("Datos recibidos para el registro:", { 
            useremail,
            userpassword,
            username,
            tipoDocumento,
            fechaNacimiento,
            numeroDocumento,
            documentoIdentidad,
            paisExpedicion,
            departamentoExpedicion,
            municipioExpedicion,
            fechaExpedicion,
            nombres,
            apellidos,
            sexo,
            direccion,
            celular,
            paisNacimiento,
            departamentoNacimiento,
            municipioNacimiento,
            estrato,
            cargo,
            tituloAcademico,
            perfilLaboral,
            anoExperiencia,
            asignaturas,
        });

        // Verificar si el número de documento ya existe en la base de datos
        const existingUser = await teacherModel.findOne({ numeroDocumento });
        if (existingUser) {
            return "DUPLICATE_DOCUMENT_NUMBER";
        }

        // Verificar si el correo electrónico ya está registrado
        const checkIs = await teacherModel.findOne({ useremail });
        if (checkIs) return "ALREADY_TEACHER";
        
        // Obtener los roles del usuario por su correo electrónico
        const userroles = await getUserRolesByEmail(useremail);

        // Cifrar la contraseña del usuario
        const passHash = await encrypt(userpassword);
        
        // Crear un nuevo usuario con los datos proporcionados
        const newUser = {
            username,
            useremail,
            userpassword: passHash,
            userroles: userroles || [], // Usar los roles obtenidos o un arreglo vacío si no se encontraron roles
            tipoDocumento,
            fechaNacimiento,
            numeroDocumento,
            documentoIdentidad,
            paisExpedicion,
            departamentoExpedicion,
            municipioExpedicion,
            fechaExpedicion,
            nombres,
            apellidos,
            sexo,
            direccion,
            celular,
            paisNacimiento,
            departamentoNacimiento,
            municipioNacimiento,
            estrato,
            cargo,
            tituloAcademico,
            perfilLaboral,
            anoExperiencia,
            asignaturas,
        };

        // Registrar el nuevo usuario en la base de datos
        const registerNewUser = await teacherModel.create(newUser);
        console.log("Usuario registrado exitosamente:", registerNewUser);
        return registerNewUser;
    } catch (error) {
        console.error("Error en la función registerNewUser:", error);
        throw error;
    }
};




// Función para obtener todos los profesores
async function obtener_profesores(): Promise<Teacher[]> {
    try {
        const items_de_respuesta = await teacherModel.find({});
        return items_de_respuesta;
    } catch (error) {
        console.error(`Error al obtener los profesores: ${error}`);
        return [];
    }
}

// Función para obtener un profesor por su ID
async function obtener_profesor(id: string): Promise<Teacher | null> {
    try {
        const item_de_respuesta = await teacherModel.findOne({ _id: id });
        return item_de_respuesta;
    } catch (error) {
        console.error(`Error al obtener el profesor: ${error}`);
        return null;
    }
}

// Función para actualizar un profesor
async function actualizar_profesor(id: string, datos: Teacher): Promise<Teacher | null> {
    try {
        const item_de_respuesta = await teacherModel.findOneAndUpdate({ _id: id }, datos, { new: true });
        return item_de_respuesta;
    } catch (error) {
        console.error(`Error al actualizar el profesor: ${error}`);
        return null;
    }
}

// Función para eliminar un profesor por su ID
async function eliminar_profesor(id: string): Promise<boolean> {
    try {
        await teacherModel.deleteOne({ _id: id });
        return true;
    } catch (error) {
        console.error(`Error al eliminar el profesor: ${error}`);
        return false;
    }
}

// Exporta las funciones
export {
    registerNewTeacher,
    getUserRolesByEmail,
    obtener_profesores,
    obtener_profesor,
    actualizar_profesor,
    eliminar_profesor
};
