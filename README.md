## Usage

* 安装依赖:

```shell
pip install -r requirements.txt
```

* 配置Config.ini:

```shell
# Config.ini 为项目配置文件
# 配置DB
type = MONGODB       # 如果使用SSDB或redis数据库，均配置为SSDB
host = 127.0.0.1  # db host
port = 27017       # db port
name = lw      # db name
```

* 启动:

```shell
# 如果你的依赖已经安全完成并且具备运行条件,可以直接在Run下运行main.py
# 到Run目录下:
>>>python Spider.py
```
