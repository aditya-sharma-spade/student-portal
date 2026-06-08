import {EntitySchema} from "typeorm";
const student= new EntitySchema({
    name : "Student",
    tableName: "students",
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
     },
     phone:{
      type: "varchar",
      nullable: true

     },
   
     userid:{
      type:"int",
      nullable:true
     }
    }
}
)
export default student