in this project i tried showing how instagram handle millions of request of likes on the server by using batch processing, in real life they use a mix of kafka and redis but in this project i only used redis as a caching service

what is batch processing
so basically before performing any action you initially collect some stuff before then so that action. for ex delivery boy dont deliver boxes one by one(by this i mean its not like he will go to ware house took one product and deliver it and do it again and again) but he take multiple deliverables and deliver them to their desire location


so this project is divided into 2 parts
1. backend
2. frontend

there are two buttons on the frontend one is for normal like and another one is to bombard 1000 likes at the backend(which is done using a for loop ) and there is a polling system where every post gets updated every 5 sec to see is there any change in likes or not

now lets look at the backend the likes route uses redis as a caching service(running on docker) and all the likes are getting stored in there, the backend is running a redis polling function where backend checks every 5 sec if there exist any likes left in the cache if yes then it will transfer those likes on to the db all at once saving db from thousands of requests which might cause some issue in real production

backend consist of these routes
1. /posts : to send all post to the frontend
2. /posts/likes : to send count of likes of each posts to the frontend for polling system in frontend
3. /posts/{post_id}/likes : update the like of that post by 1 in redis and not in actual db


sections in this post
1. heading and subheading
2. image of the project
3. description which i have written above may include subsection like backend and frontend to explain each respectively
4. structure of both frontend and backend
5. how to install it in your local machine(prerequiste is docker)
6. opinon are always open, if you find something that can be improved you are always welcomed