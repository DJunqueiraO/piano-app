import webview
from webview.dom import DOMEventHandler
import os
from bs4 import BeautifulSoup
from threading import Thread


class Index:

    def __init__(self, url: str):
        self.beautifulsoup = None
        self.url = url

    def get_beautifulsoup(self) -> BeautifulSoup:
        if self.beautifulsoup is None:
            with open(self.url, 'r') as file:
                html = file.read()
                self.beautifulsoup = BeautifulSoup(html, 'html.parser')
        return self.beautifulsoup

    def get_title(self) -> str:
        return self.get_beautifulsoup().find('title').text

def bind(window: webview.Window):

    def on_click(event):
        print('e')

    window.dom.window.events.click += on_click

if __name__ == '__main__':

    url = 'deploy/build/index.html'

    index = Index(url)

    window = webview.create_window(
        title=index.get_title(),
        url=url,
        maximized=True
    )

    webview.start(
        bind,
        window,
        private_mode=False
    )

