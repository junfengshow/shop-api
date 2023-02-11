```javascript
const result = find(data)

      .where({

        title: /\d$/,

      })

      .orderBy('userId')

      .execute();

    console.log('result:', result);


    if (

      !isEqual(result, [

        { userId: 8, title: 'title2' },

        { userId: 19, title: 'title1' },

      ])
```

https://www.runoob.com/mysql/mysql-data-types.html