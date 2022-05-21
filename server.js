const fs = require("fs");
const express = require("express");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const app = express();
const port = process.env.PORT || 5000;
const session = require("express-session");
const FileStore = require("session-file-store")(session); // 1

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const multer = require("multer");
const upload = multer({ dest: "./build/upload" });

/*db info*/
const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);
const mysql = require("mysql");

app.use("/image", express.static("./build/upload"));

app.use(
  session({
    secret: "keyboard cat", // 암호화
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
  })
);

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});

connection.connect();


app.post("/api/auth/login", upload.single("image"), (req, res) => {
  let body = req.body;
  let id = body.userId;

  console.log(body)

  let sql = "SELECT * FROM ADMINS WHERE name = ? and isDeleted = 0";
  let params = [id];
  connection.query(sql, params, (err, rows, fields) => {
    console.log(rows.length);
    if (rows.length < 1) {
      res.send("아이디 불일치");
    } else {
      let dbPassword = rows[0].passwd;
      let inputPassword = body.passwd;
      let hashPassword = crypto
        .createHash("sha512")
        .update(inputPassword)
        .digest("hex");

      if (dbPassword === hashPassword) {
        console.log("비밀번호 일치");
        //res.redirect("/user");
        req.session.logined = true;
        req.session.user_id = rows[0].id;
        req.session.name = rows[0].name;

        console.log("비밀번호 일치, session 생성 : " + req.session.user_id);
        res.send("로그인 성공");
      } else {
        console.log("비밀번호 불일치");
        res.send("비밀번호 불일치");
      }
    }
  });
});

app.get("/api/logout", function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    }
  });
});

app.get("/api/get_session", (req, res) => {
  console.log('불러온 세션 : '+req.session.logined+','+req.session.user_id)

  res.send(req.session);
});

