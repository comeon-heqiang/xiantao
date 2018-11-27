# xiantao
## 商城练手项目  
#### 技术栈Vue+MongoDb+Node+Vuex   
#### UI框架vant   
### 导入MongoDB数据  
####  mongorestore -h dbhost -d dbname --dir dbdirectory
### 参数或名：
####            -h： MongoDB所在服务器地址
####            -d： 需要恢复的数据库实例，例如：test，当然这个名称也可以和备份时候的不一样，比如test2
####            --dir： 备份数据所在位置，例如：/home/mongodump/itcast/
####           --drop： 恢复的时候，先删除当前数据，然后恢复备份的数据。就是说，恢复后，备份后添加修改的数据都会被删除，慎用！
#### 实例: mongorestore -h 127.0.0.1:27017 -d xiantao --dir /home/mongodump/itcast/  
### 启动前端服务
##### npm install 安装依赖   
##### npm run dev 启动服务   
### 启动后端服务
##### 进入后端文件夹 cd service   
##### npm install 安装依赖    
##### node index.js 启动服务    
