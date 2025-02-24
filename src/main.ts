import express, { Request, Response } from "express";

var app = express();

app.get("/", (req: Request, resp: Response) => {
    resp.json({ message: "Welcome to the Express + TypeScript Server!" });
});

// Start the Express server
app.listen(3030);

