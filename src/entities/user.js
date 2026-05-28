import {EntitySchema} from "typeorm";
const user= new EntitySchema({
    name : "User",
    tableName: "users",
    columns:{
     id:{
        primary: true,
        type: "int",
        generated: true
     },
     age:{
        type: "int"

     },
     name:{
        type: "varchar"
     },
     email:{
        type: "varchar"
     }
    }
}
)
export default user