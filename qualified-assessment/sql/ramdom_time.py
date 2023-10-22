import random
import time
from datetime import datetime

def randomDate(start, end):
    frmt = '%d-%m-%Y %H:%M:%S'

    stime = time.mktime(time.strptime(start, frmt))
    etime = time.mktime(time.strptime(end, frmt))

    ptime = stime + random.random() * (etime - stime)
    dt = datetime.fromtimestamp(time.mktime(time.localtime(ptime)))
    return dt

for i in range(100):
    random_datetime = randomDate("20-01-2017 13:30:00", "23-12-2018 04:50:00")
    print(f'(\'{random_datetime}\'),')
