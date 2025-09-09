import createToken from "../../utility/CreateToken.js";
import CreateToken from "../../utility/CreateToken.js";

const UserLogin = async (req,dataModel)=>{
    try {
        let data = await dataModel.aggregate([
            {$match :{ email: req.body["email"], password: req.body["password"]}},
            {$project : {_id: 1, name: 1, email: 1, firstname: 1, lastname :1, mobile:1, photo:1}}
    ]);

        if(data.length > 0){
            let token = await createToken(data[0]["email"]);
            return {status : "success", data : data, token : token};
        }else {
            return {status: "unauthorized", data : "Invalid Credentials"};
        }



    } catch (error) {
        return {status : "failed", data : error.toString()};
        
    }

}
export default UserLogin;