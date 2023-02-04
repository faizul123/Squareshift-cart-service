# Cart Service

## Steps to run in local machine
- close this repo
- Checkout main branch
- Rename .env.example to .env file.
- Install npm dependencies npm install in project root folder
- Run below to command 

```bash
npm run start
```

By default service will listen in 3000 port.

### Please consider these points
- I haven't added any mongodb connection to implement this task.
- I used InMemory mongodb for this project.
- Add Item, remove Item , Get Item and calculate checkout is done
- User service is not implemented. I hardcore one special customer header to pass userId.
- UserId is Mongodb's ObjectId.
- No Testcases included.
- Postman Collection is included to test.


