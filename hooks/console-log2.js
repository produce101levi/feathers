async function loggerTwo(context){
    console.log("TEST ONE service hook", context.path);
    return context;
}

module.exports = {
    loggerTwo
}