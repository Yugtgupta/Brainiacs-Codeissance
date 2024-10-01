import requests
from bs4 import BeautifulSoup

stem_url = "https://mahadbt.maharashtra.gov.in/"
url="https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA703C38E51AA07C7E01997E4885"
headers={'User-Agent':'Mozilla/5.0 (Windows NT 6.3; Win 64 ; x64) Apple WeKit /537.36(KHTML , like Gecko) Chrome/80.0.3987.162 Safari/537.36'} 
webpage = requests.get(url,headers=headers).text
soup = BeautifulSoup(webpage, 'html.parser')

cat_list = []
href_list = []
eligibility_list = []
cleaned_eligibility_list = []

all_categories = soup.find('div', class_="resp-tabs-container hor_1")
sub_categories_text = all_categories.find_all('li')
for i in sub_categories_text:
    cat_list.append(i.text)

anchor_tags = all_categories.find_all('a')
for i in anchor_tags:
    href_list.append(stem_url + i.get('href'))
    
for i in href_list:
    webpage = requests.get(i, headers=headers).text
    soup = BeautifulSoup(webpage, 'html.parser')
    eligibility_list.append(soup.find_all('ul', class_="list")[2].text)

for i in eligibility_list:
    cleaned_text = i.replace('\r\n', '').strip()
    cleaned_eligibility_list.append(cleaned_text)




