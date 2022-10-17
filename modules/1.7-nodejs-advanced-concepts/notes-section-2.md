# Enhancing Node Performance

We can improve in two ways

1. Use node in 'Cluster' mode (Create instances of node program) (Recommended)
2. Use Worker threads (Thread Pool) (Stable now)

# Clustering

Clustering we use it when we have a task that it takes long to finish it, like the do work in `./code/clustering/low-server.js` file.

## Cluster Manager

The cluster manager it's responsible for the health of all the instances of node servers and also of other administrative tasks.

![cluster Manager](https://user-images.githubusercontent.com/102192445/196058496-7840cc94-2311-4f4d-924f-ddbc6241551d.png)

When we don't use clustering basically this is what's happen

Run Node index.js --> index.js --> Node Instance

Executing with Cluster Manager basically when we execute the first time It's going to boot up the Cluster Manager, and the second time that execute It's going to boot up the Work Instance.

![Cluster workflow](https://user-images.githubusercontent.com/102192445/196059707-ccf6948d-967c-4231-a0dd-02ed53622017.png)

## How to execute Clustering

We have to include import `cluster` library and use it creating new children with `fork` function.
Example: `./code/clustering/clustering.js`

**Recommendation!!**

When using clustering It's important to take a look at the processor that is running your nodejs app and only create children as the number of cores of your processor.

We can also use pm2 that is basically a clustering manager for production, so you don't need to take care to create from scratch a clustering app.
Example in `./code/clustering/index.js`

## Worker threads

Need to look for more information because the course is outdated