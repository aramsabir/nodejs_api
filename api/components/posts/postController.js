


exports.List = async( req,res)=>{

    res.json({status:true,message:"List of posts",data:[]})
}

exports.One = async( req,res)=>{
    res.json({status:true,message:"One post",data:{}})
    
}