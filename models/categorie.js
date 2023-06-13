const mongoose= require('mongoose')
// const schemaCategorie= Schema .......
const schemaCategorie=new mongoose.Schema({
    label:String,
    icon:String,
    color:String,
})

module.exports = mongoose.model('Categorie',schemaCategorie)