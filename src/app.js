const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
    return response.status(200).json(repositories)
});

app.post("/repositories", (request, response) => {
    const { title, url, techs } = request.body;

    repository = {
        id: uuid(),
        title,
        url,
        techs,
        likes: 0
    }

    repositories.push(repository)

    return response.status(200).json(repository);

});

app.put("/repositories/:id", (request, response) => {
    const { title, url, techs } = request.body;
    const{ id } = request.params;

    const index = repositories.findIndex(repository => id === repository.id);

    if(index < 0) {
        return response.status(400).json({ error: "Repository does not exists" });
    }

    repositories[index].title = title;
    repositories[index].url = url;
    repositories[index].techs = techs;

    return response.status(200).json(repositories[index]);
});

app.delete("/repositories/:id", (request, response) => {
    const{ id } = request.params;

    const index = repositories.findIndex(repository => id === repository.id);

    if(index < 0) {
        return response.status(400).json({ error: "Repository does not exists" });
    }

    repositories.splice(index,1)

    return response.status(204).json();
});

app.post("/repositories/:id/like", (request, response) => {
    const{ id } = request.params;

    const index = repositories.findIndex(repository => id === repository.id);

    if(index < 0) {
        return response.status(400).json({ error: "Repository does not exists" });
    }

    repositories[index].likes++;

    return response.status(200).json(repositories[index]);
});

module.exports = app;
