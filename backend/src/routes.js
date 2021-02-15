const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config');

const Post = require('./models/post');

routes.get("/posts", multer().single('file'), async (req,res) => {
    const posts = await Post.find();

    return res.json(posts);
});

routes.post("/posts", multer().single('file'), async (req,res) => {
    const { originalname: name, size, key, location: url = "" } = req.file;
    const post = await Post.create({
        name,
        size,
        key,
        url,
    });
    return res.json(post);
});

routes.get("/", multer().single('file'), (req,res) => {
    return res.json({ hello: "Rocket" });
});

routes.delete("/posts/:id", multer().single('file'), async (req,res) => {
    const post = await Post.findById(req.params.id);

    await post.remove();

    return res.json({ message: "Sucess"});
});

module.exports = routes;