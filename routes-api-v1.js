// Define a Node module that handles routing 
module.exports.setup = (router, uploads, knex) => {

    // 1. Load Libraries
     let moment = require('moment')

    // 2. Define routes

    // Get
    router.get('/todos', function (req, res) {
        knex.select('todo', 'category', 'due_date').from('todos').table('todos').then(function(data) {
            res.json(data)
        })
    })

    // Post 
    router.post('/todos', function(req, res) {

        let now = moment().format('YYYY-MM-DD HH:mm:ss')

        knex('todos').insert({todo: req.body.todo.trim(), created_at: now, updated_at: now, completed: 'no', category: req.body.category, due_date: req.body.due_date}).returning('*').then(function(data) {
            res.json(data)
        })
    })

    // Return the router, with new routes attached back to the Express web server thats loading these 
    return router
}



