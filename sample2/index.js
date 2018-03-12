/**
 * Routes the request to the table controller to the correct method.
 *
 * @param {Function.Context} context - the table controller context
 * @param {Express.Request} req - the actual request
 */
function pimProductRouter(context, req) {
    var res = context.res;
    var id = context.bindings.id;
    context.log.info("pim router invoked");
    context.log.info(JSON.stringify(context.bindings));
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
    res.status(200).json({ id: id, message: "getOne" });
}
 
function getAllItems(req, res) {
    res.status(200).json({ query: req.query, message: "getAll" });
}
 
function insertItem(req, res) {
    res.status(200).json({ body: req.body, message: "insert"});
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