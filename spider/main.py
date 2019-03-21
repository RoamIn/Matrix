# -*- coding:utf-8 -*-
import re
from sys import stdout
import requests
import time
from bs4 import BeautifulSoup

from DB.DbClient import DbClient


# 搜索每页
def search_page(category, page=1, retry_times=0):
    try:
        req = requests.get(
            url=category['origin'] + category['pathname'].format(page),
            headers=headers,
            timeout=5)

        html = req.text
        soup = BeautifulSoup(html.encode('gbk', 'ignore'), 'lxml')
        pgae_link_list = soup.find(id='threadlisttableid').find_all(
            'a', class_='s')

        # 过滤掉没有附件的
        filtered_pgae_link_list = []
        for page_link in pgae_link_list:
            if page_link.parent.find('img', alt='attachment') != None:
                filtered_pgae_link_list.append(page_link)

        # 得到每页中每一条数据的信息（标题、页面地址、分类、torrent）
        target_list = get_target_list(category, filtered_pgae_link_list)

        # 获取、存储
        target_list_len = len(target_list)
        for index, target in enumerate(target_list):
            if db.exists(target['href']):
                target_page = get_target_page(target)
                create_time = get_target_create_time(target_page)

                db.update(target['href'], {'create_time': create_time})
                # time.sleep(.05)
            else:
                target_page = get_target_page(target)
                target['torrent_list'] = get_target_torrent(
                    target_page, target)
                target['create_time'] = get_target_create_time(target_page)

                db.put(target)

            print('page {}: {}/{}'.format(page, index + 1, target_list_len))

        page_container = soup.find(id='fd_page_bottom')
        current_page_dom = page_container.find('strong', text=page)
        next_page = current_page_dom.find_next_sibling('a')

        if next_page != None:
            time.sleep(.2)
            search_page(category, next_page.string)
        else:
            print(':)\nEverything done !')
    except Exception as e:
        print(e)
        retry_times = retry_times + 1
        stdout.write('\rSomething wrong, retry...%d' % retry_times)
        stdout.flush
        search_page(category, page, retry_times)


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


# 获取 target 页面内容
def get_target_page(target_page, retry_times=0):
    try:
        req = requests.get(
            url=target_page['href'], headers=headers, timeout=30)

        # 解析页面，获取种子下载地址
        html = req.text

        soup = BeautifulSoup(html.encode('gbk', 'ignore'), 'lxml')

        return soup

    except Exception as e:
        print(e)
        retry_times = retry_times + 1
        stdout.write('\rSomething wrong, retry...%d' % retry_times)
        stdout.flush
        return get_target_page(target_page, retry_times)


# 获取 target 创建时间
def get_target_create_time(soup):
    time_wrapper = soup.find(id='postlist').find(
        'em', id=re.compile('authorposton'))

    create_time = re.search(r'(\d{4}-\d+-\d+\s+\d+:\d+:\d+)',
                            time_wrapper.text).group()
    create_time = time.mktime(time.strptime(create_time, '%Y-%m-%d %H:%M:%S'))

    return create_time


# 获取 torrent 链接地址
def get_target_torrent(soup, target_page):
    wrapper = soup.find('ignore_js_op')

    if wrapper != None:
        torrent_page_list = soup.find('ignore_js_op').find_all('a')
    else:
        torrent_page_list = []

    torrent_list = []
    for torrent in torrent_page_list:
        href = torrent.get('href')
        isAttachment = re.search(r'forum\.php\?mod\=attachment', href)

        if isAttachment == None:
            href = get_torrent_by_url(target_page['origin'] + '/' + href)

        torrent_list.append({
            'href': target_page['origin'] + '/' + href,
            'title': torrent.contents[0].strip()
        })

    return torrent_list


def get_torrent_by_url(url, retry_times=0):
    try:
        req = requests.get(url=url, headers=headers, timeout=5)

        # 解析页面，获取种子下载地址
        html = req.text
        soup = BeautifulSoup(html.encode('gbk', 'ignore'), 'lxml')
        link = soup.find(id='wp').find(
            'a', href=re.compile(r'forum\.php\?mod\=attachment'))
        return link.get('href')

    except Exception as e:
        print(e)
        retry_times = retry_times + 1
        stdout.write('\rSomething wrong, retry...%d' % retry_times)
        stdout.flush
        return get_torrent_by_url(url, retry_times)


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
