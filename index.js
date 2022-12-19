import express from 'express';
import { createConnection } from 'mysql2';
import cors from 'cors';


const app = express();
app.use(cors())
app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));


const conn = createConnection({
    host: "localhost",
    user: "root",
    password: "sept22",
    database: "phonebox"
});
conn.connect((error) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log("Database connected !");
    }
});

app.post('/Registration', (request, response) => {
    var insertQry = `INSERT INTO phonebox VALUES(
        '${request.body.name}','${request.body.email}',
        ${request.body.phone},'${request.body.password}')`
    conn.query(insertQry, (error, result) => {
        if (error) {
            response.status(500).send({ message: 'Error in inserting data' });
        }
        else {
            response.status(200).send({ message: 'User registered successfully' });
        }


    });

});

app.get('/Admin', (request, response) => {
    var selectQry = "SELECT * FROM phonebox";
    conn.query(selectQry, (error, result) => {
        if (error) {
            response.status(500).send({ message: 'Error in fetching UserData' });
        } else {
            response.status(200).send(result);
        }
    })
});
app.get('/Admin/:name', (request, response) => {
    var selectQry = "SELECT * FROM phonebox WHERE name=" + request.params.name;
    conn.query(selectQry, (error, result) => {
        if (error) {
            response.status(500).send({ message: 'Error in fetching User' });
        } else {
            response.status(200).send(result);
        }
    })
});

app.delete('/Admin/:id', (request, response) => {
    var deleteQry = "DELETE FROM phonebox WHERE name=" + request.params.name;
    conn.query(deleteQry, (error, result) => {
        if (error) {
            response.status(500).send({ message: 'Error in deleting User' });
        } else {
            response.status(200).send({ message: 'Successfully deleted User' });
        }
    })
});






app.listen(9800, () => {
    console.log('listening on 9800');
});