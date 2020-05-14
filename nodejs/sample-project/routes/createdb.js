exports.create = function(req, res) {
    nano.db.create(req.body.dbname, function() {
        if (err) {
            res.send('Unable to create database');
            return;
        }
        res.send('Database created successfully')
    })
};