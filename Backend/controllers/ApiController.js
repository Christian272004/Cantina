import { registerUser, loginUser, getProductesModel, generateAuthToken, verifyAuthToken, verifyCart, createCart, guardarProducto, producto } from "../models/apiQueries.js";

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

  static async addToCarrito(req, res) {
    try {
      const { id } = req.user;
      const { productId } = req.body;


      if (!productId) {
        return res.status(400).json({ succes: false, message: "Product ID is required", data: [] });
      }

      // Primero verificar si tiene un carrito el usuario
      const cart = await verifyCart(id);

      if (!cart) {
        const newCart = await createCart(id);
        if (!newCart) {
          return res.status(500).json({ succes: false, message: "Error creating cart", data: [] });
        }

      } else {
        // Buscar si ya existe el producto en el carrito
        const Product = await producto(productId, cart.id);
        if (!Product) return res.status(404).json({ succes: false, message: "Product not found", data: [] });

        res.status(200).json({ succes: true, message: "Producto añadido al carrito", data: [Product] });
      }
      

      
    } catch (err) {
      res.status(500).json({ succes: false, message: err.message, data: [] });
    }
  }
}