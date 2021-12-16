const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

var db = mysql.createConnection({
    host:'34.123.7.32',
    port:"3306",
    user: 'root',
    password:'56kig4f6OAOFr9m6',
    database:'pt1',
})

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.post('/api/getdata', (require, response) => {
    const sqlRequest = "SELECT * FROM pt1.users;";
    db.query(sqlRequest,(err, result) => {
        response.send(result);
    })
})

app.post('/api/getreviews', (require, response) => {
    const ssid = require.body.ssid;
    const sqlRequest = "SELECT ROUND(avg(quietness), 1) as avgQuietness, ROUND(avg(collab_accessibility), 1) as avgCollab, ROUND(avg(private_rooms), 1) as avgPrivateRooms, ROUND(avg(whiteboards), 1) as avgWhiteboards, ROUND(avg(food_availibility), 1) as avgFood, ROUND(avg(computers), 1) as avgComputers FROM pt1.reviews WHERE ss_id = ?;";
    db.query(sqlRequest, [ssid], (err, result) => {
        response.send(result);
    })
})

app.post('/api/filter', (require, response) => {
    db.query(require.body.query,(err, result) => {
        response.send(result);
    })
})

app.post('/api/topspots', (require, response) => {
    const sqlRequest = "CALL OptimalResults();";
    db.query(sqlRequest,(err, result) => {
        response.send(result);
    })
})

app.post('/api/getuser', (require, response) => {
    const username = require.body.username;
    const sqlRequest = "SELECT * FROM pt1.users WHERE pt1.users.username = ?;";
    db.query(sqlRequest,[username] ,(err, result) => {
        response.send(result);
    })
})

app.post('/api/getlocation', (require, response) => {
    const query = '%' + require.body.query_search + '%';
    const sqlRequest = "SELECT * FROM pt1.study_spaces WHERE pt1.study_spaces.address LIKE ?;";
    db.query(sqlRequest,[query] ,(err, result) => {
        response.send(result);
    })
})

app.post("/api/insert", (require, response) => {
    const user_id = require.body.user_id;
    const password = require.body.password;
    const username = require.body.username;
    const email = require.body.email;
    const address = require.body.address;

    const sqlInsert = "INSERT INTO pt1.users (`user_id`, `password`, `username`, `email`, `address`) VALUES (?,?,?,?,?);";
    db.query(sqlInsert, [user_id, password, username, email, address], (err, result) => {
        response.send("Inserted!");
    })
});

app.post("/api/update", (require, response) => {
    const user_id = require.body.user_id;
    const password = require.body.password;

    const sqlUpdate = "UPDATE pt1.users SET pt1.users.password = ? WHERE pt1.users.user_id = ?;";
    db.query(sqlUpdate, [password, user_id], (err, result) => {
        response.send("Updated!");
    })
});

app.post("/api/delete", (require, response) => {
    const user_id = require.body.user_id;
    const password = require.body.password;
    const sqlUpdate = "DELETE FROM pt1.users WHERE pt1.users.user_id = ? AND pt1.users.password = ?;";
    db.query(sqlUpdate, [user_id, password], (err, result) => {
        response.send("Deleted!");
    })
});

app.post("/api/insertReview", (require, response) => {
    const review_id = 0;
    const user_id = 1;
    const ss_id = require.body.study_spot;  
    const quietness = require.body.quietness;
    const collab_accessibility = require.body.collab;
    const private_rooms = require.body.private_rooms;
    const whiteboards = require.body.whiteboards;
    const food_availibility = require.body.food;
    const computers = require.body.computers;

    console.log(ss_id);

    const sqlInsert = "INSERT INTO pt1.reviews (`review_id`, `ss_id`, `user_id`, `quietness`, `collab_accessibility`, `private_rooms`, `whiteboards`, `food_availibility`, `computers`) VALUES (?,?,?,?,?,?,?,?,?);";
    db.query(sqlInsert, [review_id, ss_id, user_id, quietness, collab_accessibility, private_rooms, whiteboards, food_availibility, computers], (err, result) => {
        response.send("Submitted");
    })
});

app.get('/api/adv1', (require, response) => {
    const sqlAdv1 = `(SELECT s.name, AVG(r.food_availibility) as food_avail
                        FROM pt1.reviews as r NATURAL JOIN pt1.study_spaces s
                        GROUP BY ss_id
                        ORDER BY food_avail)
                        UNION 
                        (SELECT s.name, AVG(r.quietness) as quiet_level
                        FROM pt1.reviews as r NATURAL JOIN pt1.study_spaces s 
                        GROUP BY ss_id
                        ORDER BY quiet_level
                        );`;
    db.query(sqlAdv1,(err, result) => {
        response.send(result);
    })
})

app.get('/api/adv2', (require, response) => {
    const sqlAdv2 = `SELECT sg1.course as course, AVG(sg1.curr_capacity) as curr_cap
                    FROM pt1.study_groups sg1 NATURAL JOIN (SELECT ss1.ss_id
                                                            FROM pt1.study_spaces ss1
                                                            WHERE ss1.open >= 7) as t1
                    GROUP BY sg1.course
                    HAVING curr_cap > 1
                    ORDER BY curr_cap`;
    db.query(sqlAdv2,(err, result) => {
        response.send(result);
    })
})

app.listen(3002, () => {
    console.log("running on port 3002");
})