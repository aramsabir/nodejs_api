var posts = []
exports.Post = async (req, res) => {

    if (!req.body.title) {
        res.json({ status: false, message: "Title required" })
        return 0
    }
    if (!req.body.description) {
        res.json({ status: false, message: "Description required" })
        return 0
    }
    posts.push({ title: req.body.title, description: req.body.description })

    res.json({ status: true, message: "Post has been created successfully" })
    return 0

}

exports.List = async (req, res) => {
    res.json({ status: true, message: "List of posts", data: posts })
}

exports.One = async (req, res) => {
    res.json({ status: true, message: "One post", data: {} })
}