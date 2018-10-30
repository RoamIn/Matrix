# -*- coding: utf-8 -*-

import os
import sys

from Utils.GetConfig import GetConfig

sys.path.append(os.path.dirname(os.path.abspath(__file__)))


class DbClient(object):
    '''
    DbClient DB工厂类 提供get/put/delete/getAll/changeTable方法
    抽象方法定义：
        get(key): 返回torrent的信息；
        put(torrent): 存入一个；
        exists(key, value): 判断代理是否存在
        update(torrent): 修改代理属性计数器的值;
        delete(key): 删除指定代理；
        getAll(): 返回所有代理；
        changeTable(name): 切换 table or collection or hash;
        所有方法需要相应类去具体实现：
            SSDB: SsdbClient.py
            MONGODB: MongodbClient.py
    '''

    def __init__(self):
        '''
        init
        :return:
        '''
        self.config = GetConfig()
        self.__initDbClient()

    def __initDbClient(self):
        '''
        init DB Client
        :return:
        '''
        __type = None

        if 'MONGODB' == self.config.db_type:
            __type = 'MongodbClient'
        else:
            pass
        assert __type, 'type error, Not support DB type: {}'.format(
            self.config.db_type)
        self.client = getattr(__import__(__type), __type)(
            name=self.config.db_name,
            host=self.config.db_host,
            port=self.config.db_port)

    def get(self, key, **kwargs):
        return self.client.get(key, **kwargs)

    def put(self, key, **kwargs):
        return self.client.put(key, **kwargs)

    def update(self, key, value, **kwargs):
        return self.client.update(key, value, **kwargs)

    def delete(self, key, **kwargs):
        return self.client.delete(key, **kwargs)

    def exists(self, key, **kwargs):
        return self.client.exists(key, **kwargs)

    def getAll(self):
        return self.client.getAll()

    def changeTable(self, name):
        self.client.changeTable(name)


if __name__ == '__main__':
    account = DbClient()
    print(account.get(''))
    account.changeTable('use')
    account.put('ac')
    print(account.get(''))