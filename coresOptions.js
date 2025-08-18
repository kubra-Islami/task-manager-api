const corsOptions = {
    origin: [
        'http://localhost:3000',
        'https://task-manager-9vcy.vercel.app/'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

export default corsOptions;