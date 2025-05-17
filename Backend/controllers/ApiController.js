import { registerUser, loginUser, getProductesModel, generateAuthToken, verifyAuthToken } from "../models/apiQueries.js";

export class ApiController {
    static async register(req, res) {
        const { nom, email, password } = req.body;
        try {
            const user = await registerUser({ nom, email, password });
            if (!user) {
                return res.status(401).json({ error: "Invalid email or password" });
            }
            res.status(200).json({ succes: true, message: "Login successful", data: [ user ] });
        } catch (error) {
            res.status(500).json({ error: "Error during login" });
        }
    }

    static async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await loginUser(email, password);
            if (!user) {
                return res.status(401).json({ error: "Invalid email or password" });
            }
            
            const token = generateAuthToken(user.id);

            res.cookie('auth_token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 3600000,
            });
            
            res.status(200).json({ succes: true, message: "Login successful", data: [ user ] });
        } catch (error) {
            res.status(500).json({ error: "Error during login" });
        }
    }

    static async getProductes(req, res) {
        try {
            const productes = await getProductesModel();

            if (!productes) return res.status(404).json({ succes: false, message: "No productes found", data: [] });
            
            res.status(200).json({ succes: true, message: "Productes recuperados correctamente", data: [productes] });
        } catch (error) {
            res.status(500).json({ error: "Error retrieving productes" });
        }
    }

    static async check(req, res) {
    try {
      const token = req.cookies.auth_token;

      const result = verifyAuthToken(token);

      if (!result.authenticated) {
        return res.status(401).json({ authenticated: false });
      }

      return res.status(200).json({ authenticated: true, user: result.userId });
    } catch (err) {
      console.error('Error en check:', err.message);
      return res.status(401).json({ authenticated: false });
    }
  }

  static async logout(req, res) {
    try {
      res.clearCookie('auth_token', {
        httpOnly: true,
        secure: true,
        sameSite: 'none', 
      });
      res.json({ succes: true, message: "Sesión cerrada", data: [] });
    } catch (err) {
      res.status(500).json({ succes: false, message: err.message, data: [] });
    }
  }
}