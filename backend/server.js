// ------------------------Entry point-----------------------
const express = require('express')
const mysql = require('mysql2');
const cors = require('cors')
const multer = require('multer')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const path = require('path')


const salt = 10;
const app = express()
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());
// app.use(express.urlencoded())   //for use middleware in js 
app.use(cookieParser())
app.use(express.static('Public'));

// -----------------------------DB------------------------=--------->
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sys'
})
// -----------------------------DB---------------------------------->
const db1 = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'org'
})
// -----------------------------Login DB---------------------------->
const db2 = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ambak'
})
// -----------------------------Partner DB------------------------------------
const db_Part = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Ambak_Partner'
})
// -----------------------------Login DB------------------------------------
app.post('/sys', (req, res) => {            //routes
    const { id, name, email, phonenumber, address, status } = req.body;
    const sql = `INSERT INTO mohit (id, name, email, phonenumber, address,status) values (?, ?, ?, ?, ?, ?)`
    const values = [id, name, email, phonenumber, address, status];

    db.query(sql, values, (err, data) => {
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
    const sql = `UPDATE mohit SET status = 0 where id = ?`;

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
    const { name, email, address, phonenumber } = req.body;
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
        return res.status(200).json({ message: 'Data updated successfully through'});
    });
});
app.get('/getAllData', (req, res) => {    //routes
    const query = "SELECT * FROM mohit";
    db.query(query, (err, data) => {
        if (err) throw err;
        res.send(data);
    });
});
// ----------------------Entry point---------------------------------- >  
// ------------------------DB1----------------------------------------->
// Save mobile number in my Mysql database 

 
// ------------------------------Server for backend------------------------------------>
const verifyuser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ Error: "You are not authenticated" });
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                return res.json({ Error: "Token is not correct" });
            } else {
                req.name = decoded.name;
                next();
            }
        });
    }
}
app.get(`/`, verifyuser, (req, res) => {
    return res.json({ Status: "Success", name: `Name ` + req.name });
})
app.post('/signup', (req, res) => {
    const sql = `INSERT INTO login (name,email,password) values (?)`
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) return res.json({ Error: "Error for Hashing password" })
        const values = [
            req.body.name,
            req.body.email,
            hash
        ]
        db2.query(sql, [values], (err, data) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Database error' });
            }
            console.log(' Inserted successfully:', data);
            return res.json({ Status: 'Success' });
        })
    })
})
app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE `email` = ?";
    db2.query(sql, [req.body.email], (err, data) => {
        if (err) return res.json({ Error: 'Login error in server' });
        if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if (err) return res.json({ Error: "password compare error" })
                if (response) {
                    const name = data[0].name
                    const token = jwt.sign({ name }, "jwt-secret-key", { expiresIn: '1d' });
                    res.cookie('token', token);
                    // location.reload(true)
                    return res.json({ Status: "Success" })
                } else {
                    return res.json({ Error: "Password does't match" })
                }
            })
        } else {
            return res.json({ Error: "No Mail Exist" })
        }
    })
})
app.get('/logout', (req, res) => {
    res.clearCookie('token')
    console.log("token")
    return res.json({ Status: "Success" });
})
app.get('/asv', (req, res) => {
    res.send('New Server');
});
// -----------------Partners API------------------------------>

app.post('/Ambak_partner', (req, res) => {            //routes
    const { id, name, email, phone } = req.body;
    const sql = `INSERT INTO t_partner (id, name, email, phone) values (?, ?, ?, ?)`
    const values = [id, name, email, phone];

    db_Part.query(sql, values, (err, data) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        console.log('Data inserted successfully:', data);
        return res.status(200).json({ message: 'Signup successful' });
    });
});
// -----------------Sub_Partners API--------------------------------->

app.post('/Ambak_Sub_partner', (req, res) => {            //routes
    const { partner_id, name, email, phone } = req.body;
    const sql = `INSERT INTO t_sub_partner (partner_id, name, email, phone) values (?, ?, ?, ?)`
    const values = [partner_id, name, email, phone];

    db_Part.query(sql, values, (err, data) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        console.log('Data inserted successfully:', data);
        return res.status(200).json({ message: 'ADD successful' });
    });
});
// -----------------Child_Partners API------------------------------->

