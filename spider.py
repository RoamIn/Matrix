# -*- coding:utf-8 -*-
import json
import requests
from bs4 import BeautifulSoup

if __name__ == '__main__':
    origin = 'http://www.321n.net/'
    pathname = 'forum-292-{}.html'
    page = 1
    headers = {
        'Accept':
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Encoding':
        'gzip, deflate',
        'Content-Type':
        'application/x-www-form-urlencoded;charset=UTF-8',
        'Accept-Language':
        'zh-CN,zh;q=0.9',
        'Host':
        'www.321n.net',
        'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
    }
    req = requests.get(url=origin + pathname.format(page), headers=headers)
    html = req.text
    soup = BeautifulSoup(html.encode('gbk'), 'lxml')
    table = soup.find(id='threadlisttableid')
    ths_list = soup.find_all('a', class_='s')

    file_name = pathname.format(page)
    print('---------正在保存文件%s-------' % file_name)
    # 运用with open as语句使代码更加简洁 避免写异常处理和文件关闭语句
    with open(file_name, 'w', encoding='utf-8') as file:
        file.write(html)
    print('---------success!---------')

    print(len(ths_list))