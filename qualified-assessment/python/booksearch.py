import re
import requests
from bs4 import BeautifulSoup


def requestGet(url):
    """
    Function to fetch response from given url
    @param url : url to fetch response from
    """
    try:
        response = requests.get(url)
    except Exception as e:
        print("Unable to connect to", url, e)
        exit(1)
    return response

def parseToBS(htmlString):
    """
    Function to parse given html string into BeautifulSoup object
    @param htmlString : string to be parsed
    """
    try:
        soup = BeautifulSoup(htmlString, features="html.parser")
    except Exception as e:
        print("Unable to parse html response", e)
        exit(2)
    return soup


def in_stock(title, topic: str):
    ANCHOR_SELECTOR = "a"
    SIDEBAR_TOPIC_SELECTOR = ".nav-list " + ANCHOR_SELECTOR
    HREF_SELECTOR = "href"
    NEXT_PAGE_SELECTOR = ".next > " + ANCHOR_SELECTOR
    TITLE_ATTR_SELECTOR = "title"
    FORM_SELECTOR = "form"

    base_bookstore_url = "http://books.toscrape.com/"
    book_store_home_page = requestGet(base_bookstore_url)
    home_soup = parseToBS(book_store_home_page.text)

    title = title.lower()
    topic = topic.lower()
    topic_lists = home_soup.select(SIDEBAR_TOPIC_SELECTOR)
    topic_url = ""

    # Search in the Topics sidebar if the given topic exists or not
    # Extract the url if exist
    try:
        for topic_link in topic_lists:
            if topic_link.string.strip().lower() == topic:
                topic_url = topic_link[HREF_SELECTOR]
    except Exception as e:
        print("Unexpected Error occured", e)

    # Return False if topic doesn't exists
    if topic_url == "":
        return False

    # extract base url for topic to get next page if required
    topic_base_url = base_bookstore_url + "/".join(topic_url.split('/')[:-1]) + "/"
    topic_page = requestGet(base_bookstore_url + topic_url)
    topic_soup = parseToBS(topic_page.text)

    # Extract result count to check if next page is available or not
    result_message = topic_soup.select(FORM_SELECTOR)
    result_count = int(result_message[0].strong.string)

    books_count = 0

    # Keep searching until all the books are checked
    while books_count < result_count:
        curr_page = topic_soup.find_all(ANCHOR_SELECTOR, title=True)
        for book in curr_page:
            if book[TITLE_ATTR_SELECTOR].lower() == title:
                return True

        next_page = topic_soup.select(NEXT_PAGE_SELECTOR)
        if len(next_page) > 0:
            next_url = topic_base_url + next_page[0][HREF_SELECTOR]
            topic_page = requestGet(next_url)
            topic_soup = parseToBS(topic_page.text)

        books_count += len(curr_page)

    return False


titles = ["Online Marketing for Busy Authors: A Step-By-Step guide", "the origin of species",
          "the origin of species", "Origin of Species"]
topics = ["Self help", "science", "art", "Science"]


for title, topic in zip(titles, topics):
    print(title, topic, ": ", in_stock(title, topic))
