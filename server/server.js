const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");

const { Server } = require("http");

const server = Server(app);

const PORT = 3000;

// const {
// ...
// } = require("./db");

//*********** MIDDLEWARES ***********/
app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        sameSite: true,
    })
);

// app.get("*", function (req, res) {
//     res.sendFile(path.join(__dirname, "..", "client", "index.html"));
// });

app.get("/api/me", (request, response) => {
    response.json({ Success: true });
    const { user_id } = request.session;
    console.log("SESSION ID", user_id);
});

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening on port ", PORT);
});
