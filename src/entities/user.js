import {EntitySchema} from 'typeorm';
const user = new EntitySchema({
 name: "User",
tableName: "users",
columns:{
id:{
    type: "int",
    primary: true,
    generated: true
},
name:{
type: "varchar"
},
email:{
type: "varchar",
unique: true
},
phone:{
type: "varchar"
},
password:{
type: "varchar"
},
role:{
    type:"varchar",
    default:"student"
}
}
})
export default user;