let products=[
{"id":"p1", name:"Sony Camera", price:533.23},
{"id":"p2", name:"LG TV", price:533.23},
{"id":"p3", name:"GoPRO Camera", price:533.23},
{"id":"p4", name:"Fire TV", price:30},
{"id":"p5", name:"Chromecast Video", price:25},
{"id":"p6", name:"PINE64", price:33.23},
{"id":"p7", name:"SOny Projector", price:933.23}
];
/**
 * Routes the request to the table controller to the correct method.
 *
 * @param {Function.Context} context - the table controller context
 * @param {Express.Request} req - the actual request
 */
function pimProductRouter(context, req) {
    
    context.log.info("pim router invoked");
    context.log.info(JSON.stringify(context.bindings));
    context.log.info(JSON.stringify(req));
    
    var res = context.res;
    var id = req.params.id;
    context.log.info("id is:" + id);
    context.log.info("req method:" + req.method);
    switch (req.method) {
        case 'GET':
            if (id) {
                getOneItem(req, res, id);
            } else {
                getAllItems(req, res);
            }
            break;
 
        case 'POST':
            insertItem(req, res);
            break;
 
        case 'PATCH':
            patchItem(req, res, id);
            break;
 
        case 'PUT':
            replaceItem(req, res, id);
            break;
 
        case 'DELETE':
            deleteItem(req, res, id);
            break;
 
        default:
            res.status(405).json({ error: "Operation not supported", message: `Method ${req.method} not supported`})
    }
}
 
function getOneItem(req, res, id) {
    //res.status(200).json({ id: id, message: "getOne" });
    for(i=0;i<products.length;i++){
        if(products[i].id == id){
            res.status(200).json(products[i]); 
            return;
        }
    }
    res.status(404).json({error:"No product found with id:"+id});
}
 
function getAllItems(req, res) {
    //res.status(200).json({ query: req.query, message: "getAll" });
    res.status(200).json(products);
}
 
function insertItem(req, res) {
    //res.status(200).json({ body: req.body, message: "insert"});
    id= req.body.id;
    for(i=0;i<products.length;i++){
        if(products[i].id == id){
            res.status(500).json({eror:"Duplicate Product ID Error"}); 
            return;
        }            
    }
    products.push(req.body);    
    res.status(200).json({message:"Product Added"});
}
 
function patchItem(req, res, id) {
    res.status(405).json({ error: "Not Supported", message: "PATCH operations are not supported" });
}
 
function replaceItem(req, res, id) {
    res.status(200).json({ body: req.body, id: id, message: "replace" });
}
 
function deleteItem(req, res, id) {
    res.status(200).json({ id: id, message: "delete" });
}
 
module.exports = pimProductRouter;