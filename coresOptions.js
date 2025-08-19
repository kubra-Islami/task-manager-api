const corsOptions = {
    origin: [
        'http://localhost:3000',
        'https://task-manager-9vcy-git-main-kobra-eslamis-projects.vercel.app/'
    ],
    // origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
};

export default corsOptions;