app.post('/Ambak_Child_partner', (req, res) => {            //routes
    const { sub_part_id, name, email, phone } = req.body;
    const sql = `INSERT INTO t_child_partner (sub_part_id, name, email, phone) values (?, ?, ?, ?)`
    const values = [sub_part_id, name, email, phone];
    db_Part.query(sql, values, (err, data) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({error: 'Database error'});
        } console.log('Data inserted successfully:', data);
        return res.status(200).json({message: 'ADD successful'});
    });
});
// -----------------Update subpartner API-------------------------------->
app.put('/updateSubpartner', (req, res) => {
    const { partner_id, id } = req.body;
    // console.log(req.body,"999999999999999")
    const query = `UPDATE t_sub_partner SET partner_id = ${partner_id} WHERE id = ${id}`;
    // console.log("=====query=====>", query)
    db_Part.query(query, [partner_id, id], (err, results) => {
        if (err) {
            return res.status(500).send('Error updating subpartner');
        }
        res.send('Subpartner updated successfully');
    });
});

app.put('/updatepartner', (req, res) => {
    const { partner_id, status } = req.body;
    const query = `UPDATE t_partner SET status = ${status} WHERE id = ${partner_id}`;
    console.log("==------------====>", query)
    db_Part.query(query, [partner_id, status], (err, results) => {
        if (err) {
            return res.status(500).send('Error updating partner status');
        }
        res.send('partner status updated successfully');
    });
});

app.listen(8081, () => {
    console.log('Server running on port 8081');
});

// ----------------------API to update businessdeatils of partner------------------>
app.put('/update/business/details', (req, res) => {
    const { aadharno, panno, gstno, partner_id } = req.body;
    const query = `
      UPDATE t_business_details 
      SET aadhar_no = ?, Pan_no = ?, GST_no = ? 
      WHERE partner_id = ?;
    `;
    console.log("Update query: ", query);

    db_Part.query(query, [aadharno, panno, gstno, partner_id], (err, results) => {
        if (err) {
            console.error('Err updating busindtls:', err);
            return res.status(500).send('Error updating busindtls');
        }
        res.send('busindtls updat');
    });
});
app.put('/update/Bank/Info', (req, res) => {
    const { accno, acctype, ifsccode, partner_id } = req.body;
    const query = `
      UPDATE t_bank_info 
      SET Account_no = ?, Account_type = ?, IFSC_code = ? 
      WHERE partner_id = ?; 
    `;
    console.log("Update query: ", query);

    db_Part.query(query, [accno, acctype, ifsccode, partner_id], (err, results) => {
        if (err) {
            console.error('err in bankinfo:', err);
            return res.status(500).send('Error updating bankinfo');
        }
        res.send('bankinfo update');
    });
});
// ----------------------API to Fetch Data--------------------------->

app.get('/getpartneralldeatils', (req, res) => {    //routes
    const query = `select t_partner.id,tbd.aadhar_no,tbd.GST_no,tbd.msme_no,tbd.Pan_no ,
t_bank_info.Account_no,t_bank_info.Account_type,t_bank_info.IFSC_code,t_bank_info.Cancel_check,
t_kyc_deatil.Aadhar_img,t_kyc_deatil.Pan_img,t_kyc_deatil.GST_img
from t_partner 
left join t_business_details tbd 
on t_partner.id=tbd.Partner_id 
left join t_bank_info 
on t_partner.id=t_bank_info.partner_id
left join t_kyc_deatil 
on t_partner.id=t_kyc_deatil.partner_id;`;
    db_Part.query(query, (err, data) => {
        if (err) throw err;
        res.send(data);
    });
});
// ------------------------------Multer----------------------------->

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Public/upload');
        console.log("dess", file)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});
