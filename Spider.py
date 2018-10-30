# -*- coding:utf-8 -*-
import json
from sys import stdout
import requests
from time import sleep
from bs4 import BeautifulSoup

from DB.DbClient import DbClient


def search_page(category, page=1):
    print('Start page %s:' % page)

    try:
        req = requests.get(
            url=category['origin'] + category['pathname'].format(page),
            headers=headers,
            timeout=2)
    except:
        print('\nSomething wrong, retry...\n')
        search_page(category, page)

    html = req.text
    soup = BeautifulSoup(html.encode('gbk'), 'lxml')
    table = soup.find(id='threadlisttableid')

    target_list = table.find_all('a', class_='s')
    store_page(category, target_list)

    page_container = soup.find(id='fd_page_bottom')
    current_page_dom = page_container.find('strong', text=page)
    next_page = current_page_dom.find_next_sibling('a')

    print('\nEnd\n')

    if next_page != None:
        sleep(.2)
        search_page(category, next_page.string)
    else:
        print(':)\nEverything done !')


def store_page(category, target_list):
    list_len = len(target_list)

    for i, target in enumerate(target_list):
        pathname = target.get('href')
        db.put({
            'category': category['category'],
            'origin': category['origin'],
            'title': target.string,
            'pathname': pathname,
            'href': category['origin'] + pathname
        })
        stdout.write('\r{}/{}'.format(i + 1, list_len))
        stdout.flush()
        sleep(.05)


if __name__ == '__main__':
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
    category_list = [{
        'category': '原创',
        'origin': 'http://www.321n.net',
        'pathname': '/forum-292-{}.html'
    }]
    db = DbClient()

    for category in category_list:
        search_page(category)