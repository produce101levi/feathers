async function log(context){
    console.log("TEST TWO service hook", context.path);
    return context;
}

module.exports = {
    log
}