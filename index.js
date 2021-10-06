const express = require('express'); //imports express
const Joi = require('joi'); //imports joi
const app = express(); //creates an express application on the app vaiable
app.use(express.json()); //used the json file


//data
const students =[
    {title: "Achieng", grade: 60, id: 1},
    {title: "Aluoch", grade: 80, id: 2},
    {title: "Akinyi", grade: 98,id: 3},
    {title: "Apiyo", grade: 60, id: 4},
    {title: "Onyango", grade: 56, id: 5},
    {title: "Otieno", grade: 74, id: 6}
];

//request handlers
//display Welcome page
app.get('/', (req, res) =>{
    res.send("This is a REST-API test!!");
});

//display student list
app.get('/api/students', (req, res) => {
    res.send(students);
});

//display specific student
app.get('/api/students/:id', (req, res) => {
    //search for the specific student id
    const student = students.find(student=>student.id === parseInt(req.params.id));
    //if the student id is not valid
    if(!student) res.status(404).send('<h2 style="color: red;">Ooops student, not found!!</h2>');
    //if student id is valid
    res.send(student);
});

//create new student information
app.post('/api/students', (req, res) => {
    //validate student data using Joi
    const { error } = validateStudent(req.body);

    //if there is an error
    if (error) {
        res.status(400).send(error.details[0].message);
        return;

    //if data is valid
    //increment student id and collect field values 
    const student = {
        id: students.length + 1,
        title: req.body.title,
        grade: req.body.grade
    };

    //push data to server
    students.push(student);
    res.send(student);

});

//update student information
app.put('/api/students/:id', (req, res) => {
    //find the student using id
    const student = student.find(student=>student.id === parseInt(req.params.id);
    //if student id is not found
    if(!student) res.status(404).send('<h2>Not Found</h2>');

    //validate using Joi
    const { error } = validateStudent(req.body);
    
    //save new data
    student.title = req.body.title;
    student.grade = req.body.grade;
    res.send(student);
});

//validate students   
function validateStudent (req) {

    const schema = Joi.object(
        {
            title: Joi.string().min(3).required(),
            grade: Joi.number().integer().less(101).required() 
         });
        
        return schema.validate(req.body);
}


//create port variable
const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Listening on port ${port}."));
