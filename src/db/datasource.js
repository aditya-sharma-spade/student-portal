import "reflect-metadata"
import {DataSource} from "typeorm"
import Student from "../entities/student.js"
import User from "../entities/user.js"

const AppDatasource= new DataSource({
type: "mysql",
host: "localhost",
port: "3306",
username: "root",
password: "",
database: "student_db",
synchronize: true,
logging: false,
entities: [Student,User]    //this will contain all entities we want typeorm to manage

}
)
export default AppDatasource