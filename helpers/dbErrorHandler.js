exports.errorHandler = error =>{
    let message ="";
    if(error.code){
        switch (error.code){
            case 11000:
            case 11001:
                message =uniqueMessage(error);
                break;
            default:
                message: "something went wrong";
        }
    }else{
        for (let errorName in error.errors){
            if(error.errors[errorName].message){
                message=error.errors[errorName].message;
            }
        }
    }
    return message;
};

const uniqueMessage = error =>{
    var output="";
    try{
        var fieldname = error.message.substring(
            error.message.lastIndexOf(".$")+2,
            error.message.lastIndexOf("_1")
        )
        output= fieldname.charAt(0).toUpperCase()+
                fieldname.slice(1)+
                " already exists";

    }catch(err){
        output="Unique field already exists"
    }
    return output;
}