const corsOptions = {
    origin: [
        'https://task-manager-9vcy-git-main-kobra-eslamis-projects.vercel.app/'
    ],
    // origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
};

export default corsOptions;