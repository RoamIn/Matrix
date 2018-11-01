# -*- coding:utf-8 -*-
import json
from sys import stdout
import requests
from time import sleep
from bs4 import BeautifulSoup

from DB.DbClient import DbClient


# 搜索每页
def search_page(category, page=1):
    try:
        req = requests.get(
            url=category['origin'] + category['pathname'].format(page),
            headers=headers,
            timeout=3)

        html = req.text
        soup = BeautifulSoup(html.encode('gbk'), 'lxml')
        pgae_link_list = soup.find(id='threadlisttableid').find_all(
            'a', class_='s')

        # 得到每页中每一条数据的信息（标题、页面地址、分类、torrent）
        target_list = get_target_list(category, pgae_link_list)

        target_list_len = len(target_list)
        for index, target in enumerate(target_list):
            target['torrent_list'] = get_target_torrent(target)
            db.put(target)

            stdout.write('\rpage {}: {}/{}'.format(page, index + 1,
                                                   target_list_len))
            stdout.flush
            sleep(.2)

        page_container = soup.find(id='fd_page_bottom')
        current_page_dom = page_container.find('strong', text=page)
        next_page = current_page_dom.find_next_sibling('a')

        if next_page != None:
            sleep(.2)
            search_page(category, next_page.string)
        else:
            print(':)\nEverything done !')
    except Exception as e:
        print(e)
        print('\nSomething wrong, retry...\n')
        search_page(category, page)


# 混入类别，地址
# {
#     "category": "原创",
#     "origin": "http://www.321n.net",
#     "title": "[11-20] 【龙网BT组】【美国动作灾难】【龙卷风】【BluRay-RMVB】【中文字幕】",
#     "pathname": "/thread-256939-1-132.html",
#     "href": "http://www.321n.net/thread-256939-1-132.html",
#     "torrent_list": []
# }
def get_target_list(category, target_list):
    mixed_list = []

    for target in target_list:
        pathname = '/' + target.get('href')
        mixed_list.append({
            'category': category['category'],
            'origin': category['origin'],
            'title': target.string,
            'pathname': pathname,
            'href': category['origin'] + pathname,
            'torrent_list': []
        })

    return mixed_list


# 获取 torrent 链接地址
def get_target_torrent(target_page):
    try:
        req = requests.get(url=target_page['href'], headers=headers, timeout=3)

        # 解析页面，获取种子下载地址
        html = req.text
        soup = BeautifulSoup(html.encode('gbk'), 'lxml')
        torrent_page_list = soup.find('ignore_js_op').find_all('a')

        torrent_list = []
        for torrent in torrent_page_list:
            href = target_page['origin'] + '/' + torrent.get('href')
            torrent_list.append({
                'href': href,
                'title': torrent.contents[0].strip()
            })

        return torrent_list

    except Exception as e:
        print(e)
        print('\nSomething wrong, retry...\n')
        return get_target_torrent(target_page)


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