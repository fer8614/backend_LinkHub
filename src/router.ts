import { Router } from "express";

const router = Router();

// Auth and Register
router.post("/auth/register", (req, res) => {
  console.log(req.body);
});

export default router;
