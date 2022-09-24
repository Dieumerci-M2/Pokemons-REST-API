const listPockemon = require("./listPockemon")

exports.success = (message,data) =>{
    return {message,data}
}
exports.unicId = (listPockemon)=>{
    const pockemosId = listPockemon.map(pokemon=>pokemon.id)
    const maxId = pockemosId.reduce((a,b)=>Math.max(a,b))
    const unicid = maxId + 1
    return unicid
}