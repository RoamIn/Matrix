# -*- coding:utf-8 -*-
import json
import requests
from time import sleep
from bs4 import BeautifulSoup


def search_page(page=1):
    print('--------- Start page %s -------' % page)

    req = requests.get(url=origin + pathname.format(page), headers=headers)
    html = req.text
    soup = BeautifulSoup(html.encode('gbk'), 'lxml')
    table = soup.find(id='threadlisttableid')

    targets_list = table.find_all('a', class_='s')
    store_page(targets_list, page)

    page_container = soup.find(id='fd_page_bottom')
    current_page_dom = page_container.find('strong', text=page)
    next_page = current_page_dom.find_next('a')

    print('--------- End page %s \n\n-------' % page)

    if len(next_page) != 0:
        sleep(.2)
        search_page(next_page.string)


def store_page(targets_list, page):
    page_list = []
    file_path = './dist/{}.txt'.format(page)

    for each in targets_list:
        page_list.append({'title': each.string, 'href': each.get('href')})

    print('start save %s...' % file_path)
    # 运用with open as语句使代码更加简洁 避免写异常处理和文件关闭语句
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(json.dumps(page_list))
    print('save %s success !' % file_path)


if __name__ == '__main__':
    origin = 'http://www.321n.net/'
    pathname = 'forum-292-{}.html'
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

    search_page()