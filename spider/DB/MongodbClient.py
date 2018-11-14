import pymongo


class MongodbClient(object):
    def __init__(self, name, host, port):
        self.name = name
        self.client = pymongo.MongoClient(host, port)
        self.db = self.client.movie

    def changeTable(self, name):
        self.name = name

    def get(self, key):
        data = self.db[self.name].find_one({'href': key})

        return data if data != None else None

    def put(self, torrent, num=1):
        if self.db[self.name].find_one({'href': torrent['href']}):
            return None
        else:
            self.db[self.name].insert(torrent)

    def delete(self, key):
        self.db[self.name].remove({'href': key})

    def getAll(self):
        return {p['href'] for p in self.db[self.name].find()}

    def clean(self):
        self.client.drop_database('lw')

    def delete_all(self):
        self.db[self.name].remove()

    def update(self, key, value):
        self.db[self.name].update({'href': key}, {'$set': value})

    def exists(self, key):
        return True if self.db[self.name].find_one({
            'href': key
        }) != None else False


if __name__ == '__main__':
    db = MongodbClient('first', 'localhost', 27017)
    # db.put('127.0.0.1:1')
    # db2 = MongodbClient('second', 'localhost', 27017)
    # db2.put('127.0.0.1:2')
    print(db.getAll())