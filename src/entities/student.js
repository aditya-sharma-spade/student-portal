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
     userid:{
      type:"int",
      nullable:false
     },
     course:{
      type:"varchar",
     },

    },
    relations: {
        user: {
            type: "many-to-one",
            target: "User",
            joinColumn: { name: "userid" },
            onDelete: "CASCADE"   // deleting User auto-deletes Student
        }
    }
}
)
export default student