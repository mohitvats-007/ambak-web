function validdation(values){
    let error={}
    const email_pattern=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const password_pattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    
    if(values.name===''){
    error.name="!"
        }
    else{
    error.name=""
    }
    if(values.email===''){
    error.email="!"
    }
    else if(!email_pattern.test(values.email)){
        error.email="Invalid!"
    }
    else{
        error.email=""
    }
    if(values.password===''){
        error.password="!"
    }
    else if(!password_pattern.test(values.password)){
        error.password="Invalid!"
    }
    else{
        error.password=""
    }
    return error;
    }
    export default validdation;