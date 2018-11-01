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
            timeout=30)

        html = req.text
        soup = BeautifulSoup(html.encode('gbk'), 'lxml')
        pgae_list = soup.find(id='threadlisttableid').find_all('a', class_='s')

        target_page_list = get_target_page_list(category, pgae_list)

        for target_page in target_page_list:
            target_page['torrent_list'] = get_page_torrent(target_page)
            db.put(target_page)
            print(target_page)
            sleep(.2)

        page_container = soup.find(id='fd_page_bottom')
        current_page_dom = page_container.find('strong', text=page)
        next_page = current_page_dom.find_next_sibling('a')

        print('\nEnd\n')

        if next_page != None:
            sleep(.2)
            search_page(category, next_page.string)
        else:
            print(':)\nEverything done !')
    except Exception as e:
        print(e)
        print('\nSomething wrong, retry...\n')
        search_page(category, page)


'''
获取 torrent 链接地址
'''


def get_page_torrent(target_page):
    try:
        req = requests.get(
            url=target_page['href'], headers=headers, timeout=30)

        # 解析页面，获取种子下载地址
        html = req.text
        soup = BeautifulSoup(html.encode('gbk'), 'lxml')
        torrent_page_list = soup.find('ignore_js_op').find_all('a')

        torrent_list = []
        for torrent in torrent_page_list:
            href = get_torrent_link(target_page['origin'], torrent['href'])
            torrent_list.append({
                'href': href,
                'title': torrent.contents[0].strip()
            })
            sleep(.2)

        return torrent_page_list

    except Exception as e:
        print(e)
        print('\nSomething wrong, retry...\n')
        return get_page_torrent(target_page)


def get_torrent_link(origin, href):
    try:
        req = requests.get(
            url=origin + '/' + href, headers=headers, timeout=30)

        req.encoding = 'gbk'
        # 解析页面，获取种子下载地址
        html = req.text

        with open('code.html', 'w', encoding='utf-8') as file:
            file.write(html)

        # soup = BeautifulSoup(html.encode('gbk'), 'lxml')
        # link = soup.find(id='wp').find('center').find('a')

        # print(link)

        # return link.get('href')
    except Exception as e:
        print(e)
        print('\nSomething wrong, retry...\n')
        return get_torrent_link(origin, href)


'''
混入类别，地址
'''


def get_target_page_list(category, target_list):
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
        search_page(category, 132)