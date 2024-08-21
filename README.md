## 建置DB

postgreSQL建table

```
CREATE TABLE orders (
    id SERIAL NOT NULL,
    message text
);

CREATE TABLE patients (
    id SERIAL NOT NULL,
    name character varying(20),
    order_id integer
);

```

新增patients資料

```
insert into patients (id,name) values (1,'小明'),(2,'小美'),(3,'小華'),(4,'小張'),(5,'小陳')
```

## 啟動

server/config/config.json設定DB連線資訊

啟用server
```
cd server
npm install
npm start
```
啟用client
```
cd client
npm install
npm start
```