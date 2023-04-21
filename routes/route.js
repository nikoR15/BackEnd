const { Router } = require('express')
const express = require('express')
const connection = require('express-myconnection')
const routes = express.Router()

routes.get('/', (req, res) => {
    req.getConnection((err,conn) =>{
        if (err) return res.send(err)

        conn.query('SELECT * from registro', (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.post('/', (req, res) => {
    req.getConnection((err,conn) =>{
        if (err) return res.send(err)
        req.body.Rol="Usuario"
        conn.query('insert into registro set ?',[req.body], (err, rows) => {
            if(err) return res.send(err)

            res.send('User inserted!')
        })
    })
})

routes.delete('/:id', (req, res) => {
    req.getConnection((err,conn) =>{
        if (err) return res.send(err)
        
        conn.query('delete from registro where contrasena = ?',[req.params.id], (err, rows) => {
            if(err) return res.send(err)

            res.send('User excluded!')
        })
    })
})

routes.put('/:id', (req, res) => {
    req.getConnection((err,conn) =>{
        if (err) return res.send(err)
        
        conn.query('UPDATE registro set ? where Contrasena = ?',[req.body,req.params.id], (err, rows) => {
            if(err) return res.send(err)

            res.send('User updated!')
        })
    })
})

module.exports = routes