// console.log(file)
const upload = multer({ storage: storage });
// Endpoint to handle multiple image uploads
app.post('/uploadimg', upload.array('images', 10), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ Message: "No files uploaded" });
    }
    const { partner_id, imageType } = req.body;
    if (!partner_id || !imageType) {
        return res.status(400).json({ Message: "Missing partner_id or imageType" });
    } 
    const images = req.files.map(file => file.filename).join(',');
    console.log("Images:", images);
    console.log("Partner ID:", partner_id);
    console.log("Image Type:", imageType);
    let sql = '';
    if (imageType === 'Cancel_check') {
        sql = 'UPDATE t_bank_info SET Cancel_check = ? WHERE partner_id = ?;';
    } else if (imageType === 'Aadhar_img') {
        sql = 'UPDATE t_kyc_deatil SET Aadhar_img = ? WHERE partner_id = ?;';
    } else if (imageType === 'Pan_img') {
        sql = 'UPDATE t_kyc_deatil SET Pan_img = ? WHERE partner_id = ?;';
    } else if (imageType === 'GST_img') {
        sql = 'UPDATE t_kyc_deatil SET GST_img = ? WHERE partner_id = ?;';
    } else {
        return res.json({ Message: "Invalid image type" });
    }
    db_Part.query(sql, [images, partner_id], (err, result) => {
        if (err) return res.json({ Message: "error" });
        return res.json({ Status: "Success" });
    });
});


// ------------------------------Multer----------------------------->
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'Public/upload');
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
//     }
// });
// const upload = multer({ storage: storage });
// app.post('/uploadimg', upload.array('images', 5), (req, res) => {
//     if (!req.files || req.files.length === 0) {
//         console.log(files)
//         return res.status(400).json({ Message: "No files uploaded" });
//     }
//     const images = req.files.map(file => file.filename);
//     const { partner_id, imageType } = req.body;

//     if (!partner_id || !imageType) {
//         return res.status(400).json({ Message: "Missing partner_id or imageType" });
//     }
//     res.status(200).json({ Message: "Files uploaded successfully", images });
//     console.log("imgccccc", images)
//     console.log("partner", partner_id)
//     console.log("imgtype", imageType)
//     let sql = '';
//     switch (imageType) {
//         case 'Cancel_check':
//             sql = 'UPDATE t_bank_info SET Cancel_check = ? WHERE partner_id = ?;';
//             break;
//         case 'Aadhar_img':
//             sql = 'UPDATE t_kyc_deatil SET Aadhar_img = ? WHERE partner_id = ?;';
//             break;
//         case 'Pan_img':
//             sql = 'UPDATE t_kyc_deatil SET Pan_img = ? WHERE partner_id = ?;';
//             break;
//         case 'GST_img':
//             sql = 'UPDATE t_kyc_deatil SET GST_img = ? WHERE partner_id = ?;';
//             break;
//         default:
//             return res.json({ Message: "Invalid image type" });
//     }
//     db_Part.query(sql, [images, partner_id], (err, result) => {
//         if (err) return res.json({ Messge: "error" })
//         return res.json({ Status: "Success" });
//     })
// });


