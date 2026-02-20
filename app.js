const express = require('express');
const app = express();
const port = 3000;

// Массив товаров (начальные данные)
let products = [
    { id: 1, name: 'Телефон', price: 15000 },
    { id: 2, name: 'Ноутбук', price: 55000 },
    { id: 3, name: 'Наушники', price: 3000 }
];

// Middleware для парсинга JSON
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Главная страница');
});

// Здесь будут маршруты...

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});

app.get('/products', (req, res) => {
    res.json(products);
});

app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).json({ message: 'Товар не найден' });
    }
    res.json(product);
});

app.post('/products', (req, res) => {
    const { name, price } = req.body;
    // Простейшая валидация
    if (!name || !price) {
        return res.status(400).json({ message: 'Необходимо указать название и цену' });
    }
    const newProduct = {
        id: products.length ? products[products.length - 1].id + 1 : 1,
        name,
        price
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

app.put('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).json({ message: 'Товар не найден' });
    }
    const { name, price } = req.body;
    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = price;
    res.json(product);
});

app.delete('/products/:id', (req, res) => {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ message: 'Товар не найден' });
    }
    products.splice(index, 1);
    res.status(204).send(); // 204 No Content – успешное удаление без тела ответа
});