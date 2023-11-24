import { PrismaClient } from "@prisma/client";
import express from "express";
import type { Express, Request, Response } from "express";
import cors from "cors";

const app: Express = express();
const PORT = 8000;

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

const prisma = new PrismaClient();

app.get("/allTodos", async (req: Request, res: Response) => {
  const allTodos = await prisma.todo.findMany();
  return res.json(allTodos);
});

app.post("/createTodo", async (req: Request, res: Response) => {
  try {
    const { title, isCompleted } = req.body.data;
    const createTodo = await prisma.todo.create({
      data: {
        title: title,
        isCompleted: isCompleted,
      },
    });
    return res.json(createTodo);
  } catch (e) {
    return res.status(400).json(e);
  }
});

app.put("/editTodo/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { title, isCompleted } = req.body;
    const editTodo = await prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        isCompleted: isCompleted,
      },
    });
    return res.json(editTodo);
  } catch (e) {
    return res.status(400).json(e);
  }
});

app.delete("/deleteTodo/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const deleteTodo = await prisma.todo.delete({
      where: {
        id: id,
      },
    });
    return res.json(deleteTodo);
  } catch (e) {
    return res.status(400).json(e);
  }
});

app.listen(PORT, () => console.log("server is running"));
