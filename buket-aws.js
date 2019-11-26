const AWS = require('aws-sdk')
const s3 = new AWS.S3({
    accessKeyId: "AKIA4NHFYZJCEBXFQ3SV",
    secretAccessKey: "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"
});
/*
s3.listBuckets({}, (err, data) =>{
    if (err) throw err;
    console.log (data);
})

var parametros = {
    Bucket: 'piccloud-site'
}

s3.listObjectsV2(parametros, (err, data)=>{
    if (err) throw err;
    console.log (data);
})
*/

