import DatabaseConnection from "./database.type";
import FilesWrite from "./files.type";

export default interface Config extends FilesWrite, DatabaseConnection {
    consoleOutputCount: number
}