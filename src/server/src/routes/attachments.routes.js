const router = require("express").Router();
const {attachFile, getAllAttachmentsByTaskId} = require('../controllers/attachment.controller');

router.post('/attach', attachFile);
router.get('/:taskid', getAllAttachmentsByTaskId);

module.exports = router;