// ------------------------------------------------------------------>
app.get('/getpartnerdta', (req, res) => {
    const query = ` SELECT 
 p.id as partner_id, 
 p.name as partner_name, 
 p.phone as partner_phone, 
 p.email as partner_email,
 p.status as status,   
 s.id as subpartner_id, 
 s.name as subpartner_name, 
 s.phone as subpartner_mobile, 
 s.email as subpartner_email,
 c.id as childpartner_id,
 c.name as childpartner_name,
 c.phone as childpartner_mobile,
 c.email as childpartner_email
FROM  
    t_partner p
LEFT JOIN 
    t_sub_partner s ON p.id = s.partner_id
LEFT JOIN 
    t_child_partner c ON s.id = c.sub_part_id;
    `;
    db_Part.query(query, (err, results) => {
        if (err) throw err;
        const partners = {};
        results.forEach(row => {
            if (!partners[row.partner_id]) {
                partners[row.partner_id] = {
                    id: row.partner_id,
                    name: row.partner_name,
                    phone: row.partner_phone,
                    email: row.partner_email,
                    status: row.status,
                    subpartners: []
                };
            }
            // Create the subpartner object if it doesn't already exist
            if (row.subpartner_id) {
                partners[row.partner_id].subpartners[row.subpartner_id] = {
                    id: row.subpartner_id,
                    name: row.subpartner_name,
                    mobile: row.subpartner_mobile,
                    email: row.subpartner_email,
                    childpartners: []
                };
            }
            // Add the child partner to the corresponding subpartner
            if (row.childpartner_id) {
                partners[row.partner_id].subpartners[row.subpartner_id].childpartners.push({
                    id: row.childpartner_id,
                    name: row.childpartner_name,
                    mobile: row.childpartner_mobile,
                    email: row.childpartner_email
                });
            }
        });
        // Convert subpartners object to array before sending the response
        Object.keys(partners).forEach(partnerId => {
            partners[partnerId].subpartners = Object.values(partners[partnerId].subpartners);
        })
        res.json(Object.values(partners));
    });
});
// ------------------------------------------------------------------------------
// Function to get the Active partner ID
const getActivePartner = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT p.name, p.id, COUNT(sp.partner_id) AS no_of_subpartner FROM t_partner p LEFT JOIN t_sub_partner sp ON p.id = sp.partner_id WHERE p.status = 1 GROUP BY p.id ORDER BY no_of_subpartner ASC;`;
        db_Part.query(query, (err, data) => {
            if (err) return reject("GetActivePartner Promise rejected", err);
            if (data.length > 0) {
                const activePartnerId = data[0].id;
                resolve(activePartnerId);
            } else {
                resolve(null);
            }
        });
    });
};
// Function to get the inactive partner ID and Looptimes 
const getInactivePartner = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT p.id, COUNT(sp.partner_id) AS no_of_subpartner FROM t_partner p LEFT JOIN t_sub_partner sp ON p.id = sp.partner_id WHERE p.status = 0 GROUP BY p.id ORDER BY no_of_subpartner DESC;`;
        db_Part.query(query, (err, data) => {
            if (err) return reject(err);
            if (data.length > 0) {
                const inactivePartnerId = data[0].id;
                const Looptimes = data[0].no_of_subpartner;
                resolve({ inactivePartnerId, Looptimes });
            } else {
                resolve(null);
            }
        });
    });
};
// Function to get the partner ID to update
const getPartnerToUpdate = (inactivePartnerId) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT sp.partner_id, sp.name, sp.id FROM t_partner p LEFT JOIN t_sub_partner sp ON p.id = sp.partner_id WHERE p.id = ${inactivePartnerId} LIMIT 1;`;
        db_Part.query(query, (err, data) => {
            if (err) return reject(err);
            if (data.length > 0) {
                const partnerIdToUpdate = data[0].id;
                resolve(partnerIdToUpdate);
            } else {
                resolve(null);
            }
        });
    });
};
// Function to update the partner ID
const updatePartnerId = (activePartnerId, partnerIdToUpdate) => {
    return new Promise((resolve, reject) => {
        const query = `UPDATE t_sub_partner SET partner_id = ${activePartnerId} WHERE id = ${partnerIdToUpdate}`;
        db_Part.query(query, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
};
//  Update subpartners
app.put('/runAll', async (req, res) => {
    try {
        const inactivePartnerData = await getInactivePartner();
        const { inactivePartnerId, Looptimes } = inactivePartnerData;
        for (let i = 0; i < Looptimes; i++) {
            try {
                const activePartnerId = await getActivePartner();
                const partnerIdToUpdate = await getPartnerToUpdate(inactivePartnerId);
                const updateResult = await updatePartnerId(activePartnerId, partnerIdToUpdate);
                console.log(`Update`, updateResult);
            } catch (err) {
                console.error(`Error  `, err);
            }
        }
        return res.status(200).json({ message: `Update attempted ${Looptimes} times` });
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});













// -------------------------aniket project ---------------------------------------





// Load the JSON data
const indianLocations = require('./inidanlocation.json');

// Set up the route to serve the data
app.get('/api/locations', (req, res) => {
  res.json(indianLocations);
}); 

// --------------------------------------------------------------

app.post('/submit-form', (req, res) => {
    const { typeofpartner, name, email, mobile, state, district, message } = req.body;

    const sql = `INSERT INTO partnerwithus (typeofpartner, name, email, mobile, state, district, message) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [typeofpartner, name, email, mobile, state, district, message];

    db_Part.query(sql, values, (err, data) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        console.log('Data inserted successfully:', data);
        return res.status(200).json({ message: 'Signup successful' });
    });
});

   