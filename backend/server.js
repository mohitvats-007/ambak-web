    // ------------------------entry point-----------------------
    const express = require('express')
    const mysql = require('mysql2');
    const cors = require('cors')

    const app = express()
    app.use((cors()));
    app.use(express.json());   //for use middleware in js 
// -----------------------------DB------------------------------------
    const db = mysql.createConnection({
        host:'localhost',
        user: 'root',
        password:'root',
        database: 'sys'   
    }) 
    
    app.post('/sys',(req,res)=>{            //routes
        const  { id,name,email,phonenumber,address,status}= req.body;
        const sql = `INSERT INTO mohit (id, name, email, phonenumber, address,status) values (?, ?, ?, ?, ?, ?)`
        const values= [id,name,email,phonenumber,address,status];


        db.query(sql, values, (err,data)=>{
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Database error' }); 
            }

            console.log('Data inserted successfully:', data);
            return res.status(200).json({ message: 'Signup successful' });
        });
    });
     

    app.post('/setstatus/:id', (req, res) => {
        const id = req.params.id;
        console.log(`data delete on this id` + id);
        // const sql = `DELETE FROM mohit WHERE id = ?`;
        const sql = `UPDATE mohit SET status = 0 where id = ?`; //`DELETE FROM mohit WHERE id = ?`;
 
        
        db.query(sql, id, (err, data) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Database error' });
            }

            console.log('Data deleted successfully:', data);
            return res.status(200).json({ message: 'status updated successfully' });
        });
    }); 


    app.put('/sys/:id', (req, res) => {
        const id = req.params.id;
        const { name, email, address, phonenumber} = req.body;
        const sql = `UPDATE mohit SET name = ?, email = ?, address = ?, phonenumber = ? WHERE id = ?`;
        const values = [name, email, address, phonenumber, id];

        console.log('SQL Query:', sql);
        console.log('Values:', values);
        
        db.query(sql, values, (err, data) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Database error' });
            }
    
            console.log('Data updated successfully:', data);
            return res.status(200).json({ message: 'Data updated successfully through' });
        });
    });


 
app.get('/getAllData', (req, res) => {    //routes
    const query = "SELECT * FROM mohit";        
    // const query = "SELECT id FROM mohit";


    db.query(query, (err, data) => {
        if (err) throw err;

        res.send(data);
        // console.log(data);
    });

});
    // -------------------entry point--------------------------------------   
    app.listen(8081, () => {
        console.log('Server running on port 8081');
    });
    



//     //UPDATE mohit SET status = 1 where phonenumber = 3232323232;








// const express = require('express');
// const mysql = require('mysql2');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(express.json());

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'sys'
// });

// db.connect((err) => {
//     if (err) {
//         console.error('Database connection error:', err);
//         return;
//     }
//     console.log('Connected to the database');
// });

// app.post('/sys', (req, res) => {
//     const { id, name, email, phonenumber, address, status } = req.body;
//     const sql = 'INSERT INTO mohit (id, name, email, phonenumber, address, status) VALUES (?, ?, ?, ?, ?, ?)';
//     const values = [id, name, email, phonenumber, address, status];

//     db.query(sql, values, (err, result) => {
//         if (err) {
//             console.error('Database insert error:', err);
//             return res.status(500).json({ error: 'Database error' });
//         }
//         console.log('Data inserted successfully:', result);
//         return res.status(200).json({ message: 'Signup successful' });
//     });
// });

// app.post('/sys/:id', (req, res) => {
//     const id = req.params.id;
//     const sql = 'UPDATE mohit SET status = 1 WHERE id = ?';

//     db.query(sql, id, (err, result) => {
//         if (err) {
//             console.error('Database update error:', err);
//             return res.status(500).json({ error: 'Database error' });
//         }
//         console.log('Status updated successfully:', result);
//         return res.status(200).json({ message: 'Status updated successfully' });
//     });
// });

// app.put('/sys/:id', (req, res) => {
//     const id = req.params.id;
//     const { name, email, address, phonenumber } = req.body;
//     const sql = 'UPDATE mohit SET name = ?, email = ?, address = ?, phonenumber = ? WHERE id = ?';
//     const values = [name, email, address, phonenumber, id];

//     db.query(sql, values, (err, result) => {
//         if (err) {
//             console.error('Database update error:', err);
//             return res.status(500).json({ error: 'Database error' });
//         }
//         console.log('Data updated successfully:', result);
//         return res.status(200).json({ message: 'Data updated successfully' });
//     });
// });

// app.get('/getAllData', (req, res) => {
//     const query = 'SELECT * FROM mohit';

//     db.query(query, (err, data) => {
//         if (err) {
//             console.error('Database fetch error:', err);
//             return res.status(500).json({ error: 'Database error' });
//         }
//         console.log('Data fetched successfully:', data);
//         res.status(200).json(data);
//     });
// });

// app.listen(8081, () => {
//     console.log('Server running on port 8081');
// });