app.get("/api/profile", (req, res) => {
		console.log('hihihihi')
  let sql = "SELECT * FROM ADMINS WHERE id = ?";
  let params = [req.session.user_id];

  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

app.get("/api/admins", (req, res) => {
  connection.query(
    "SELECT * FROM ADMINS WHERE isDeleted = 0",
    (err, rows, fields) => {
    if(req.session.user_id)
      res.send(rows);
    }
  );
});

app.get("/api/all", (req, res) => {
  connection.query(
    "SELECT * FROM ADMINS WHERE isDeleted = 0",
    (err, rows, fields) => {
    if(req.session.user_id)
      res.send(rows);
    }
  );
});

app.get("/api/name", (req, res) => {
  connection.query(
    "SELECT name FROM ADMINS WHERE isDeleted = 0",
    (err, rows, fields) => {
    if(req.session.user_id)
      res.send(rows);
    }
  );
});

app.post("/api/admins", upload.single("image"), (req, res) => {
  console.log(req.body);
  let sql = "INSERT INTO ADMINS VALUES (null, ?, ?, ?, ?, ?, now(), 0, ?)";
  let image = "";
  if (req.file === undefined) image = "/image/user.png";
  else image = "/image/" + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let hashPassword = crypto.createHash("sha512").update("1111").digest("hex");
  let params = [image, name, birthday, gender, job, hashPassword];
  console.log("something inserted!!");

  connection.query(sql, params, (err, rows, fields) => {
    if(req.session.user_id)
      res.send(rows);
  });
});

app.post("/api/admins/:id", upload.single("image"), (req, res) => {
  let sql;
  let params;
  let image = "";
  if (typeof req.file === "undefined") {
    console.log(req.body.image);
    image = req.body.image;
  } 
  else image = "/image/" + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let hashPassword;
  if (req.body.passwd === "") {
    sql =
      "UPDATE ADMINS SET image = ?,name = ?, birthday=?, gender=?, job=? WHERE id = ?";
    params = [image, name, birthday, gender, job, req.params.id];
  } else {
    sql =
      "UPDATE ADMINS SET image = ?,name = ?, birthday=?, gender=?, job=?, passwd=? WHERE id = ?";
    hashPassword = crypto
      .createHash("sha512")
      .update(req.body.passwd)
      .digest("hex");
    params = [image, name, birthday, gender, job, hashPassword, req.params.id];
  }

  connection.query(sql, params, (err, rows, fields) => {
    if(req.session.user_id)
    res.send(rows);
  });
});

app.delete("/api/admins/:id", (req, res) => {
  let sql = "UPDATE ADMINS SET isDeleted = 1 WHERE id = ?";
  let params = [req.params.id];
  connection.query(sql, params, (err, rows, fields) => {
    if(req.session.user_id)
    res.send(rows);
  });
});

app.get("/api/customers", (req, res) => {
  connection.query("SELECT * FROM CUSTOMERS", (err, rows, fields) => {
    if(req.session.user_id)
    res.send(rows);
  });
});

app.get("/api/cust_name", (req, res) => {
  connection.query("SELECT cust_name FROM CUSTOMERS", (err, rows, fields) => {
    if(req.session.user_id)
    res.send(rows);
  });
});

app.get("/api/manager_name", (req, res) => {
  connection.query("SELECT name FROM MANAGERS", (err, rows, fields) => {
    if(req.session.user_id)
    res.send(rows);
  });
});

app.post("/api/customers", upload.single("image"), function (req, res) {
  console.log(req.body);

  let sql =
    "INSERT INTO CUSTOMERS VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  let cust_name = req.body.cust_name;
  let cust_type = req.body.cust_type;
  let response_type = req.body.response_type;
  let cust_addr = req.body.cust_addr;
  let cust_tel = req.body.cust_tel;
  let cust_fax = req.body.cust_fax;
  let num_employee = req.body.num_employee;
  let url = req.body.url;
  let business_num = req.body.business_num;
  let main_business = req.body.main_bussiness;
  let main_trading_company = req.body.main_trading_company;
  let sales = req.body.sales;
  let pc_num = req.body.pc_num;
  let server_num = req.body.server_num;
  let use_solution = req.body.use_solution;
  let build_type = req.body.build_type;

  let params = [
    cust_name,
    cust_type,
    response_type,
    cust_addr,
    cust_tel,
    cust_fax,
    num_employee,
    url,
    business_num,
    main_business,
    main_trading_company,
    sales,
    pc_num,
    server_num,
    use_solution,
    build_type
  ];
  console.log("something inserted!!");

  connection.query(sql, params, (err, rows, fields) => {
    if(req.session.user_id)
    res.send(rows);
  });
});

app.post("/api/customers/:id", upload.single("image"), (req, res) => {
  console.log(req.body);
  let sql = "UPDATE CUSTOMERS SET cust_name = ?,cust_type = ?, response_type =?,";
  sql +=    " cust_addr=?, cust_tel=?, cust_fax=?, num_employee=?, url=?, business_num=?,";
  sql +=    " main_business=?, main_trading_company=?, sales=?, pc_num=?, server_num=?,";
  sql +=    " use_solution=?, build_type=? WHERE id=?";

  let cust_name = req.body.cust_name;
  let cust_type = req.body.cust_type;
  let response_type = req.body.response_type;
  let cust_addr = req.body.cust_addr;
  let cust_tel = req.body.cust_tel;
  let cust_fax = req.body.cust_fax;
  let num_employee = req.body.num_employee;
  let url = req.body.url;
  let business_num = req.body.business_num;
  let main_business = req.body.main_business;
  let main_trading_company = req.body.main_trading_company;
  let sales = req.body.sales;
  let pc_num = req.body.pc_num;
  let server_num = req.body.server_num;
  let use_solution = req.body.use_solution;
  let build_type = req.body.build_type;
  let params = [
    cust_name,
    cust_type,
    response_type,
    cust_addr,
    cust_tel,
    cust_fax,
    num_employee,
    url,
    business_num,
    main_business,
    main_trading_company,
    sales,
    pc_num,
    server_num,
    use_solution,
    build_type,
    req.params.id
  ];
  connection.query(sql, params, (err, rows, fields) => {
	  console.log(err)
    if(req.session.user_id)
		res.send(rows);
  });
});

app.delete("/api/customers/:id", (req, res) => {
  let sql = "DELETE FROM CUSTOMERS WHERE id = ?";
  let params = [req.params.id];
  connection.query(sql, params, (err, rows, fields) => {
    if(req.session.user_id)
    res.send(rows);
  });
});

app.get("/api/managers", (req, res) => {
  connection.query("SELECT * FROM MANAGERS", (err, rows, fields) => {
    if(req.session.user_id)
    res.send(rows);
  });
});

app.post("/api/managers", upload.single("image"), function (req, res) {
  console.log(req.body);

  let sql =
    "INSERT INTO MANAGERS VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  let cust_name = req.body.cust_name;
  let name = req.body.name;
  let department = req.body.department;
  let position = req.body.position;
  let task = req.body.task;
  let tel1 = req.body.tel1;
  let tel2 = req.body.tel2;
  let email = req.body.email;
  let subemail = req.body.subemail;
  let birthday = req.body.birthday;
  let decision_power = req.body.decision_power;
  let edm_type = req.body.edm_type;
  let reference = req.body.reference;

  let params = [
    cust_name,
    name,
    department,
    position,
    task,
    tel1,
    tel2,
    email,
    subemail,
    birthday,
    decision_power,
    edm_type,
    reference
  ];
  console.log("something inserted!!");

  connection.query(sql, params, (err, rows, fields) => {
    if(req.session.user_id)
    res.send(rows);
  });
});

app.post("/api/managers/:id", upload.single("image"), (req, res) => {
  let sql =
    "UPDATE MANAGERS SET cust_name = ?,name = ?, department=?, position=?, task=?, tel1=?, tel2=?, email=?, subemail=?, birthday=?, decision_power=?, edm_type=?, reference=? WHERE id=?";
  let cust_name = req.body.cust_name;
  let name = req.body.name;
  let department = req.body.department;
  let position = req.body.position;
  let task = req.body.task;
  let tel1 = req.body.tel1;
  let tel2 = req.body.tel2;
  let email = req.body.email;
  let subemail = req.body.subemail;
  let birthday = req.body.birthday;
  let decision_power = req.body.decision_power;
  let edm_type = req.body.edm_type;
  let reference = req.body.reference;

  let params = [
    cust_name,
    name,
    department,
    position,
    task,
    tel1,
    tel2,
    email,
    subemail,
    birthday,
    decision_power,
    edm_type,
    reference,
    req.params.id
  ];
  connection.query(sql, params, (err, rows, fields) => {
    if(req.session.user_id)
    res.send(rows);
  });
});

app.delete("/api/managers/:id", (req, res) => {
  let sql = "DELETE FROM MANAGERS WHERE id = ?";
  let params = [req.params.id];
  connection.query(sql, params, (err, rows, fields) => {
    if(req.session.user_id)
    res.send(rows);
  });
});

app.get("/api/popup", (req, res) => {
  connection.query("SELECT * FROM POPUP WHERE id=1", (err, rows, fields) => {
    res.send(rows);
  });
});

app.post("/api/popup", upload.single("image"), (req, res) => {
  console.log(req.body);
  let image = "";
  let sql = "UPDATE POPUP SET img = ?,content = ?  WHERE id=1";
  if (typeof req.file === "undefined") {
    console.log(req.body.image);
    image = req.body.image;
  } else image = "/image/" + req.file.filename;
  let content = req.body.content;
  let params = [image, content];

  connection.query(sql, params, (err, rows, fields) => {
    if(req.session.user_id)
    res.send(rows);
  });
});

app.get("/api/board", (req, res) => {
  connection.query(
    "SELECT * FROM BOARD where is_delete = 0",
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

app.post("/api/board", upload.single("image"), function (req, res) {
  console.log(req.body);

  let sql =
    "INSERT INTO BOARD(title, content, created_date) VALUES(?,?, now())";

  let title = req.body.title;
  let content = req.body.content;

  let params = [title, content];
  console.log("something inserted!!");

  connection.query(sql, params, (err, rows, fields) => {
    if(req.session.user_id)
    res.send(rows);
  });
});

app.post("/api/board/:id", upload.single("image"), (req, res) => {
  console.log(req.body);
  let sql = "UPDATE BOARD SET title = ?,content = ? where id=?";

  let title = req.body.title;
  let content = req.body.content;

  let params = [title, content, req.params.id];
  connection.query(sql, params, (err, rows, fields) => {
    if(req.session.user_id)
    res.send(rows);
  });
});

app.delete("/api/board/:id", (req, res) => {
  let sql = "UPDATE BOARD SET is_delete = 1 WHERE id = ?";
  let params = [req.params.id];
  connection.query(sql, params, (err, rows, fields) => {
    if(req.session.user_id)
    res.send(rows);
  });
});

app.get("/api/survey", (req, res) => {
  connection.query(
    "SELECT * FROM SURVEY ",
    (err, rows, fields) => {
      if(req.session.user_id)
      res.send(rows);
    }
  );
});

app.post("/api/survey", upload.single("image"), function (req, res) {
  console.log(req.body);
  
  let sql ="INSERT INTO SURVEY(comp_name, name,department,rank,contact,email,created_date,form1,form2,form3,form4,form5,form6,form7,poc) ";
      sql +=" VALUES(?,?,?,?,?,?,NOW(),?,?,?,?,?,?,?,?)"
    

  let comp_name = req.body.comp_name;
  let name = req.body.name;
  let department = req.body.department;
  let rank = req.body.rank;
  let contact = req.body.contact;
  let email = req.body.email;
  let form1 = req.body.form1;
  let form2 = req.body.form2;
  let form3 = req.body.form3;
  let form4 = req.body.form4;
  let form5 = req.body.form5;
  let form6 = req.body.form6;
  let form7 = req.body.form7;
  let poc = req.body.poc;

  let params = [comp_name,name,department,rank,contact,email,form1,form2,form3,form4,form5,form6,form7,poc];
  console.log("something inserted!!");

  connection.query(sql, params, (err, rows, fields) => {    
    res.send(rows);
  });
});

app.get("/api/question", (req, res) => {
  
  connection.query(
    "SELECT * FROM QUESTION",
    (err, rows, fields) => {
      if(req.session.user_id)
      res.send(rows);
    }
  );
});

app.post("/api/question", upload.single("image"), function (req, res) {
  console.log(req.body);
  
  let sql ="INSERT INTO QUESTION(created_date, title, content, contact) VALUES(NOW(), ?,?,?)";      
    
  let title = req.body.title;
  let content = req.body.content;
  let contact = req.body.contact;

  let params = [title,content,contact];
  console.log("something inserted!!");

  connection.query(sql, params, (err, rows, fields) => {    
    res.send(rows);
  });
});

app.get("/api/contract", (req, res) => {
  connection.query(
    "SELECT * FROM CONTRACT ",
    (err, rows, fields) => {
      if(req.session.user_id)
      res.send(rows);
    }
  );
});

app.get("/api/contract/:id", (req, res) => {
  let sql = "SELECT image FROM CONTRACT WHERE id = ?";
  let params = [req.params.id];
  connection.query(sql, params, (err, rows, fields) => {
    if(req.session.user_id)
    res.send(rows);
  });
});

app.get("/api/contract2", (req, res) => {
  connection.query(
    "SELECT * FROM CONTRACT2 ",
    (err, rows, fields) => {
      if(req.session.user_id)
      res.send(rows);
    }
  );
});

app.post("/api/contract", upload.single("image"), function (req, res) {
  console.log(req.body);
  
  let sql ="INSERT INTO CONTRACT(created_date,name,image) ";
      sql +=" VALUES(NOW(),?,?)"
  
  let name = req.body.name;
  let image = req.body.image;

  let params = [name,image];
  console.log("something inserted in contract!!");

  connection.query(sql, params, (err, rows, fields) => {    
    res.send(rows);
  });
});

app.post("/api/contract2", upload.single("image"), (req, res) => {

  let sql ="INSERT INTO CONTRACT2(created_date,name,image,base_img) ";
      sql +=" VALUES(NOW(),?,?,?)"

  let new_image = req.body.new_image;
  let name = req.body.name;
  let base_img = req.body.base_image;
  console.log(base_img);
  let params = [name, new_image,base_img];
  connection.query(sql, params, (err, rows, fields) => {
    if(req.session.user_id)
    res.send(rows);
  });
});

app.delete("/api/contract/:id", (req, res) => {
  let sql = "DELETE FROM CONTRACT WHERE id = ?";
  let params = [req.params.id];
  connection.query(sql, params, (err, rows, fields) => {
    if(req.session.user_id)
    res.send(rows);
  });
});

app.delete("/api/contract2/:id", (req, res) => {
  let sql = "DELETE FROM CONTRACT2 WHERE id = ?";
  let params = [req.params.id];
  console.log("a");

  connection.query(sql, params, (err, rows, fields) => {
    if(req.session.user_id)
    res.send(rows);
  });
});

app.get("/api/journal", (req, res) => {
  let sql = "SELECT * FROM JOURNALS WHERE user_id = ?";
  let params = [req.session.user_id];
  if (req.session.user_id === 1 || req.session.user_id === -1 || req.session.user_id === 2)
    sql =
      "SELECT JOURNALS.*, ADMINS.name FROM JOURNALS INNER JOIN ADMINS ON JOURNALS.user_id = ADMINS.id ";

  connection.query(sql, params, (err, rows, fields) => {
    if(req.session.user_id)
    res.send(rows);
  });
});

app.post("/api/journal", upload.single("image"), function (req, res) {
  let sql =
    "INSERT INTO JOURNALS VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,NOW())";

  let userId = req.session.user_id;
  let date_arr = req.body.date.split(" ");
  let date = date_arr[3] + "/" + date_arr[1] + "/" + date_arr[2];
  let classification = req.body.classification;
  let cust_name = req.body.cust_name;
  let cust_manager = req.body.cust_manager;
  let serial_no = req.body.serial_no;
  let case_id = req.body.case_id;
  let approach = req.body.approach;
  let contact = req.body.contact;
  let content = req.body.content;
  let model = req.body.model;
  let part = req.body.part;
  let reference = req.body.reference;

  let params = [
    userId,
    date,
    classification,
    cust_name,
    cust_manager,
    serial_no,
    case_id,
    approach,
    contact,
    content,
    model,
    part,
    reference
  ];
  console.log("something inserted!!");

  connection.query(sql, params, (err, rows, fields) => {
    if(req.session.user_id)
    res.send(rows);
  });
});

app.post("/api/journal/:id", upload.single("image"), (req, res) => {
  let sql =
    "UPDATE JOURNALS SET created_date = ?,classification = ?, cust_name=?,cust_manager=?, serial_no=?, case_id=?, approach=?, contact=?, content=?, model=?, part=?, reference=? WHERE id = ?";
  let date_arr = req.body.date.split(" ");
  let date = date_arr[3]
    ? date_arr[3] + "/" + date_arr[1] + "/" + date_arr[2]
    : req.body.date;

  let classification = req.body.classification;
  let cust_name = req.body.cust_name;
  let cust_manager = req.body.cust_manager;
  let serial_no = req.body.serial_no;
  let case_id = req.body.case_id;
  let approach = req.body.approach;
  let contact = req.body.contact;
  let content = req.body.content;
  let model = req.body.model;
  let part = req.body.part;
  let reference = req.body.reference;

  let params = [
    date,
    classification,
    cust_name,
    cust_manager,
    serial_no,
    case_id,
    approach,
    contact,
    content,
    model,
    part,
    reference,
    req.params.id
  ];

  connection.query(sql, params, (err, rows, fields) => {
    if(req.session.user_id)
    res.send(rows);
  });
});

app.delete("/api/journal/:id", (req, res) => {
  let sql = "DELETE  FROM JOURNALS WHERE id = ?";
  let params = [req.params.id];
  connection.query(sql, params, (err, rows, fields) => {
    if(req.session.user_id)
    res.send(rows);
  });
});

app.get("/api/attendance", (req, res) => {
  let sql = "SELECT * FROM ATTENDANCE WHERE user_id = ?";
  console.log(req.session.user_id)
  if (req.session.user_id === 1 || req.session.user_id === 2 || req.session.user_id === -1)
    sql =
      "SELECT ATTENDANCE.*, ADMINS.name FROM ATTENDANCE INNER JOIN ADMINS ON ATTENDANCE.user_id = ADMINS.id";
  let params = [req.session.user_id];
  connection.query(sql, params, (err, rows, fields) => {
    if(req.session.user_id)
      res.send(rows);
    else  
      console.log('접속 불가')
  });
});

app.post("/api/attendance", upload.single("image"), function (req, res) {
  console.log(req.body);

  let sql = "INSERT INTO ATTENDANCE VALUES (null, ?, ?, ?, ?, ?)";

  let userId = req.session.user_id;
  let attendace_type = req.body.attendace_type;
  let date = req.body.date;
  let latitude = req.body.latitude;
  let longitude = req.body.longitude;

  let params = [userId, date, latitude, longitude, attendace_type];
  console.log("something inserted!!");

  connection.query(sql, params, (err, rows, fields) => {
    if(req.session.user_id)
      res.send(rows);
    else  
      console.log('접속 불가')
  });
});

app.delete("/api/attendance/:id", (req, res) => {
  let sql = "DELETE FROM ATTENDANCE WHERE id = ?";
  let params = [req.params.id];
  connection.query(sql, params, (err, rows, fields) => {
    if(req.session.user_id)
    res.send(rows);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

