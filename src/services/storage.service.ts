import { Storage } from "../interfaces/storage.interface";
import StorageModel from "../models/nosql/storage";



const registerUpload = async ({ fileName, idUser, path }: Storage) => {
    const responseItem = await StorageModel.create({ fileName, idUser, path });
    return responseItem;
};

export {  registerUpload };



